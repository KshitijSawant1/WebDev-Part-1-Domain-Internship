
# WebDev-Part-1-Domain-Internship

This repository documents the complete learning journey and project work done under the **Web Development Part-1 Domain Internship** program. It is a structured archive of hands-on coding sessions, real-world problem solving, and practical web app development using modern frontend technologies.

---

## 🧭 TaskDesk – Visual Task Graph WebApp

**Live Demo**: [Click To Experience](https://taskdesk-ks.netlify.app/)

<img src="https://github.com/user-attachments/assets/b85396ae-450d-45b3-adf1-a35155451293" alt="TaskGraph Preview" width="100%" style="border: 2px solid #ccc; border-radius: 8px;" />


**TaskDesk** is a mind-map-style task management web application that visualizes tasks based on priority and importance. It merges data organization with intuitive interaction, helping users see the "big picture" of their tasks through a clean, interactive graph.

### 🔍 Key Features

* **Radial Graph Layout**
  Tasks are distributed across concentric rings branching from a central "All Tasks" node. Each ring represents a priority category (e.g., "Priority & Important", "Not Important but Urgent").

* **Dynamic Task Rendering**
  The graph auto-generates nodes and edges based on real-time data fetched from a Supabase backend. Each node adapts in size to fit the content.

* **Smart Edge Handling**
  Custom source/target handles (`top-source`, `bottom-target`, etc.) allow for clean connection paths without visual clutter, even with dense graphs.

* **Interactivity Built with React Flow**
  Users can pan, zoom, and view details of each task node interactively. The graph fits to screen automatically and supports smooth user interaction.

* **Responsiveness**
  Built with mobile-first principles and React best practices, the graph maintains clarity and usability across screen sizes.



### 🎯 Purpose

This project demonstrates:

* Advanced usage of visual programming libraries (React Flow)
* Data-driven rendering of graphs with dynamic node layouts
* Practical application of React component design, hooks, and state management
* The ability to translate traditional task management into a visually intuitive experience

---

## 📚 Overview

The internship was designed to help learners:
- Build a strong foundation in **Web Development**
- Apply concepts through real-time projects
- Learn full-stack development using **ReactJS** and **Supabase**
- Improve problem-solving and UI design capabilities

The content is organized by session and project folders, reflecting weekly progress and major commits.

---

## 📁 Repository Structure

```

├── Engineering/
│   └── Diploma B1 Session 1
│
├── Finance Tracker/
│   └── Diploma Session – 4
│
├── Session 1/
│   └── Code Files 6 To 9 Commit
│
├── Session 2/
│   └── TaskDesk Updation and Session 3
│
├── Session 3/
│   └── Engineering Project Day 1
│
├── Task Webapp/
│   └── After Diploma Session Commit
│
└── .DS\_Store

````

---

## 🧠 Learning Journey (Session-wise)

### 🔹 Session 1: Introduction to Web Development
- HTML/CSS Refresh
- Basic JavaScript Programs
- DOM Manipulation

### 🔹 Session 2: ReactJS Fundamentals
- Functional Components
- State and Props
- Event Handling and Hooks (`useState`, `useEffect`)

### 🔹 Session 3: Engineering Project Kickoff
- Applying design thinking to a UI/UX-based engineering task
- Created layouts and interactive components

### 🔹 Task WebApp
- Developed a **task management mind map tool** using React Flow
- Integrated logic to visualize and manage task priority levels and connections
- Utilized Supabase for data persistence and auth

### 🔹 Finance Tracker Project
- Simulated a personal/project finance tracker
- Form handling, validation, and state management

---

## 🚀 Highlight Projects

### ✅ **Task Webapp**
A feature-rich visualization of tasks and dependencies using:
- 📍 Node-based diagramming with `React Flow`
- 🧭 Dynamic edge direction handling
- 🛠 Custom node and edge styling
- ☁️ Supabase backend for data sync

### ✅ **Finance Tracker**
- Local state-based tracker for expenses/income
- Core React features: component reuse, `useReducer`, data visualization

### ✅ **Engineering Project**
- Real-time UI challenges with adaptive design
- Visual thinking converted to front-end code

---

## 🧰 Tech Stack

| Layer        | Technology Used                     |
|--------------|-------------------------------------|
| Frontend     | HTML, CSS, JavaScript, ReactJS      |
| UI Libraries | React Flow, Tailwind CSS, Chakra UI |
| Backend      | Supabase (DB + Auth)                |
| Tools        | Git, GitHub, Vite, VS Code          |
| Hosting      | GitHub Pages / Netlify / Vercel     |

---

## 🛠 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/KshitijSawant1/WebDev-Part-1-Domain-Internship.git

2. Navigate to any project folder (e.g., `Task Webapp`):

   ```bash
   cd Task\ Webapp
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the project:

   ```bash
   npm run dev
   ```

> For Supabase-based apps, create a `.env` file and add:
>
> ```
> VITE_SUPABASE_URL=your_url
> VITE_SUPABASE_ANON_KEY=your_key
> ```

---

## 🗂 Documentation & Code Style

* Code is commented where logic is applied.
* Each session folder includes code files named logically by task.
* The `Task Webapp` is modular and separated by components, helpers, hooks, and pages.

---

## 🧾 Roadmap

* [x] HTML/CSS/JS Bootcamp
* [x] ReactJS Basics and Hooks
* [x] First React App (Task Desk)
* [x] Supabase Integration
* [x] Deployment on Netlify/Vercel
* [x] Add Markdown Docs for Each Project

---

## 📄 License

This repository is made available for educational and non-commercial use only. All project code is developed and maintained under the internship program.

---

## 👨‍💻 Author

**Kshitij Sawant**
📌 GitHub: [@KshitijSawant1](https://github.com/KshitijSawant1)
📧 Contact: Available via GitHub or professional channels

---

## 📝 Contributing

This repository is not open for public contributions as it reflects personal internship work. If you find an issue or have feedback, feel free to open an [issue](https://github.com/KshitijSawant1/WebDev-Part-1-Domain-Internship/issues).

---

```

Let me know if you’d like this in a downloadable `.md` file or want to include preview screenshots/gifs of the **Task Webapp**.
```
