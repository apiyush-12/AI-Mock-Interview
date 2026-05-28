import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className='p-5' >
        <h1 className='font-bold text-2xl my-3'>Dashboard</h1>
        <h2 className='text-gray-500 text-sm'>Let's get started with your interview preparation</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 my-2'>
          <AddNewInterview />
        </div>

        {/* Previous Interview List */}
        <InterviewList />
    </div>
  )
}

export default Dashboard
