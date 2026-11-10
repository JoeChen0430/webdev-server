import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function isEnrolled(userId, courseId) {
    return db.enrollments.some(
      (e) => e.user === userId && e.course === courseId,
    );
  }
  function enrollUserInCourse(userId, courseId) {
    // Enrolling twice is a no-op, so the same course never shows up twice.
    const existing = db.enrollments.find(
      (e) => e.user === userId && e.course === courseId,
    );
    if (existing) return existing;
    const enrollment = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments.push(enrollment);
    return enrollment;
  }
  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId),
    );
  }
  function findUsersForCourse(courseId) {
    return db.users.filter((user) => isEnrolled(user._id, courseId));
  }
  function deleteEnrollmentsForUser(userId) {
    db.enrollments = db.enrollments.filter((e) => e.user !== userId);
  }
  return {
    isEnrolled,
    enrollUserInCourse,
    unenrollUserFromCourse,
    findUsersForCourse,
    deleteEnrollmentsForUser,
  };
}
