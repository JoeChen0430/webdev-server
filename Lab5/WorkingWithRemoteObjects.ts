// 5.2.3 — objects live in process memory: changes last until the server restarts.
const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

// 5.2.3.4 On your own: a module object with string properties
const module = {
  id: "M101",
  name: "Introduction to Node.js",
  description: "Build HTTP servers and RESTful Web APIs with Express",
  course: "CS4550",
};

export default function WorkingWithRemoteObjects(app) {
  // ---------- assignment ----------
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };
  // On your own: score and completed
  const setAssignmentScore = (req, res) => {
    const { newScore } = req.params;
    assignment.score = parseInt(newScore);
    res.json(assignment);
  };
  const setAssignmentCompleted = (req, res) => {
    const { completed } = req.params;
    assignment.completed = completed === "true";
    res.json(assignment);
  };

  // ---------- module (on your own) ----------
  const getModule = (req, res) => {
    res.json(module);
  };
  const getModuleName = (req, res) => {
    res.json(module.name);
  };
  const setModuleName = (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  };
  const getModuleDescription = (req, res) => {
    res.json(module.description);
  };
  const setModuleDescription = (req, res) => {
    const { newDescription } = req.params;
    module.description = newDescription;
    res.json(module);
  };

  app.get("/lab5/assignment", getAssignment);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/score/:newScore", setAssignmentScore);
  app.get("/lab5/assignment/completed/:completed", setAssignmentCompleted);

  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module/name/:newName", setModuleName);
  app.get("/lab5/module/description", getModuleDescription);
  app.get("/lab5/module/description/:newDescription", setModuleDescription);
}
