"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import { useUser } from '@clerk/nextjs';
import { UserAnswer } from '@/utils/schema';
import moment from 'moment';
import { db } from '@/utils/db';

function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {
  const [userAnswer, setUserAnswer] = useState('');
  const {user} = useUser();
  const [loading, setLoading] = useState(false);
  const {error, interimResult, isRecording, results, startSpeechToText, stopSpeechToText, setResults} = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) => (
      setUserAnswer(prevAns => prevAns + result.transcript)
    ));
  }, [results]);

  useEffect(() => {
    if(!isRecording && userAnswer.length > 10){
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async() => {
    if(isRecording){
      stopSpeechToText();

    }else{
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);
    const feedbackPrompt = "Question:"+mockInterviewQuestion?.[activeQuestionIndex]?.question+
      ", User Answer:" +userAnswer+ ", Depends on question and user answer for given interview question"+
      " please give us rating for answer and feedback as area of improvement if any "+
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result=await chatSession.sendMessage({
      message: feedbackPrompt,
    });
    const mockJsonResp= result.text.replace(/```json/g, "").replace(/```/g, "").trim();
    console.log(mockJsonResp);
    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData.mockId,
      question: mockInterviewQuestion?.[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion?.[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD-MM-YYYY')
    });

    if(resp){
      toast('User Answer recorded successfully!');
      setUserAnswer('');
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  } 


  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='p-5 border rounded-lg border-green-400 bg-black mt-3 my-10 flex flex-col items-center justify-center gap-5'>
            <Image src="/webcam.webp" width={300} height={200} alt="webcam" className='absolute' loading="eager"/>        
            <Webcam 
            mirrored={true}
            style={{
                height: 400, width: 400, zIndex: 10
            }}
            />
        </div>
        <Button variant="outline" className='cursor-pointer border-green-400 bg-black-200 hover:bg-secondary mb-2' 
        onClick={StartStopRecording} disabled={loading}>
          {isRecording?
          <h2 className='flex items-center gap-2 text-red-500 '>
            <Mic/>Stop Recording
          </h2>
          :
          'Record Answer'}</Button>
    </div>
  ) 
}

export default RecordAnswerSection