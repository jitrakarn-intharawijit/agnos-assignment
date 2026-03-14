# Agnos Assignment – Patient Real-Time Form & Staff Dashboard

## 📌 Project Overview

This project demonstrates a real-time patient form system where patient input is synchronized live to a staff dashboard.

While the patient fills out the form, the staff dashboard updates automatically in real time. This simulates a simplified **hospital intake workflow**, allowing medical staff to monitor patient information as it is being entered.

The goal of this assignment is to demonstrate:

- Real-time data synchronization
- Clean component architecture
- Responsive UI design
- Practical usage of WebSocket communication

---

## 🚀 Installation Guide

### 1. Clone the repository

```bash
git clone <repository-url>
cd agnos-assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the Socket Server

```bash
node server.js
```

The socket server will run on:

```
http://localhost:4000
```

### 4. Start the Next.js application

```bash
npm run dev
```

Open the application:

Patient form:

```
http://localhost:3000/patient
```

Staff dashboard:

```
http://localhost:3000/staff
```

⚠️ Both the socket server and the Next.js application must be running simultaneously for real-time synchronization to work.

---

## ✨ Features

### Real-Time Patient Data Sync

Patient input is sent to the server and instantly reflected in the staff dashboard using **Socket.IO**.

### Live Patient Status

The dashboard displays the patient's current activity status.

| Status    | Description                              |
| --------- | ---------------------------------------- |
| Typing    | Patient is actively filling the form     |
| Idle      | Patient stopped typing for a period      |
| Submitted | Patient completed and submitted the form |

### Responsive UI

The layout adapts to different screen sizes:

| Screen  | Layout               |
| ------- | -------------------- |
| Mobile  | Single column layout |
| Tablet  | Two column grid      |
| Desktop | Two column grid      |

---

## 🗂 Project Structure

```
agnos-assignment
│
├── src
│   ├── app
│   │   ├── patient
│   │   │   ├── components
│   │   │   │   └── PatientForm.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── staff
│   │   │   ├── components
│   │   │   │   └── StaffView.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── components
│   │   │   └── FormField.tsx
│   │
│   └── lib
│       └── socket.ts
│
├── server.js
└── README.md
```

---

## 🧩 Component Architecture

### PatientForm

Handles:

- Form state management
- Sending updates via socket
- Emitting typing and submission status

### StaffView

Responsible for:

- Listening to real-time socket events
- Rendering patient data
- Displaying activity status

### FormField

Reusable component responsible for rendering:

- Input
- Select
- Textarea

This improves reusability and consistency across the form.

### Socket Client

Located in:

```
src/lib/socket.ts
```

This module initializes and exports the socket connection used across the application.

---

## ⚡ Real-Time Synchronization Flow

The application uses **Socket.IO** to synchronize data between the patient form and the staff dashboard.

### Data Flow

```
Patient Form
      │
      │ socket.emit()
      ▼
Socket Server
      │
      │ broadcast
      ▼
Staff Dashboard
```

### Events Used

| Event             | Description                           |
| ----------------- | ------------------------------------- |
| patient-update    | Sends updated form data               |
| patient-status    | Sends current patient activity status |
| patient-submitted | Sent when the form is completed       |

### Typing Detection

When the patient types:

```ts
socket.emit("patient-status", "typing");
```

### Idle Detection

If no input occurs for 10 seconds:

```ts
socket.emit("patient-status", "idle");
```

### Form Submission

When the form is submitted:

```ts
socket.emit("patient-status", "submitted");
```

---

## 🏗 System Architecture

```
Patient Browser
      │
      │ WebSocket
      ▼
Socket Server (Node.js + Socket.IO)
      │
      │ Broadcast
      ▼
Staff Dashboard
```

The socket server acts as a central hub that receives patient updates and broadcasts them to connected staff dashboards.

---

## 🔧 Technologies Used

| Technology   | Purpose                 |
| ------------ | ----------------------- |
| Next.js      | React framework         |
| React        | UI development          |
| Tailwind CSS | Styling                 |
| Socket.IO    | Real-time communication |
| TypeScript   | Type safety             |

---

## 📈 Possible Improvements

If the project were expanded further, several enhancements could be implemented:

- Multi-patient monitoring dashboard
- Online/offline patient detection
- Patient queue management system
- Advanced form validation
- Authentication and authorization for staff access
- Persistent data storage with a database

---

## 🌐 Live Services

### Frontend (Vercel)

Patient Form
https://agnos-assignment-77nxd0sjl-jitrakarn-intharawijits-projects.vercel.app/patient

Staff Dashboard
https://agnos-assignment-77nxd0sjl-jitrakarn-intharawijits-projects.vercel.app/staff

### Socket Server (Render)

https://agnos-socket-server-isn5.onrender.com

---

## ⚙️ Environment Configuration

If deploying the frontend and socket server separately, update the socket endpoint in:

```
src/lib/socket.ts
```

Example configuration:

```ts
const socket = io("https://agnos-socket-server-isn5.onrender.com");
```

---

## 👨‍💻 Author

Developed as part of the Agnos technical assignment.

Jitrakarn Intharawijit
