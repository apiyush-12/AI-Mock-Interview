import { Button } from '@/components/ui/button'
import moment from 'moment'
import { useRouter } from 'next/navigation';
import React from 'react'


function InterviewItemCard({interview}) {

    const router = useRouter();
    const onStart = () => {
        router.push(`/dashboard/interview/${interview.mockId}`);
    }

    const onFeedback = () => {
        router.push(`/dashboard/interview/${interview.mockId}/feedback`);
    }
  return (
    <div className='border shadow-sm rounded-lg p-3 hover:shadow-lg transition' >
      <h3 className="text-lg text-primary font-semibold">{interview?.jobPosition}</h3>
      <h2 className="text-gray-600">{interview?.jobExperience} Years of Experience</h2>
      <h2 className="text-gray-400">Created At: {moment(interview?.createdAt).format("DD MMM YYYY")}</h2>

      <div className='flex items-center justify-between gap-3 mt-5 '>
        <Button size="sm" variant="outline" className="mr-2 cursor-pointer border bg-green-300 text-black" onClick={onFeedback}>
          FeedBack
        </Button>
        <Button size="sm" variant="outline" className="cursor-pointer border bg-blue-400 text-black" onClick={onStart}>
          Start Interview Again
        </Button>
      </div>
    </div>
  )
}
export default InterviewItemCard
