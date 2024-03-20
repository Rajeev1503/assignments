# Chat App MERN Stack

This is a simple React chat application, A chat room to allow all the joined clients over websocket to communicate online through text.

## FRONTEND README

## Installation

1. Navigate into the project directory:

   ```bash
   cd chatapp
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Local Environment Variables

1. Create a .env file in the root directory and add these variables
   1. VITE_WS_URL = ws://localhost:8000
   2. VITE_LOCAL_SERVER_URL = http://localhost:8000

## Usage

To start the development server, run the following command:

```bash
npm run dev
```

## BACKEND README

## Installation

1. Navigate into the project directory:

   ```bash
   cd chatapp
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Local Environment Variables
1. Create a .env file in the root directory and add this variable
   1. MONGODB_URI = <!-- eg:- mongodb cluster uri-->
   <!-- eg:-  mongodb+srv://<username>:<password>@cluster0.ronsn.mongodb.net/<collectionName::eg:chatapp>?retryWrites=true&w=majority -->

## Usage

To start the development server, run the following command:

```bash
npm start
```
