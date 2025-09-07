# Happy Thoughts 💭

A fullstack project inspired by Twitter, where users can share short “happy thoughts”. The app shows recent posts, lets you “heart” messages in real time, and displays timestamps like “2 minutes ago”. 


## Features ✨


- Post new happy thoughts (up to 140 characters)  
- Like posts in real time
- Delete or edit a thought if authenticated
- “Time ago” timestamps (via date-fns)  
- Responsive design with Tailwind CSS
- Subtle animations with Framer Motion  
- Client-side validation and error handling
- Routing with React Router DOM (Routes, useNavigate, Link, NavLink)  
- Fullstack setup: React frontend + custom-built REST API



## Tech Stack 🛠️

-   **Frontend:** React, Hooks (useState, useEffect), Tailwind CSS, Framer Motion
-   **Backend:** Node.js, Express, MongoDB (Mongoose)
-   **Other:** date-fns for time formatting, deployed on Netlify & Render (or Heroku, depending on what you used)


## API 🔗

The project is powered by a custom-built REST API:

-   **Frontend live demo:** [Happy Thoughts](https://myhappythought.netlify.app/)
    
-   **Backend repo/API:** [Happy Thoughts API](https://github.com/MalLunBar/js-project-api)
    

### Example endpoints:

-   `GET /thoughts` → fetches the latest thoughts
    
-   `POST /thoughts` → adds a new thought
    
-   `POST /thoughts/:id/like` → likes a specific thought

## Getting Started 🚀

### Frontend

1.  Clone the repo:
    
    `git clone https://github.com/yourusername/happy-thoughts-frontend.git` 
    
2.  Install dependencies:
    
    `cd happy-thoughts-frontend
    npm install` 
    
3.  Start the app:
    
    `npm start` 
    

### Backend

1.  Clone the API repo:
    
    `git clone https://github.com/yourusername/happy-thoughts-api.git` 
    
2.  Install dependencies:
    
    `cd happy-thoughts-api
    npm install` 
    
3.  Create a `.env` file with your MongoDB connection string:
    
    `MONGO_URL=your_mongo_connection_string
    PORT=8080` 
    
4.  Start the server:
    
    `npm run dev`

