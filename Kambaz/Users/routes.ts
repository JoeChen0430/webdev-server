import UsersDao from "./dao";
import EnrollmentsDao from "../Enrollments/dao";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  // ---------- account (5.4.2 + 5.4.3 sessions) ----------
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  const updateUser = (req, res) => {
    const { userId } = req.params;
    if (!dao.findUserById(userId)) {
      res.status(404).json({ message: `Unable to update User with ID ${userId}` });
      return;
    }
    dao.updateUser(userId, req.body);
    const updatedUser = dao.findUserById(userId);
    // Keep the session in sync only when you edit yourself
    // (a faculty member editing someone else must stay signed in as themselves).
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = updatedUser;
    }
    res.json(updatedUser);
  };

  // ---------- People table (5.4.9, optional) ----------
  const findAllUsers = (req, res) => {
    res.json(dao.findAllUsers());
  };
  const findUserById = (req, res) => {
    const user = dao.findUserById(req.params.userId);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.json(user);
  };
  const createUser = (req, res) => {
    if (req.body.username && dao.findUserByUsername(req.body.username)) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    res.json(dao.createUser(req.body));
  };
  const deleteUser = (req, res) => {
    const { userId } = req.params;
    dao.deleteUser(userId);
    enrollmentsDao.deleteEnrollmentsForUser(userId);
    res.sendStatus(200);
  };

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.get("/api/users", findAllUsers);
  app.post("/api/users", createUser);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
}
