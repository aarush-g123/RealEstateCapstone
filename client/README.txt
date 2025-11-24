# RealEstateCapstone – Plumbing Project (Full-Stack Hello World)

This is the **Plumbing Project** for my CAPSTONE CS course.  
It’s a minimal but fully working **full-stack app** that proves my chosen technology stack works end-to-end before I build the full real estate platform.

The app is a simple **Contacts Dashboard**:

- Admins can log in with **Google**, add contacts, and see them saved in **MySQL**.
- Non-admin users can log in and **view** contacts but **cannot add** new ones.
- All reads and writes to the database are triggered from the **React UI**.

---

## 1. Tech Stack

### Hosting (for Plumbing Project)
- Local development on my laptop  
- (Future production target: **AWS Lightsail** Ubuntu instance hosting both client and server.)

### Frontend
- **React + Vite** – SPA front end
- **Tailwind CSS (CDN)** – for fast, utility-first styling
- **Axios** – HTTP client to call the backend API
- **@react-oauth/google** – Google Identity Services for login
- **React Context** – custom `AuthContext` to store the logged-in user

### Backend
- **Node.js + Express** – REST API server
- **Sequelize ORM** – models & queries for MySQL
- **mysql2** – MySQL driver
- **express-session** – session-based authentication
- **google-auth-library** – verify Google ID tokens on the server
- **cors**, **helmet**, **express-rate-limit**, **morgan** – security, CORS, rate limiting, logging
- **dotenv**, **nodemon** – environment config & dev auto-restart

### Database
- **MySQL**
- Database: `ida_plumbing` (name can be changed via `.env`)
- Managed through Sequelize

Tables:

- `users`
  - `id` (PK, auto-increment)
  - `googleId` (string, unique)
  - `email` (string, unique)
  - `name` (string)
  - `role` (`'admin' | 'viewer'`)
- `contacts`
  - `id` (PK, auto-increment)
  - `name` (string)
  - `email` (string)

---

## 2. Features Demonstrated

This project is intentionally small but shows all the “plumbing” that my final capstone will use:

- **Full stack integration**
  - React UI → Axios → Express API → Sequelize → MySQL and back
- **Database write from UI**
  - Admin fills out **Add Contact** form → POST `/api/contacts` → row inserted into `contacts`
- **Database read from UI**
  - Dashboard loads → GET `/api/contacts` → contacts rendered in a table
- **Authentication layer**
  - Login with **Google Identity Services** on the frontend
  - Server verifies ID token with `google-auth-library`
  - Session stored via `express-session` (cookie-based auth)
- **Role-Based Access Control (RBAC)**
  - First ever Google user to log in is created as **`admin`**
  - All subsequent users are created as **`viewer`**
  - Admin:
    - Can add contacts
    - Can view the contact list
  - Viewer:
    - Can view the contact list
    - Is denied when trying to add a contact (gets HTTP 403)
- **Health check**
  - `GET /healthz` → returns `{ status: "ok" }`

This matches the CAPSTONE Plumbing Project requirements: version control, UI/DB integration, auth, RBAC, and UI-triggered reads/writes.

---

## 3. Project Structure

```text
RealEstateCapstone/
  client/          # React + Vite frontend
    src/
      components/
        AddContactForm.jsx
        ContactTable.jsx
      context/
        AuthContext.jsx
      pages/
        LoginPage.jsx
        Dashboard.jsx
      App.jsx
      main.jsx
      index.css
    index.html
    package.json
  server/          # Node + Express backend
    src/
      config/
        db.js
      models/
        User.js
        Contact.js
        index.js
      middleware/
        authMiddleware.js
      routes/
        authRoutes.js      # /api/auth/login, /me, /logout
        contactRoutes.js   # /api/contacts
      index.js             # Express app entry
    package.json
  README.md
