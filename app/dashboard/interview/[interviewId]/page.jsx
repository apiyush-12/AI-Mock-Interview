"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Ghost, Lightbulb, WebcamIcon } from 'lucide-react';
import React, { use, useEffect, useState } from 'react'
import Webcam from 'react-webcam';
import Link from 'next/link';


function Interview({ params }) {
    const resolvedParams = use(params);
    const [interviewData, setInterviewData] = useState();
    const [webcamEnabled, setWebcamEnabled] = useState(false);
    useEffect(() => {
        console.log("InterviewId:", resolvedParams.interviewId);
        GetInterviewDetails();
    }, []);


    // use to get interveiw details from database based on interviewId
    const GetInterviewDetails = async() => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, resolvedParams.interviewId));
        console.log("Interview Details:", result);
        setInterviewData(result[0]);
    }

    return (
        <div className='my-10 '> 
            <h2 className='font-bold text-2xl'>Let's Start Your Interview</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10' >
            <div className='flex flex-col my-3 gap-3'>
                <div className='flex flex-col p-5 rounded-lg border gap-5 border-blue-400 bg-secondary'>
                    <h2 className='text-lg'><strong>Job Position:</strong> {interviewData?.jobPosition}</h2>
                    <h2 className='text-lg'><strong>Tech Stack:</strong> {interviewData?.jobDesc}</h2>
                    <h2 className='text-lg'><strong>Experience:</strong> {interviewData?.jobExperience} years</h2>
                </div>
                <div className='p-5 border rounded-lg border-yellow-400 bg-yellow-100'>
                    <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
                    <h2 className='text-yellow-600 mt-2 '>{process.env.NEXT_PUBLIC_INTERVIEW_TIPS}</h2>
                </div>
            </div>
            <div>
                {webcamEnabled? <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={()=> setWebcamEnabled(false)}
                mirrored={true}
                style={{
                    height: 400, width: 400
                }}
                /> : <> 
                <WebcamIcon className='w-full h-70 p-20 my-7 text-blue-500 border-blue-400 bg-secondary rounded-lg border'/>
                <Button variant={Ghost} className='cursor-pointer border-blue-400 bg-blue-200 hover:bg-secondary' onClick={() => setWebcamEnabled(true)}>Enable Web Cam and Microphone </Button>
                </>
                }
            </div>
            </div>
            <div className='flex justify-end items-end'>
                <Link href={'/dashboard/interview/' + resolvedParams.interviewId + '/start'}>
                    <Button className='cursor-pointer'>Start Interview</Button>
                </Link>
            </div>
        </div>
    )
}

export default Interview