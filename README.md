# 🚌 Where is My Bus  

**Where is My Bus** is a MERN stack-based real-time public transport tracking system inspired by **SIH 25013**.  
The system connects **agencies, drivers, users, and traffic management** to provide a smooth public transportation experience.  

---

## 🚀 Features  

### 👨‍💼 Agency (Admin)  
- Authentication-based login  
- Manage bus details and assign routes  
- Update and modify bus routes  
- Monitor driver activity and live bus locations  

### 🚍 Driver  
- Authentication-based login  
- Sends live location updates **every 2 seconds**  
- Assigned route tracking  

### 👥 User (Passenger)  
- No login required  
- View available buses between two selected bus stands  
- Track live bus locations in real-time  
- Get updated route information instantly  

### 🚦 Traffic Management  
- Monitor traffic flow on routes  
- Provide data to optimize bus travel  
- Acts as a supporting system for smoother transport  

---

## 🛠️ Tech Stack  

- **Frontend:** React.js  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB  
- **Real-Time Updates:** WebSockets / Socket.io  
- **Authentication:** JWT / Passport.js  

---

## 📂 Project Structure  

where-is-my-bus/
│── backend/ # Express + MongoDB API
│── frontend/ # React.js user + admin + driver + traffic interfaces
│── README.md
│── .gitignore



---

## ⚙️ Setup Instructions  

### 1️⃣ Clone Repository  
```bash
git clone https://github.com/your-username/where-is-my-bus.git
cd where-is-my-bus


2️⃣ Backend Setup
cd backend
npm install
npm start

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🔑 Environment Variables

Create a .env file inside backend/ with the following:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000

📸 Screenshots

<img width="1919" height="866" alt="image" src="https://github.com/user-attachments/assets/c5a977a9-0410-4292-a65f-64c01832df9f" />
<img width="1919" height="873" alt="image" src="https://github.com/user-attachments/assets/85ffea2a-593c-454b-a372-5100c7983bb1" />
<img width="1909" height="861" alt="image" src="https://github.com/user-attachments/assets/9bb26bf7-9c0e-4aec-b112-89d74e562986" />
<img width="1919" height="883" alt="image" src="https://github.com/user-attachments/assets/6ff1b01c-14fe-45fd-ae5a-327e3ae00b70" />
<img width="1919" height="852" alt="image" src="https://github.com/user-attachments/assets/517dcebd-5e48-4f4e-b984-57756768bd16" />






Agency Dashboard


Driver Location Panel


User Bus Tracking


Traffic Management Panel


🎯 Future Enhancements

AI-powered traffic prediction

Integration with Google Maps API for route optimization

Push notifications for bus arrival alerts

👨‍💻 Contributors

Ankit Kumar
