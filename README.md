# 📇 React + Django Contact List App

A simple **full-stack Contact List application** built with **React**, **Tailwind CSS**, and **Django REST Framework**.
This project demonstrates basic **CRUD operations** and frontend–backend communication using REST APIs.

---

## 🚀 Features

- Create a new contact
- View list of contacts
- Update existing contacts
- Delete contacts
- Clean and responsive UI using Tailwind CSS

---

## 🛠 Tech Stack

### Frontend
- React
- Tailwind CSS
- JavaScript (Fetch API)

### Backend
- Django
- Django REST Framework
- SQLite (default)

---

## 📂 Project Structure

react-django-contact-app/
│
├── backend/
│   ├── contact_project/
│   ├── contacts/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/contacts/` | Get all contacts |
| POST | `/api/contacts/` | Create a contact |
| PUT | `/api/contacts/{id}/` | Update a contact |
| DELETE | `/api/contacts/{id}/` | Delete a contact |

---

## ⚙️ How to Run the Project

### Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

![alt text](image.png)
