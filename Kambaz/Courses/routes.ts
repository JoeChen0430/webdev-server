import CoursesDao from "./dao";
import EnrollmentsDao from "../Enrollments/dao";

export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  const findAllCourses = (req, res) => {
    res.json(dao.findAllCourses());
  };
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    res.json(dao.findCoursesForEnrolledUser(userId));
  };
  // 5.4.5.2 — create a course and enroll its creator (requires a signed-in user)
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newCourse = dao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  // POST /api/courses — the book's sample Dashboard posts here without a session;
  // still enroll the creator when someone is signed in.
  const createCourseAnonymous = (req, res) => {
    const newCourse = dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    }
    res.json(newCourse);
  };
  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    dao.deleteCourse(courseId);
    res.sendStatus(200);
  };
  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const course = dao.updateCourse(courseId, req.body);
    if (!course) {
      res.status(404).json({ message: `Unable to update Course with ID ${courseId}` });
      return;
    }
    res.json(course);
  };

  app.get("/api/courses", findAllCourses);
  app.post("/api/courses", createCourseAnonymous);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
}
