"use client"
import React, { useState } from 'react'
import { chatSession } from "@/utils/GeminiAIModel";
import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {

  const [openDialog, setOpenDialog] = useState(false)

  const [jobPosition, setJobPosition] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [jobExperience, setJobExperience] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const {user} = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Job Position:", jobPosition);
    console.log("Job Description:", jobDescription);
    console.log("Job Experience:", jobExperience);

    const InputPrompt = `
    You are an AI Interview Question Generator.

    Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT}
    interview questions and answers for:

    Job Position: ${jobPosition}
    Job Description: ${jobDescription}
    Years of Experience: ${jobExperience}

    Return ONLY valid JSON array.

    Format:
    [
      {
        "question": "Question here",
        "answer": "Answer here"
      }
    ]

    Rules:
    - Use double quotes only
    - No markdown
    - No explanation
    - No backticks
    - Output only JSON
    `;    try {
    const result = await chatSession.sendMessage({
      message: InputPrompt,
    });
    console.log("Raw AI Response:", result.text);
    const MockJsonResp = result.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
      console.log("Clean JSON:", MockJsonResp);
      const parsedResponse = JSON.parse(MockJsonResp);
      console.log("Parsed JSON Response:", parsedResponse);
      setJsonResponse(parsedResponse);
      
      if(parsedResponse){
        const res = await db.insert(MockInterview)
        .values({
          mockId : uuidv4(),
          jsonMockResp: JSON.stringify(parsedResponse),
          jobPosition: jobPosition,
          jobDesc: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress || "testUser",
          createdAt: moment().toDate()
        }).returning({mockId: MockInterview.mockId});
        console.log("Database Insert Result:", res);
        if(res){
          setOpenDialog(false);
          router.push('/dashboard/interview/' + res[0]?.mockId);
        }
      }
    }catch (error) {
      console.log("ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary cursor-pointer hover:scale-105 hover:shadow-md transition-all' onClick={() => setOpenDialog(true)}>
        <h2 className='text-lg text-center'> + Add New Interview </h2>
      </div>
      <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-xl'>
              Tell Us About Your Job Interview
            </DialogTitle>
            <DialogDescription>
              Add details about your job position, tech stack and years of experience.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div>
              <div>
                <label className='block mb-2 mt-4 text-sm font-medium'>
                  Job Role / Position
                </label>
                <Input placeholder="Ex: Full Stack Developer" className='border rounded-lg p-2' required onChange={(e) => setJobPosition(e.target.value)}/>
              </div>
              <div>
                <label className='block mb-2 mt-4 text-sm font-medium'>
                  Job Description / Tech Stack
                </label>
                <Textarea placeholder="Ex: React, Node.js, Angular, MongoDB, MySQL" className='border rounded-lg p-2' required onChange={(e) => setJobDescription(e.target.value)}/>
              </div>
              <div>
                <label className='block mb-2 mt-4 text-sm font-medium'>
                  Years of Experience
                </label>
                <Input placeholder="Ex: 3" type="number" className='border rounded-lg p-2' max="50" required onChange={(e) => setJobExperience(e.target.value)}/>
              </div>
            </div>
            <div className='flex gap-5 justify-end mt-4'>
              <Button type='button' variant='outline'className='cursor-pointer' onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type='submit' className='cursor-pointer' disabled={isLoading}>
                {isLoading ? 
                <>
                <LoaderCircle className='animate-spin mr-2'/>
                 "Generating..." 
                </>: "Start Interview"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview