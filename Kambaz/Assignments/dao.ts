import { v4 as uuidv4 } from "uuid";

// 5.4.7 On your own — same shape as the Modules DAO
export default function AssignmentsDao(db) {
  function findAssignmentsForCourse(courseId) {
    return db.assignments.filter((a) => a.course === courseId);
  }
  function findAssignmentById(assignmentId) {
    return db.assignments.find((a) => a._id === assignmentId);
  }
  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }
  function deleteAssignment(assignmentId) {
    db.assignments = db.assignments.filter((a) => a._id !== assignmentId);
  }
  function updateAssignment(assignmentId, assignmentUpdates) {
    const assignment = findAssignmentById(assignmentId);
    if (!assignment) return undefined;
    Object.assign(assignment, assignmentUpdates, { _id: assignmentId });
    return assignment;
  }
  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
