from ace_tools import display_dataframe_to_user
import pandas as pd

# Markdown content for the full README based on the user's project context and evaluation criteria
readme_content = """
# GymTracker – Webbasierte Fitnessverwaltungs-App 🏋️‍♂️💻

## 📋 Inhaltsverzeichnis

1. [Projektübersicht](#projektübersicht)
2. [User Stories & Akzeptanzkriterien](#user-stories--akzeptanzkriterien)
3. [Arbeitsplanung](#arbeitsplanung)
4. [Backend](#backend)
5. [Frontend](#frontend)
6. [JWT & Security](#jwt--security)
7. [Testkonzept](#testkonzept)
8. [Architektur](#architektur)
9. [Deployment](#deployment)
10. [Arbeitsjournal](#arbeitsjournal)
11. [Auswertung](#auswertung)
12. [Git-Prozess](#git-prozess)

---

## 📌 Projektübersicht

GymTracker ist eine webbasierte Fitnessverwaltungsplattform mit Rollentrennung (Admin/User), aufgeteilt in zwei Hauptbereiche:

- **Admin** kann: Mitglieder verwalten, Trainingspläne zuweisen, Statistiken sehen, neue Benutzer erstellen.
- **User** kann: Eigene Trainingspläne einsehen, Übungen abhaken und seinen Fortschritt verfolgen.

Das Projekt basiert auf einem **Spring Boot Backend**, einem **React-Frontend (Vite + MUI)** und verwendet **JWT-Authentifizierung**. Es wird vollständig via `docker-compose` containerisiert.

---

## ✅ User Stories & Akzeptanzkriterien

### User Story 1 – Als Admin will ich Trainingspläne zuweisen
**Akzeptanzkriterien:**
- Admin kann Benutzer aus Dropdown wählen
- Eingabe der Übungen als kommagetrennte Liste
- Plan wird gespeichert und dem User zugewiesen

### User Story 2 – Als Benutzer möchte ich Übungen abhaken
**Akzeptanzkriterien:**
- Benutzer sieht nur seine eigenen Pläne
- Checkbox ermöglicht Abhaken von Übungen
- Fortschritt wird persistent gespeichert

---

## 🗓️ Arbeitsplanung

| Aufgabe                      | Zeit (h) | Beschreibung                              |
|-----------------------------|----------|-------------------------------------------|
| Projektsetup (Backend + Frontend) | 4        | Grundgerüst & Routing                     |
| JWT + Security              | 3        | Token-Authentifizierung                   |
| AdminDashboard              | 5        | Tabstruktur, API-Anbindung, Plan erstellen |
| UserDashboard               | 5        | Trainingsplan-UI + Abhaken-Funktion       |
| Tests (Frontend + Backend) | 3        | Unit-Tests, Axios-Mocks                   |
| Deployment + Doku           | 2        | `docker-compose` Setup & README           |

---

## 🔧 Backend

- **Spring Boot** (Java 21)
- JWT Auth + Role-based Access (ADMIN/USER)
- REST-Controller für `/auth`, `/plans`, `/admin`, `/user`
- Datenbank: MySQL (via Docker)
- Beispiel: `POST /api/plans/{userId}` → Zuweisung von Plänen

> ✍️ Der Code ist mit JavaDoc kommentiert.

---

## ✅ Backend-Tests

1. **`PlanControllerTest.java`**
   - Testet: Plan-Erstellung via POST `/api/plans/{userId}`
2. **`AuthControllerTest.java`**
   - Testet: Registrierung & Login mit JWT-Ausgabe

Protokollierung erfolgt über `JUnit` & `MockMvc`.

---

## 🎨 Frontend

- **React (Vite)** mit **Material UI (MUI)**
- Rollenspezifische Navigation
- Axios für API-Calls mit Bearer Token
- Eigene Dashboards für `ROLE_ADMIN` und `ROLE_USER`

> ✍️ Alle Komponenten sind kommentiert (Props, States, Effects)

---

## ✅ Frontend-Tests

1. **AdminDashboard.test.jsx**
   - Testet Tabs und Userliste mit Axios Mock
2. **UserDashboard.test.jsx**
   - Testet Anzeigen & Abhaken von Übungen

> Tests basieren auf `@testing-library/react` & `jest`.

---

## 🔐 JWT & Security

- Login generiert JWT (mit Rolle)
- Token wird im Local Storage gespeichert
- Bei jedem API-Call wird `Authorization: Bearer <token>` mitgesendet
- Protected Routes mit `RequireAuth`

> ✍️ Backend prüft Token in `JwtAuthFilter`.

---

## 🛡️ Sicherheitskonzept

- Alle sensiblen Routen gesichert per Spring Security
- Keine Passwörter im Klartext gespeichert
- Cross-Origin geschützt mit `@CrossOrigin` Headern
- Rollenbasierte Endpunkte
  - `/admin/**` → nur Admin
  - `/user/**` → nur User

---

## 🧪 Testkonzept

| Testart          | Tool              | Status |
|------------------|-------------------|--------|
| Unit Tests       | JUnit, MockMvc    | ✅      |
| Frontend Tests   | Jest, React Testing Library | ✅      |
| Manuelle Tests   | Login, Plan-Abhaken, Rollencheck | ✅ |

---

## 🧱 Architektur

- **Frontend**: React SPA mit Context API & Protected Routing
- **Backend**: RESTful API mit Spring Security
- **Datenmodell**:
  - `User` (id, username, roles)
  - `Plan` (id, user_id, name)
  - `Exercise` (id, plan_id, name, completed)

![ERD Beispiel](https://example.com/erd-skizze.png)

---

## 🚀 Deployment

```bash
git clone <repo>
cd projektverzeichnis
docker-compose up --build
