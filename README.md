## 🧠 Multi-Language Quiz App (QuizCraft) ##

A fully-featured, responsive Quiz Web App built using React for the frontend and Node.js (Express) for the backend. Users can test their coding knowledge in various programming languages and receive feedback with percentage scores, visual stats, and confetti animations if they score well. The app also includes dark mode, custom API integration, and topic-based quiz selection.



## 📂 Project Structure

```
Multi-Language Quiz App/
├── node_modules/
├── public/
├── quiz-api-server/        
│   ├── questions/          
│   ├── index.js           
│   ├── utils.js            
│   ├── questions.js        c
│   ├── package.json
│   └── ...
├── src/                    
│   ├── components/
│   │   ├── Home.jsx
│   │   ├── Quiz.jsx
│   │   ├── Result.jsx
│   │   ├── Navbar.jsx
│   │   └── *.module.css
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
├── README.md             
└── ...
```


## 📸 Screenshots

![Screenshot 2025-06-24 160214](https://github.com/user-attachments/assets/d1a40ab5-1a4f-499d-a225-0a24d2b1a3f9)

![Screenshot 2025-06-24 160506](https://github.com/user-attachments/assets/b28e8ecb-23bf-45b4-b24d-4ca4a216114d)

![Screenshot 2025-06-25 132021](https://github.com/user-attachments/assets/798a3200-ef09-48a3-8609-5d68f0b48bd0)



## ⚙️ Tech Stack

## Frontend (React + Vite):

React with Hooks

CSS Modules for styling

React Router DOM for page routing

LocalStorage for saving quiz results

Confetti animation via canvas-confetti

## Backend (Express):

Node.js with Express

Simple REST API to serve topic-based quizzes

JSON-based question sets

Cross-origin support for development



## 🌐 Features

🧠 Multiple Language Quizzes: JavaScript, Python, SQL, C++, PHP, Java, Ruby, Rust, etc.

🌗 Dark Mode Toggle: Clean and responsive UI with full light/dark theme support.

⏱ Time Tracking: Displays how long the user took to complete the quiz.

📊 Progress Ring: Shows quiz score percentage using a circular progress indicator.

🎉 Confetti Celebration: Scores ≥ 50% trigger a celebration popup and animation.

🔁 Retake Quiz & 🏠 Back to Home options.

📡 REST API: Backend delivers randomized quiz questions by topic.

🧪 Clean Modular Code: Easy to extend, debug, and customize.



## 📦 Setup Instructions
1️⃣ Clone the repository

```
git clone https://github.com/your-username/multi-language-quiz-app.git

cd multi-language-quiz-app
```

2️⃣ Start the Quiz API Server

```
cd quiz-api-server

npm install

node index.js
```
Server will run on http://localhost:5000

Each topic is available at /quiz/:language, e.g., http://localhost:5000/quiz/javascript

3️⃣ Start the React Frontend

```
cd ..

npm install

npm run dev
```
Vite will run React app on http://localhost:5173

The frontend will fetch quiz data from the backend automatically

