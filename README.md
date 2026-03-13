# Agnos Assignment – Patient Real-Time Form & Staff Dashboard

## 📌 Project Overview

This project demonstrates a real-time patient form system where patient input is synchronized live to a staff dashboard.
While the patient is filling out the form, the staff interface updates automatically to reflect the latest data and status.

The goal is to simulate a simplified **hospital intake system** where medical staff can monitor patient information as it is being entered.

---

# 🚀 Installation Guide

## 1. Clone the repository

```bash
git clone <repository-url>
cd agnos-assignment
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start the Socket Server

```bash
node server.js
```

The socket server will run on:

```
http://localhost:4000
```

## 4. Start the Next.js application

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

---

# ✨ Features

### Real-Time Patient Data Sync

Patient input is sent to the server and instantly reflected in the staff dashboard using **Socket.IO**.

### Live Patient Status

The dashboard shows the current patient activity:

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
| Desktop | Three column grid    |

---

# 🗂 Project Structure

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

# 🎨 UI/UX Design Decisions

### Clean Medical Dashboard Style

The interface follows a simple and clear layout commonly used in hospital dashboards.

Key principles:

* Clear section grouping
* Readable typography
* Minimal visual noise

### Information Grouping

The patient form is divided into logical sections:

* Personal Information
* Contact Information
* Emergency Contact

This helps staff quickly scan relevant information.

### Status Indicator

The dashboard uses a **visual status indicator** with color codes:

| Color  | Meaning        |
| ------ | -------------- |
| Yellow | Patient typing |
| Green  | Form submitted |
| Gray   | Idle           |

A pulse animation is used to highlight real-time activity.

---

# 🧩 Component Architecture

### PatientForm

Handles:

* Form state management
* Sending updates via socket
* Emitting typing and submit status

### StaffView

Responsible for:

* Listening to real-time socket events
* Rendering patient data
* Displaying activity status

### FormField

Reusable component used for rendering:

* Input
* Select
* Textarea

This improves code reuse and consistency.

### Socket Client

Located in:

```
src/lib/socket.ts
```

This module initializes and exports the socket connection used across the application.

---

# ⚡ Real-Time Synchronization Flow

The application uses **Socket.IO** to synchronize data between the patient form and staff dashboard.

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

| Event             | Description                     |
| ----------------- | ------------------------------- |
| patient-update    | Sends updated form data         |
| patient-status    | Sends current patient status    |
| patient-submitted | Sent when the form is completed |

### Typing Detection

When the patient types:

```
socket.emit("patient-status", "typing")
```

### Idle Detection

If no input occurs for 10 seconds:

```
socket.emit("patient-status", "idle")
```

### Form Submission

When the form is submitted:

```
socket.emit("patient-status", "submitted")
```

---

# 🔧 Technologies Used

| Technology   | Purpose                 |
| ------------ | ----------------------- |
| Next.js      | React framework         |
| React        | UI development          |
| Tailwind CSS | Styling                 |
| Socket.IO    | Real-time communication |
| TypeScript   | Type safety             |

---

# 📈 Possible Improvements

If the project were expanded further:

* Multi-patient monitoring dashboard
* Online/offline detection
* Patient queue management
* Form validation improvements
* Authentication for staff access

---

# 👨‍💻 Author

Developed as part of the Agnos technical assignment.

Live Demo

Patient Form
https://agnos-assignment-7n42v3bod-jitrakarn-intharawijits-projects.vercel.app/patient

Staff Dashboard
https://agnos-assignment-7n42v3bod-jitrakarn-intharawijits-projects.vercel.app/staff