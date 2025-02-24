# Blog API NodeJS and MYSQL(Dockerized)

This project is a **Blog API** built with **Node.js**, **Express.js**, and **MySQL**, using **Sequelize** as the ORM. The application is fully Dockerized and includes authentication, authorization, validation, and pagination.

## 🚀 Features

- **User Authentication & Authorization** (JWT-based login & role-based access control)
- **CRUD Operations** for Posts, Comments, Categories, and Users
- **Input Validation** using middleware
- **Pagination & Filtering** for posts
- **Sequelize ORM** for database management
- **Dockerized** environment for easy deployment
- **Database Migrations** handled by Sequelize CLI

## 📋 Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```ini
DB_USERNAME
DB_PASSWORD
DB_NAME
DB_HOST
JWT_SECRET
JWT_EXP
``` 

## 🐳 Docker Compose

To build and run the project, use:

```bash
docker-compose up --build
```

This will:
- Create and start a MySQL container.
- Build and start the Node.js application.
- Run Sequelize migrations after the database service is ready.

## 🧪 Database Migrations

Migrations are handled by Sequelize CLI. The `migration` service waits until the database is ready, then runs:

```bash
npx sequelize-cli db:migrate
```

## 🔍 Project Services

- **db_service:** MySQL container.
- **app:** Node.js application container.
- **migration:** Runs Sequelize migrations.


## 📜 License

This project is licensed under the MIT License.

---

✨ Happy coding!

