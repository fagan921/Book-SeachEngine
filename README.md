# 📚 Book Search Engine

A full-stack **MERN** application that allows users to search for books using the **Google Books API**, save their favorite books, and manage their account using authentication.

## 🚀 Live Demo
[**View the Deployed App on Render**](https://book-seachengine-client.onrender.com/))

---

## 📖 Features
✅ **Search for books** using the Google Books API  
✅ **Save books** to your personal collection  
✅ **User authentication** (signup & login) with JWT  
✅ **Mobile-responsive design** with React & Bootstrap  
✅ **GraphQL API** for handling data requests  

---

## 🛠 Tech Stack
- **Frontend**: React, Vite, Apollo Client, Bootstrap  
- **Backend**: Node.js, Express.js, Apollo Server  
- **Database**: MongoDB Atlas  
- **Authentication**: JSON Web Tokens (JWT)  
- **Deployment**: Render (backend), MongoDB Atlas (database)  

---

## 📂 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/fagan921/Book-SeachEngine.git
cd Book-SeachEngine
```

### 2️⃣ Install Dependencies
```sh
npm run install
```

### 3️⃣ Set Up Environmental Variables
  Create an .env file inside the _server_ folder and add:
```sh
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=<your-secret-key>
```

### 4️⃣ Start the Development Server
```sh
npm run develop
```

Frontend: http://localhost:3000
Backend: http://localhost:3001/graphql

## Deployment (Render & MongoDB)
	1.	Push all changes to GitHub
	2.	Connect your repository to Render
	3.	Set up environment variables on Render
	4.	Deploy & watch your app go live! 🎉
