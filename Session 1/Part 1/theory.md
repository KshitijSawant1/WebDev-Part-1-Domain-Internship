### **Session 1: Node.js Introduction + JS Essentials Refresher**
#### **1st Hour: Node.js Fundamentals**

  ## 1. 1 What is Node.js?
### Definition
Node.js is a tool that lets you run JavaScript code outside the web browser, directly on your computer.
### Why it matters:
- Traditional JavaScript runs only in browsers.
- Node.js allows you to use JS on the server-side (backend).
- It's built on the V8 JavaScript engine (the same engine Chrome uses).

## 1.2 Why Use Node.js in Web Development?
### What is Web Development?
Web development usually has two parts:

- Frontend – What users see (HTML, CSS, JavaScript in the browser)
- Backend – What happens behind the scenes (server, database, APIs)

 ### 1.3 Why Use Node.js in Web Development?
### Why Use Node.js in Web Development?

| # | Feature                     | Description                                                                 |
|------|-------------------------------|--------------------------------------------------------------------------------|
| 1    | **Same Language Everywhere**  | Use **JavaScript** for both **frontend and backend**.                         |
|      |                               | No need to learn multiple languages (like Java + JS).                         |
| 2    | **Fast and Efficient**        | Built on **Chrome’s V8 engine**, Node.js runs JavaScript very fast.          |
|      |                               | Can handle many users at once efficiently.                                   |
| 3    | **Huge Library Support (NPM)**| Comes with **NPM**, which offers **1M+ free packages** for development.       |
|      |                               | Helps you build apps faster with reusable code.                              |
| 4    | **Real-Time Application Friendly** | Great for apps like **chat, games, or live updates**. Supports **WebSockets**. |
| 5    | **Perfect for Modern Web Tools** | Works with tools like **React, Angular, Vue** for project setup and building. |

### 1.3.1 Node.js as a JavaScript Runtime Outside the Browser

By default, **JavaScript runs only inside web browsers** (like Chrome, Firefox, or Edge). This means you can use it to build things like:

- Animations on websites  
- Form validations  
- Interactive UI elements

### 1.4 What does "JavaScript runtime" mean?

A **runtime** is the environment where your code runs.

- The **browser** is a JavaScript runtime.
- **Node.js** is another runtime — but it runs JavaScript **outside the browser**.

---

### Why is this important?

With Node.js, you can:

- Run JavaScript directly from your **terminal**
- Use JavaScript to build **backend servers**, **APIs**, and **tools**
- Access files, databases, and networks — things browsers can’t do

---

### Example:

Create a file called `hello.js` with this code:

```js
console.log("Hello from Node.js!");
```
### 1.5 How Node.js Supports React Projects

Although React is a front-end JavaScript library that runs in the browser, the development and maintenance of React applications heavily rely on **Node.js**. Node.js serves as a **runtime environment** that enables essential development tools and workflows for building and managing modern web applications.

The following are key areas where Node.js contributes significantly to React projects:

---

#### 1. Package Management
Node.js comes bundled with **Node Package Manager (NPM)** and supports **NPX**, both of which are vital for managing React dependencies.

- **NPM** allows developers to install, update, and manage packages required by React applications (e.g., `react`, `react-dom`, `react-router`).
- **NPX** enables execution of Node packages without the need to install them globally. For instance, the `create-react-app` tool is commonly used via NPX to scaffold new React applications.

**Example:**
```bash
npx create-react-app my-app
```
### 1.6 Installing Node.js and Verifying the Installation

To begin working with Node.js,install it on te system. Node.js comes bundled with **NPM (Node Package Manager)**, which is essential for managing packages and running commands in modern JavaScript and React development.


### Step 1: Download Node.js

1. Visit the official Node.js website:  
   [https://nodejs.org/](https://nodejs.org/)

2. You will see two versions:
   - **LTS (Long-Term Support)** – Recommended for most users
   - **Current** – Contains the latest features, but may be less stable

   Choose the **LTS version** and download the installer suitable for your operating system (Windows, macOS, or Linux).

### Step 2: Install Node.js

- Open the downloaded file and follow the installation steps.
- Accept the default settings (Next → Next → Finish).
- This will install both **Node.js** and **NPM** on your system.

### Step 3: Verify the Installation

After the installation is complete:
1. Open a **terminal** (Command Prompt on Windows, Terminal on macOS/Linux)
2. Type the following commands to check the installed versions:

```bash
node -v
```  
### 1.7 NPM vs NPX vs Yarn basics

| Parameter           | **NPM**                                | **NPX**                                      | **Yarn**                                |
|---------------------|-----------------------------------------|----------------------------------------------|------------------------------------------|
| Full Form           | Node Package Manager                   | Node Package Execute                         | Yet Another Resource Navigator           |
| Purpose             | Install & manage packages              | Run packages without installing              | Install & manage packages (like NPM)     |
| Installation        | Comes with Node.js                     | Comes with Node.js (v5.2+ and above)         | Needs to be installed separately         |
| Global Install      | Required for CLI tools                 | Not required                                 | Global install optional                  |
| Usage Example       | `npm install express`                  | `npx create-react-app my-app`                | `yarn add express`                       |
| Speed               | Slower compared to Yarn                | Executes packages directly                   | Faster with better caching               |
| Lock File           | Uses `package-lock.json`               | No lock file                                 | Uses `yarn.lock`                         |
| Preferred For       | Most standard projects                 | Running project scaffolding tools            | Large projects, faster installs          |

### 1.8 Running a Simple Node.js Script

After installing Node.js, you can start writing and executing JavaScript files directly from your terminal using Node.

Follow the steps below to run your first Node.js script:


### Step 1: Create a JavaScript File

Create a new file named `hello.js` in your project folder.

Add the following code to the file:

```js
console.log("Hello from Node.js!");
``` 
### Step 2: Create a JavaScript File
Create a new file named hello.js:
touch hello.js
### Step 3: Write Your Script
Open hello.js and add the following code:
 console.log("Hello from Node.js!");
 ### Step 4: Run the Script
In the terminal, make sure you are in the same directory as hello.js, then run:
node hello.js
### Expected Output
Hello from Node.js!