AI Mock Interview Platform 🎙️🤖

An AI-powered mock interview platform that generates personalized interview questions, conducts voice-enabled interviews, records responses, and provides intelligent feedback using Google's Gemini AI.

📌 Overview

AI Mock Interview Platform is a full-stack web application designed to help students and professionals prepare for technical interviews through AI-generated mock interview sessions.

Users can create customized interviews by providing:

💼 Job Role
📝 Job Description / Tech Stack
👨‍💻 Years of Experience

The system generates personalized interview questions using Gemini AI and allows users to answer them through voice recording. AI then evaluates the responses and provides ratings and feedback for improvement.

✨ Features
🎯 AI-Powered Interview Generation
Generates interview questions dynamically.
Questions are tailored based on:
Job Role
Tech Stack
Years of Experience
🎤 Voice-Enabled Interviews
Speech-to-Text integration.
Answer interview questions verbally.
Provides a realistic interview experience.
📹 Webcam Support
Real-time webcam integration.
Simulates actual interview environments.
🤖 AI Feedback & Evaluation
Evaluates user responses.
Generates:
Rating
Feedback
Improvement Suggestions
🔐 User Authentication
Secure authentication using Clerk.
Personalized user dashboard.
📊 Interview History
View all previous interview sessions.
Track progress over time.
💾 Database Integration
Stores:
Interview Questions
User Responses
AI Feedback
Interview Metadata
🏗️ System Architecture
User
 │
 ▼
Authentication (Clerk)
 │
 ▼
Dashboard
 │
 ▼
Create Interview
 │
 ├── Job Role
 ├── Job Description
 └── Experience
 │
 ▼
Gemini AI
 │
 ▼
Generate Questions
 │
 ▼
Interview Session
 │
 ├── Webcam Feed
 │
 ├── Speech Recognition
 │
 └── User Response
 │
 ▼
AI Evaluation
 │
 ├── Rating
 ├── Feedback
 └── Suggestions
 │
 ▼
PostgreSQL Database
 │
 ▼
Interview History Dashboard
🛠️ Tech Stack
Frontend
React.js
Next.js (App Router)
Tailwind CSS
ShadCN UI
Backend
Next.js Server Components
API Integration
Database
PostgreSQL
Drizzle ORM
Authentication
Clerk Authentication
AI Integration
Google Gemini API
Gemini 3.1 Flash Lite
Additional Libraries
React Webcam
Speech Recognition API
UUID
Moment.js
Lucide React
📂 Project Structure
ai-interview/
│
├── app/
│   │
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   │
│   ├── dashboard/
│   │   │
│   │   ├── _components/
│   │   │   ├── AddNewInterview.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── InterviewItemCard.jsx
│   │   │   └── InterviewList.jsx
│   │   │
│   │   ├── interview/
│   │   │   └── [interviewId]/
│   │   │       ├── start/
│   │   │       │   ├── _components/
│   │   │       │   │   ├── QuestionsSection.jsx
│   │   │       │   │   └── RecordAnswerSection.jsx
│   │   │       │   └── page.jsx
│   │   │       │
│   │   │       └── feedback/
│   │   │           └── page.jsx
│   │   │
│   │   ├── layout.jsx
│   │   └── page.jsx
│   │
│   ├── globals.css
│   ├── layout.js
│   └── page.js
│
├── components/
│   └── ui/
│
├── lib/
│
├── public/
│
├── utils/
│   ├── db.js
│   ├── schema.js
│   └── GeminiAIModel.js
│
├── drizzle.config.js
├── middleware.js
├── next.config.mjs
├── package.json
└── .env.local
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/apiyush-12/AI-Mock-Interview.git
cd AI-Mock-Interview
2️⃣ Install Dependencies
npm install
3️⃣ Configure Environment Variables

Create a .env.local file:

# Clerk

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Gemini AI

NEXT_PUBLIC_GEMINI_API_KEY=

# PostgreSQL

DATABASE_URL=

# Configuration

NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=5
4️⃣ Run Database Migration
npx drizzle-kit push
5️⃣ Start Development Server
npm run dev

Application will run on:

http://localhost:3000
🗄️ Database Schema
MockInterview
Column	Description
id	Primary Key
mockId	Unique Interview ID
jsonMockResp	AI Generated Questions
jobPosition	Job Position
jobDesc	Job Description
jobExperience	Experience
createdBy	User Email
createdAt	Creation Date
🔄 Workflow
Step 1

User signs in using Clerk Authentication.

Step 2

User enters:

Job Role
Tech Stack
Years of Experience
Step 3

Gemini AI generates customized interview questions.

Step 4

User starts interview session.

Step 5

Voice answers are recorded using Speech Recognition.

Step 6

AI evaluates responses.

Step 7

Rating and feedback are generated.

Step 8

Results are stored in PostgreSQL.

Step 9

User can view interview history from Dashboard.

🚀 Future Enhancements
Resume-Based Interview Generation
Coding Interview Mode
Behavioral Interview Mode
AI Career Recommendations
PDF Report Export
Interview Analytics Dashboard
Multi-Language Support
Real-Time Face Analysis
Mock HR Round Simulation
