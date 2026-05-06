<div align="center">
  <img src="https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

<br />

# 🚀 DSA Mastery Hub

**DSA Mastery Hub** is an intelligent, full-stack learning management platform designed to transform massive, disorganized folders of course videos into an elegant, trackable, and highly interactive learning experience. It was built with a focus on high-performance streaming, automated data ingestion, and premium "glassmorphism" UI design.

---

## 🌟 Key Features

* 📁 **Automated Video Ingestion:** A custom Spring Boot `DataLoader` engine automatically scans local directories for `.mp4` files on startup, recursively extracting folder names as topics and seeding the entire curriculum into the database instantly.
* 🤖 **AI-Assisted Notes:** Every video features a built-in persistent note-taking system. Users can click "AI Generate" to instantly generate key takeaways for the specific video they are watching.
* 🛡️ **Industry-Grade Security:** Complete Authentication flow with JWT (JSON Web Tokens), protected React routes, and secure password hashing.
* 📊 **Dynamic Progress Tracking:** Visual mastery dashboards, persistent video completion toggles, and animated streak counters.
* 🐳 **Production-Ready Infrastructure:** Migrated from volatile H2 in-memory databases to a persistent MySQL instance orchestrated seamlessly via Docker Compose.

---

## 🛠️ Tech Stack

### Frontend
* **Core:** React.js powered by Vite
* **Styling:** Tailwind CSS & Glassmorphism Aesthetics
* **Animations:** Framer Motion
* **Routing & State:** React Router DOM
* **Icons:** Lucide React

### Backend
* **Core:** Java 17 + Spring Boot 3
* **Security:** Spring Security + JWT Authentication
* **Data Access:** Spring Data JPA (Hibernate)
* **Databases:** MySQL 8.0 (Production) & H2 (Development)
* **Utilities:** Lombok

### Infrastructure
* **Containerization:** Docker & Docker Compose
* **Version Control:** Git & GitHub

---

## 🚀 Getting Started (Local Development)

### Prerequisites
* **Java 17**
* **Node.js 18+**
* **Docker Desktop** (optional, for MySQL)

### 1. Start the Database (Optional for Prod Mode)
If you wish to use the persistent MySQL database:
```bash
docker-compose up -d
```
*(Otherwise, the application will fallback to the H2 In-Memory database automatically).*

### 2. Run the Backend
Navigate to the `backend` directory and start the Spring Boot server:
```bash
cd backend
./mvnw clean spring-boot:run
```

### 3. Run the Frontend
Navigate to the `frontend` directory, install dependencies, and run the Vite dev server:
```bash
cd frontend
npm install
npm run dev
```

### 4. Important: Video Serving
The frontend relies on a specific folder mapping for the automated course builder. Place your video course folder inside:
`frontend/public/course`
*(Note: It is recommended to use an OS symlink/junction rather than copying gigabytes of videos directly into the public folder).*

---

## 👨‍💻 Author
**Utkarsh Barade**
<br>Software Engineer & DSA Enthusiast
