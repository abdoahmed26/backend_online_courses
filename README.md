# 🎨 **Online Courses API**

A Online Courses APIs implemented with (Node.js, Express.js, PostgreSQL, ORM Sequelize)


## ✨ Follow Me
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin&labelColor=blue)](https://www.linkedin.com/in/abdo-ahmed-67185a28a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
 [![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github&labelColor=black)](https://github.com/abdoahmed26)


## 📋 Table of content
- [Installation](#Installation)
- [Usage](#Usage)
- [Tech Stack](#Tech-Stack)
- [Features](#Features)
- [Documentation](#Documentation)

## 📥 Installation

1- **Clone the repo**

```bash
git clone https://github.com/abdoahmed26/backend_online_courses.git
cd backend_online_courses
```
2- **Install dependencies**

```bash
npm install
```
3- **Setup environment variables**
```env
DATABASE_URL = your database url

CLOUDINARY_URL = cloudinary api

CLOUDINARY_FILE = your cloudinary folder name

STRIPE_SCRET_KEY = your stripe scret key

JWT_SECRET = random value

EMAIL = your email

PASS = your password

PORT = your port ex(5000)

NODE_ENV = development / producation
```

## 🔧 Usage

```bash
npm run dev
```

## 🚀 Tech Stack
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Web application framework for Node.js.
- **PostgreSQL**: SQL database.
- **Sequelize**: ORM for PostgreSQL.
- **Multer**: Middleware for handling multipart/form-data,   primarily used for file uploads.
- **Cloudinary**: Cloud-based image and video management.
- **Stripe**: Payment processing.
- **Helmet**: Middleware for help secure Express apps.
- **Express Rate Limit**: Middleware for limit repeated requests to public APIs and/or endpoints.
- **Express Validator**: Middleware for server-side validation.
- **Compression**: Middleware to compress response bodies.
- **Dotenv**: Module to load environment variables from a .env file.
- **CORS**: Middleware to enable CORS.
- **Bcrypt**: Library to hash passwords.
- **Nodemailer**: Library for sending email
- **Jsonwebtoken**: Library for sign and verify token 


## ⚙ Features

- **👤 User Management** 
    - user can register new account
    - user can login 
    - user can login with google
    - user can update his (personal infos, email, password)
    - user can reset his password in case of forgotten 
- **Category Management**
    - user can read all categories
    - admins and manager can (create, update, delete) category
    - user can see food categories
- **Courses Management**
    - user can read all courses
    - admins and manager can (create, update, delete) courses
- **Lessons Management**
    - The user can see the course lessons he purchased
    - admins and manager can (create, update, delete) lessons
- **Plans management**
    - user can see all plans and can choose one of them
    - admins and manager can (create, update, delete) plans
- **Features management**
    - user cant see all plans features
    - admins and manager can (create, update, delete) features
- **File uploads Management**
    - admin and manager can upload images for categories and courses and videos of lessons
- **Reviews Management**
    - users can add review about the courses or lessons, can update or delete it, and can view all reviews
- **Payment**
    - user can pay the price of plan using stripe

## Documentation

**[Documentation](https://documenter.getpostman.com/view/31014616/2sAYdcqrq2)**