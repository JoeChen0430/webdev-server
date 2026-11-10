# webdev-server

Express.js HTTP server for the Kambaz application (Chapter 5, A5).
Data lives in process memory — restarting the server resets it to `Kambaz/Database/*.json`.

## Run

```bash
npm install
npm run dev   # nodemon --exec tsx index.ts  (auto-restart)
npm start     # tsx index.ts                 (what Render runs)
```

Listens on `PORT` or `4000`. Local `.env` (not committed):

```
SERVER_ENV=development
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:4000
SESSION_SECRET=super secret session phrase
```

`CLIENT_URL` may list several origins separated by commas (e.g. Vercel production + a5 preview).

## Routes

### Lab 5

| Method | Path |
| --- | --- |
| GET | `/`, `/hello`, `/lab5/welcome` |
| GET | `/lab5/{add,subtract,multiply,divide}/:a/:b` |
| GET | `/lab5/calculator?operation=add\|subtract\|multiply\|divide&a=&b=` |
| GET | `/lab5/assignment`, `/lab5/assignment/title`, `/lab5/assignment/title/:newTitle` |
| GET | `/lab5/assignment/score/:newScore`, `/lab5/assignment/completed/:completed` |
| GET | `/lab5/module`, `/lab5/module/name`, `/lab5/module/name/:newName` |
| GET | `/lab5/module/description`, `/lab5/module/description/:newDescription` |
| GET | `/lab5/todos[?completed=true]`, `/lab5/todos/create`, `/lab5/todos/:id` |
| GET | `/lab5/todos/:id/delete`, `/lab5/todos/:id/title/:title` |
| GET | `/lab5/todos/:id/completed/:completed`, `/lab5/todos/:id/description/:description` |
| POST | `/lab5/todos` (body = todo, responds with the new todo) |
| PUT | `/lab5/todos/:id` (body = updates, 404 if missing) |
| DELETE | `/lab5/todos/:id` (404 if missing) |

### Kambaz

| Method | Path | Notes |
| --- | --- | --- |
| POST | `/api/users/signup` `/signin` `/signout` `/profile` | session-based; 400 / 401 on failure |
| GET, POST | `/api/users` | People: all users / create user |
| GET, PUT, DELETE | `/api/users/:userId` | |
| GET | `/api/users/:userId/courses` | `current` = signed-in user (401 if none) |
| POST | `/api/users/current/courses` | create course + enroll creator |
| POST, DELETE | `/api/users/:uid/courses/:cid` | enroll / unenroll (`uid` may be `current`) |
| GET, POST | `/api/courses` | |
| PUT, DELETE | `/api/courses/:courseId` | delete also removes its enrollments |
| GET | `/api/courses/:cid/users` | People table: users enrolled in a course |
| GET, POST | `/api/courses/:courseId/modules` | |
| PUT, DELETE | `/api/modules/:moduleId` | |
| GET, POST | `/api/courses/:courseId/assignments` | |
| GET, PUT, DELETE | `/api/assignments/:assignmentId` | |

Signed-in requests from the React app must use `axios.create({ withCredentials: true })`.
