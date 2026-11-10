import AssignmentsDao from "./dao";

// 5.4.7 On your own — same URL pattern as modules:
//   GET/POST       /api/courses/:courseId/assignments
//   GET/PUT/DELETE /api/assignments/:assignmentId
export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    res.json(dao.findAssignmentsForCourse(courseId));
  };
  const createAssignmentForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignment = { ...req.body, course: courseId };
    res.json(dao.createAssignment(assignment));
  };
  // The Assignment Editor loads one assignment by its ID.
  const findAssignmentById = (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.findAssignmentById(assignmentId);
    if (!assignment) {
      res.status(404).json({ message: `Unable to find Assignment with ID ${assignmentId}` });
      return;
    }
    res.json(assignment);
  };
  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    dao.deleteAssignment(assignmentId);
    res.sendStatus(200);
  };
  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.updateAssignment(assignmentId, req.body);
    if (!assignment) {
      res.status(404).json({ message: `Unable to update Assignment with ID ${assignmentId}` });
      return;
    }
    res.json(assignment);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
