"use client"
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function feedback({params}) {

  const router = useRouter();
  const resolvedParam = use(params);
  const [feedbackList, setFeedbackList] = useState([]);
  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, resolvedParam.interviewId)).orderBy(UserAnswer.id);
    setFeedbackList(result);
    console.log("User Answers and Feedback:", result);
  }
  return (
    <div className='p-5'>
      {feedbackList?.length == 0 ?
      <h2 className='text-lg font-medium text-gray-500'>No Interview Feedback Found</h2>
      :
      <>
      <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
      <h2 className='text-xl font-semibold text-black-700'>You have completed the interview. Here is your interview feedback:</h2>
      <h2 className='text-lg font-medium text-blue-500'>Your overall performance: <strong className='text-blue-700'> Good Performance, Keep it up! </strong></h2>
      <h2 className='text-sm font-medium text-gray-700'>Find below the correct answer, your answer, and feedback for improvement:</h2>

      {feedbackList && feedbackList.map((item, index) => (
        <Collapsible key={index} className="mt-5">
        <CollapsibleTrigger className='flex items-center justify-between border border-gray-300 p-2 bg-secondary rounded-lg my-2 text-left cursor-pointer width-full'>
        {item.question} <ChevronsUpDown/>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className='flex flex-col gap-2 cursor-pointer'>
            <h2 className='text-red-500 p-2 border rounded-lg border-red-400 bg-red-100'><strong>Rating:</strong> {item.rating}</h2>
            <h2 className='p-2 border rounded-lg border-blue-400 bg-blue-100 '><strong>Your Answer:</strong> {item.userAns}</h2>
            <h2 className='p-2 border rounded-lg border-green-400 bg-green-100'><strong>Correct Answer:</strong> {item.correctAns}</h2>
            <h2 className='p-2 border rounded-lg border-gray-400 bg-gray-100'><strong>Feedback:</strong> {item.feedback}</h2>
          </div>
        </CollapsibleContent>
      </Collapsible>
      ))}
      </>
      }
      <Button className="text-blue-300 mt-5 cursor-pointer" onClick={() => router.push('/dashboard')}>Home</Button>
    </div>
  )
}
export default feedback
