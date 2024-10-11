
This project was built using NextJs, Tailwind, React query
Yuo was used for validation alongside react-hook-form for acepting user data. The student information page also doubles as the page to edit the students data. The app is on the /students route

The student data is stored in Redis, and you can use utility functions to handle the storage and retrieval of this data. Using uuid to generate unique student IDs and input validation ensures that only valid data is processed.

## Getting Started

First, clone the project:

```bash
git clone <project-url>
```
Install dependencies:

```bash
npm i
```
Install redis on mac:
```bash
 brew install redis
```
Alternatively, you can add redis url of a cloud hosted redis storage

*Redis Labs

*Amazon ElastiCache

*Upstash

Set your redis URL just like .env.example

start redis:
```bash
 brew services start redis
```

Open [http://localhost:3000/students](http://localhost:3000) with your browser to see your awesome Miva student management portal