"use client"

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link  from 'next/link';

function StartInterview({ params }) {
    const resolvedParam = use(params);
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        GetInterviewDetails();
    }, []);
    const GetInterviewDetails = async () => {
        const result = await db
            .select()
            .from(MockInterview)
            .where(
                eq(
                    MockInterview.mockId,
                    resolvedParam.interviewId
                )
            );
        if (result.length === 0) {
            return;
        }
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log(
            "Mock Interview Questions:",
            jsonMockResp
        );
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10' >
                {/* Questions */}
                <QuestionsSection 
                mockInterviewQuestion={mockInterviewQuestion} 
                activeQuestionIndex={activeQuestionIndex}
                />
                {/* Video/Audio recording and tips */}
                <RecordAnswerSection 
                mockInterviewQuestion={mockInterviewQuestion} 
                activeQuestionIndex={activeQuestionIndex} 
                interviewData={interviewData}
                />
            </div>
            <div className='flex justify-end gap-5' >
                {activeQuestionIndex > 0 && (
                    <Button className='bg-secondary text-black hover:bg-blue-300 border border-blue-300 cursor-pointer' onClick={() => setActiveQuestionIndex(prev => prev-1)}>Previous Question</Button>
                )}
                {activeQuestionIndex < (mockInterviewQuestion?.length || 0) - 1 && (
                    <Button className='bg-secondary text-black hover:bg-green-300 border border-blue-300 cursor-pointer' onClick={() => setActiveQuestionIndex(prev => prev+1)}>Next Question</Button>
                )}
                {activeQuestionIndex === (mockInterviewQuestion?.length || 0) - 1 && (
                    <Link className='cursor-pointer' href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                        <Button className='bg-red-500 hover:bg-red-600 cursor-pointer'>End Interview</Button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default StartInterview