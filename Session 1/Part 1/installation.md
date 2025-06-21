# Node.js and React Setup Guide

## 📌 Studio

Welcome to the setup guide for Node.js and React development. Follow the steps below to install the necessary tools and set up your environment.

---

## 📌 Introduction

This guide will walk you through installing Node.js, setting up a React project with Vite, and solving common installation issues.

---

## 📌 Installation

### Installing Node.js

1. Download Node.js from the [official website](https://nodejs.org/).
2. Run the installation setup and select the following options:
   - ✅ **Node.js runtime**
   - ✅ **npm package manager**
   - ✅ **Add to PATH**
3. Click **Next** and complete the installation.

After installation, verify Node.js and npm installation:

```cpp
node -v
npm -v
```

---

## 📌 Setting Up a React Project

To create a React project using Vite, run the following commands:

```cpp
npm create vite@latest app-name --template react
```

1. Select **React**.
2. Select **JavaScript**.
3. Navigate into the project folder:
   ```cpp
   cd app-name
   ```
4. Install dependencies:
   ```cpp
   npm install
   ```
5. Start the development server:
   ```cpp
   npm run dev
   ```

---

## 📌 Fixing PowerShell Execution Policy Issue (Windows)

If you encounter a security error while running npm commands, update your PowerShell execution policy:

1.  Open PowerShell as Administrator.
2.  Run the following commands:
    For One time Use but Don't Close the Terminal otherwise the Bypass will be closed
    ```cpp
    Get-ExecutionPolicy -List
     Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
     npm -v
    ```
        OR For Permanent Change
    ```cpp
    Get-ExecutionPolicy -List
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    npm -v
    ```

This will allow scripts to run temporarily for the current session.