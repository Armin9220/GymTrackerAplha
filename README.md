# GymTracker – Vollständige Dokumentation

## Inhaltsverzeichnis
1. [Projektübersicht](#projektübersicht)
2. [User Stories und Akzeptanzkriterien](#user-stories-und-akzeptanzkriterien)
3. [Arbeitsplanung](#arbeitsplanung)
4. [Backend](#backend)
5. [Frontend](#frontend)
6. [JWT und Sicherheit](#jwt-und-sicherheit)
7. [Testkonzept](#testkonzept)
8. [Architektur](#architektur)
9. [Deployment](#deployment)
10. [Arbeitsjournal](#arbeitsjournal)
11. [Auswertung](#auswertung)
12. [Git-Prozess](#git-prozess)

---

## Projektübersicht
GymTracker ist eine webbasierte Fitnessverwaltungs-App auf Basis von Spring Boot und React. Administratoren verwalten Mitglieder und Trainingspläne, während Benutzer ihre eigenen Pläne einsehen und ihren Fortschritt verfolgen. Das System setzt konsequent auf JWT-Authentifizierung und ist über Docker Compose lauffähig.

---

## User Stories und Akzeptanzkriterien

### User Story 1 – Trainingspläne zuweisen (Admin)
*Als Administrator möchte ich Mitgliedern Trainingspläne zuweisen können.*

**Akzeptanzkriterien**
- Admin kann einen Benutzer aus einer Liste auswählen.
- Übungen werden als kommagetrennte Liste erfasst.
- Nach dem Speichern ist der Plan dem Benutzer zugewiesen und abrufbar.

### User Story 2 – Übungen abhaken (Benutzer)
*Als Benutzer möchte ich meine Übungen abhaken können.*

**Akzeptanzkriterien**
- Benutzer sieht nur seine eigenen Trainingspläne.
- Checkbox ermöglicht das Abhaken einzelner Übungen.
- Der Fortschritt wird dauerhaft gespeichert.

---

## Arbeitsplanung

| Arbeitspaket | Aufwand (h) | Beschreibung |
|--------------|------------|--------------|
| Projektsetup (Backend/Frontend) | 4 | Grundlegende Struktur, Routing und Datenbank |
| JWT und Security | 3 | Implementierung der Authentifizierung und Rollen |
| AdminDashboard | 5 | Mitgliederverwaltung, Planerstellung und Statistiken |
| UserDashboard | 5 | Anzeige der Trainingspläne und Fortschritts-Update |
| Tests (Backend & Frontend) | 3 | Automatisierte Unit- und Integrationstests |
| Deployment & Dokumentation | 2 | Docker Compose sowie finale README |

---

## Backend
- **Technologie:** Spring Boot 3 (Java 21)
- **Datenbank:** MySQL (Docker)
- **Wichtige Pakete:** `controller`, `model`, `repositories`, `security`
- **Funktionen:**
  - Authentifizierung und Registrierung unter `/api/auth` (siehe `AuthController.java`).
  - CRUD für Trainingspläne unter `/api/plans` (siehe `PlanController.java`).
  - Admin-Endpunkte unter `/api/admin` für Benutzerliste und Statistiken (siehe `AdminController.java`).
- **Transaktionen:** Datenbankzugriffe erfolgen über Spring Data JPA. Kritische Operationen wie das Aktualisieren eines Plans sind mit `@Transactional` abgesichert, um Konsistenz zu gewährleisten.
- **Code-Dokumentation:** Alle Controller und Services enthalten JavaDoc-Kommentare.

### Backend-Tests
Im Verzeichnis `backend/src/test/java` befinden sich zwei Tests:
1. **`GymTrackerApplicationTests.java`** – Testet das Laden des Anwendungskontexts.
2. **`TrainingPlanControllerTests.java`** – Prüft einen öffentlichen und einen geschützten Endpunkt mittels `MockMvc`.

Die Tests werden mit `mvn test` ausgeführt und protokolliert.

---

## Frontend
- **Technologie:** React (Vite) mit Material UI
- **Module:** `AdminDashboard.jsx`, `UserDashboard.jsx`, `Login.jsx`, `SignUp.jsx`, `RequireAuth.jsx` u.a.
- **Funktionen:**
  - Rollenspezifische Navigation über React Router.
  - Axios für API-Calls inkl. JWT-Token.
  - Admin kann Pläne erstellen und Benutzer verwalten, Benutzer sehen ihren eigenen Plan und können Übungen abhaken.
- **Code-Dokumentation:** Komponenten enthalten Kommentare zu Props, State und Hooks.

### Frontend-Tests
Im Verzeichnis `frontend/src/modules` liegen die Jest-Tests:
1. **`AdminDashboard.test.jsx`** – Testet Tabs und das Laden der Benutzerliste via Axios-Mock.
2. **`UserDashboard.test.jsx`** – Testet das Anzeigen und Abhaken von Übungen (Platzhalter-Test-Beispiel).

Die Tests werden mit `npm test` im Frontend-Verzeichnis ausgeführt.

---

## JWT und Sicherheit
- **Login:** `AuthController` generiert nach erfolgreicher Anmeldung ein JWT.
- **Speicherung:** Token wird im Local Storage gehalten und bei Anfragen als `Authorization: Bearer <token>` gesendet.
- **Backend-Prüfung:** In `AuthTokenFilter` wird jedes Token validiert. Unauthentisierte Aufrufe erhalten `401 Unauthorized`.
- **Rollen:** Endpunkte sind über `@PreAuthorize` bzw. Spring Security-Konfiguration geschützt (z.B. `/api/admin/**` nur für ROLE_ADMIN).

### Sicherheitskonzept
- Passwörter werden mit BCrypt gehasht.
- CORS-Konfiguration in `CorsConfig.java` verhindert unbefugte Zugriffe von anderen Domains.
- Kein direkter Datenbankzugriff aus dem Frontend.
- Regelmäßige Tests der Endpunkte gegen unautorisierte Zugriffe.

---

## Testkonzept

| Testart | Tool | Beschreibung |
|---------|------|--------------|
| Backend-Unit/Integration | JUnit, MockMvc | Tests der REST-Endpunkte und Sicherheitsmechanismen |
| Frontend-Komponententests | Jest, @testing-library/react | Rendering und Benutzerinteraktionen |
| Manuelle Tests | Browser, Postman | Login-Flow, Rollenprüfung, Planverwaltung |

Alle Testergebnisse werden im CI-Protokoll gespeichert.

---

## Architektur
- **Backend**: Mehrschichtige Spring-Boot-Struktur (Controller → Repository → Datenbank). Die Security-Komponenten kapseln die Authentifizierung.
- **Frontend**: React Single Page Application mit Context API für Auth-Status und geschützten Routen.
- **Datenmodell**: Benutzer (`User`), Rollen (`Role`/`ERole`), Trainingspläne (`Plan`, `TrainingPlan`), Übungen (`Exercise`).
- **Illustration**: Eine einfache ER-Diagramm-Skizze zeigt die Beziehungen zwischen User, Plan und Exercise.

---

## Deployment
1. Repository klonen:
   ```bash
   git clone <repo-url>
   cd GymTrackerAplha
   ```
2. Docker Compose starten:
   ```bash
   docker-compose up --build
   ```
   ODER

   zuerst mysql server starten auf standardport docker-compose up -d

  danach backend mit zuerst cd backend dann mvn clean spring-boot:run

  danach cd frontend und im frontend dann npm run dev
   
4. Frontend ist auf `http://localhost:5173` erreichbar, Backend auf `http://localhost:8080`.

---

## Arbeitsjournal
| Block | Datum/Zeit | Dauer | Geplant | Geschafft | Probleme |
|-------|------------|-------|---------|-----------|----------|
| 1 | 01.05. 09:00 | 2h | Projektsetup | Backend/Frontend init | keine |
| 2 | 02.05. 13:00 | 3h | Auth einrichten | Login & Signup fertig | Token-Fehler behoben |
| 3 | 04.05. 10:00 | 4h | AdminDashboard | Benutzerverwaltung implementiert | MUI Styling |
| 4 | 05.05. 15:00 | 3h | UserDashboard | Plan-Anzeige & Checkboxen | API-Rückgaben anpassen |
| 5 | 06.05. 11:00 | 2h | Tests schreiben | Backend- & Frontend-Tests laufen | Mocking von Axios |
| 6 | 07.05. 08:00 | 2h | Deployment & Doku | Docker Compose & README | - |

---

## Auswertung
Der Soll-Ist-Vergleich zeigt nur geringe Abweichungen. Alle geplanten Funktionen konnten umgesetzt werden. Probleme traten hauptsächlich bei der JWT-Validierung auf, wurden jedoch zeitnah behoben. Die Tests laufen erfolgreich durch und decken die Kernfunktionen ab.

---

## Git-Prozess
- Entwicklung erfolgte über Feature-Branches mit regelmäßigen Pull Requests.
- Commits sind aussagekräftig kommentiert, z.B. `Implement JWT login` oder `Add AdminDashboard tests`.
- Die finale Version befindet sich im `main`-Branch und ist sauber zusammengeführt.

---
