import ModulesDao from "./dao";

// Nested in the UI, flat on the server:
//   GET/POST   /api/courses/:courseId/modules
//   PUT/DELETE /api/modules/:moduleId
export default function ModuleRoutes(app, db) {
  const dao = ModulesDao(db);

  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    res.json(dao.findModulesForCourse(courseId));
  };
  const createModuleForCourse = (req, res) => {
    const { courseId } = req.params;
    const module = { ...req.body, course: courseId };
    const newModule = dao.createModule(module);
    res.json(newModule);
  };
  const deleteModule = (req, res) => {
    const { moduleId } = req.params;
    dao.deleteModule(moduleId);
    res.sendStatus(200);
  };
  const updateModule = (req, res) => {
    const { moduleId } = req.params;
    const module = dao.updateModule(moduleId, req.body);
    if (!module) {
      res.status(404).json({ message: `Unable to update Module with ID ${moduleId}` });
      return;
    }
    res.json(module);
  };

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}
