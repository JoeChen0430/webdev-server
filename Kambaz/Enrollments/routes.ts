import EnrollmentsDao from "./dao";

// 5.4.8 On your own — enroll / unenroll, URL shape /api/users/:uid/courses/:cid
// (uid may be "current" = the signed-in user in the session)
export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  // Turns "current" into the session user's _id; responds 401 and returns null if nobody is signed in.
  const resolveUserId = (req, res) => {
    const { uid } = req.params;
    if (uid !== "current") return uid;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return null;
    }
    return currentUser._id;
  };

  const enrollUserInCourse = (req, res) => {
    const userId = resolveUserId(req, res);
    if (!userId) return;
    res.json(dao.enrollUserInCourse(userId, req.params.cid));
  };
  const unenrollUserFromCourse = (req, res) => {
    const userId = resolveUserId(req, res);
    if (!userId) return;
    dao.unenrollUserFromCourse(userId, req.params.cid);
    res.sendStatus(200);
  };
  // People table (5.4.9): everyone enrolled in a course
  const findUsersForCourse = (req, res) => {
    res.json(dao.findUsersForCourse(req.params.cid));
  };

  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
  app.get("/api/courses/:cid/users", findUsersForCourse);
}
