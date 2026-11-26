# Toppers Backend

Node.js and Express API for the Toppers tuition app. Data is stored in MongoDB
using Mongoose.

## Build steps

1. **Create the app template:** `src/app.js` configures Express, JSON parsing,
   health check, API routing, and centralized errors. `src/server.js` connects to
   MongoDB before accepting requests.
2. **Add the data models:** student details and their point history are stored
   together; each student point entry includes the points, timestamp, and an
   optional note. A schedule stores the subject, class, and start time.
3. **Expose the API:** student and schedule routes create and retrieve records;
   student routes also support updates, deletion, and daily point history.

## Setup

Requirements: Node.js 20+ and MongoDB.

```sh
npm install
cp .env.example .env
# Set MONGODB_URI in .env if your MongoDB server uses a different address.
npm run dev
```

The API listens on port `3000` by default. Set `PORT` to change it. Run tests
with `npm test`.

## API

All request and response bodies use JSON. The health endpoint is `GET /health`.

### Students

- `POST /api/students` — create with `{"name":"Asha Patel","className":"Grade 8"}`
- `GET /api/students` — list students and their total points
- `GET /api/students/:studentId` — get a student's details and point history
- `PATCH /api/students/:studentId` — update `name` and/or `className`
- `DELETE /api/students/:studentId` — delete a student
- `POST /api/students/:studentId/points` — record points, for example
  `{"points":5,"earnedAt":"2026-11-26T14:30:00.000Z","note":"Quiz"}`
- `GET /api/students/:studentId/points?date=2026-11-26` — get that student's
  point entries and total for the requested UTC calendar day. `date` is
  required and must use `YYYY-MM-DD`; `earnedAt` defaults to the current time
  when omitted.

Each successful point entry is added to the student's history and total in a
single document update. Points must be positive whole numbers.

### Class schedules

- `POST /api/schedules` — create a schedule with
  `{"subject":"Mathematics","topic":"Fractions","class":"Grade 8","startsAt":"2026-11-27T16:00:00.000Z"}`
- `GET /api/schedules` — list schedules ordered by start time

Schedule `startsAt` values should be ISO 8601 timestamps with a timezone.
