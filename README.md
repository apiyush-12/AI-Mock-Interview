# 🎙️ AI Mock Interview Platform

> AI-powered mock interview platform that generates personalized interview questions, conducts voice-enabled interviews, records responses, and provides intelligent feedback using Google's Gemini AI.

---

# 📌 Overview

AI Mock Interview Platform is a full-stack web application designed to help students and professionals prepare for technical interviews through AI-generated mock interview sessions.

Users can create customized interviews by providing:

- 💼 Job Role (Full Stack dev, Network Engineer, Frontend Dev, backend Dev, Cyber Security Analyst, DevOps Engineer, etc)
- 📝 Job Description / Tech Stack (React, MySQL, Firebase, API, DSA, Networking, Cloud, AWS, etc)
- 👨‍💻 Years of Experience (2, 4, 5......)

The system generates personalized interview questions using Gemini AI and allows users to answer them through voice recording. AI then evaluates the responses and provides ratings and feedback for improvement.

---

# ✨ Features

## 🎯 AI-Powered Interview Generation

- Generates interview questions dynamically
- Tailored based on:
  - Job Role
  - Tech Stack
  - Years of Experience

## 🎤 Voice-Enabled Interviews

- Speech-to-Text Integration
- Voice-Based Answer Recording
- Realistic Interview Experience

## 📹 Webcam Integration

- Real-Time Video Recording
- Live Camera Preview
- Simulated Interview Environment

## 🤖 AI Feedback & Evaluation

- AI-generated Ratings
- Detailed Feedback
- Improvement Suggestions

## 🔐 User Authentication

- Clerk Authentication
- Secure Login & Signup
- User-specific Interview History

## 📊 Interview History Dashboard

- View Previous Interviews
- Track Progress
- Access Past Feedback

---

# 🏗️ System Architecture

```text
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
 ├── Speech Recognition
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
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Next.js (App Router)
- Tailwind CSS
- ShadCN UI

## Backend

- Next.js Server Components
- API Integration

## Database

- PostgreSQL
- Drizzle ORM

## Authentication

- Clerk Authentication

## AI Integration

- Google Gemini API
- Gemini 3.1 Flash Lite

## Additional Libraries

- React Webcam
- Speech Recognition API
- UUID
- Moment.js
- Lucide React

---

# 📂 Project Structure

```text
ai-interview/
│
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   │
│   ├── dashboard/
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
├── lib/
├── public/
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
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/apiyush-12/AI-Mock-Interview.git
cd AI-Mock-Interview
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_GEMINI_API_KEY=

DATABASE_URL=

NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=5
```

## Run Database Migration

```bash
npx drizzle-kit push
```

## Start Development Server

```bash
npm run dev
```

Application will run at:

```text
http://localhost:3000
```

---

# 🔄 Workflow

1. User signs in using Clerk Authentication.
2. User enters:
   - Job Role
   - Tech Stack
   - Years of Experience
3. Gemini AI generates interview questions.
4. User starts interview session.
5. Speech Recognition records answers.
6. AI evaluates responses.
7. Feedback and ratings are generated.
8. Data is stored in PostgreSQL.
9. Users can review previous interviews.

---

# 🚀 Future Enhancements

- Resume-Based Interview Generation
- Coding Interview Mode
- Behavioral Interview Mode
- AI Career Recommendations
- PDF Report Export
- Interview Analytics Dashboard
- Multi-Language Support
- Real-Time Face Analysis
- Mock HR Round Simulation

---

# 👨‍💻 Author

### Piyush Kumar

**B.Tech – Computer Networking & Cyber Security**

### Areas of Interest

- Cyber Security
- Artificial Intelligence
- Full Stack Development
- Cloud Computing
- IoT & Embedded Systems

### GitHub

https://github.com/apiyush-12

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

# 📜 License

This project is licensed under the MIT License.

---

Built with ❤️ using React, Next.js, Gemini AI, PostgreSQL, Drizzle ORM, Clerk Authentication, Tailwind CSS, and ShadCN UI.
