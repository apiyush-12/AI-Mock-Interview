import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockInterviewQuestion, activeQuestionIndex}) {
    const textToSpeech = (text) => {
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert("Sorry, your browser does not support text to speech!");
        }
    }
  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg border-blue-400 bg-secondary mt-5 my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {mockInterviewQuestion.map((question, index) => (
                <h2 className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${index === activeQuestionIndex ? 'bg-primary text-white' : 'bg-blue-200 text-blue-500'}`} key={index}>
                    Question {index+1}
                </h2>
            ))}
        </div>
        <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion?.[activeQuestionIndex]?.question}</h2>
        <Volume2 className='size-8 cursor-pointer text-blue-500 border border-blue-300 rounded-full p-1 ' onClick={() => textToSpeech(mockInterviewQuestion?.[activeQuestionIndex]?.question)}/>

        <div className='p-3 border rounded-lg border-yellow-300 bg-yellow-100 mt-20 rounded-md '>
            <h2 className='flex items-center gap-2 text-yellow-500 text-sm md:text-base'>
            <Lightbulb/>
            <strong>Note:</strong>
            </h2>
            <p className='text-sm text-yellow-500 my-2'>{process.env.NEXT_PUBLIC_TIP}</p>
        </div>
    </div>
  )
}

export default QuestionsSection
