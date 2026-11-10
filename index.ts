import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import type { SessionOptions } from "express-session";
import db from "./Kambaz/Database/index";
import Hello from "./Hello";
import Lab5 from "./Lab5/index";
import UserRoutes from "./Kambaz/Users/routes";
import CourseRoutes from "./Kambaz/Courses/routes";
import ModuleRoutes from "./Kambaz/Modules/routes";
import AssignmentRoutes from "./Kambaz/Assignments/routes";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes";

const app = express();

// 1) CORS first: allow cookies, and only from the React app's origin.
//    CLIENT_URL may list several origins separated by commas
//    (e.g. the Vercel production URL and the a5 branch preview URL).
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""));
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  }),
);

// 2) Sessions, after CORS and before express.json() and the routes.
const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  // Render sits behind a proxy; the Vercel origin needs a cross-site, secure cookie.
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}
app.use(session(sessionOptions));

// 3) Parse JSON request bodies into req.body.
app.use(express.json());

// 4) Routes
UserRoutes(app, db);
CourseRoutes(app, db);
ModuleRoutes(app, db);
AssignmentRoutes(app, db);
EnrollmentRoutes(app, db);
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);
