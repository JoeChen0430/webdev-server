// 5.2.4 + 5.2.6 — CRUD on an in-memory array. Restarting the server resets the seed.
let todos = [
  { id: 1, title: "Task 1", description: "Description 1", completed: false },
  { id: 2, title: "Task 2", description: "Description 2", completed: true },
  { id: 3, title: "Task 3", description: "Description 3", completed: false },
  { id: 4, title: "Task 4", description: "Description 4", completed: true },
];

export default function WorkingWithRemoteArrays(app) {
  // ---------- read ----------
  const getTodos = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      res.json(todos.filter((t) => t.completed === completedBool));
      return;
    }
    res.json(todos);
  };
  const getTodoById = (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  };

  // ---------- create ----------
  // GET version (5.2.4.4) is kept so the earlier hyperlinks still work.
  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      description: "New Description",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  };
  // POST version (5.2.6.1): data comes in the body, respond with only the new todo.
  const postNewTodo = (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  };

  // ---------- delete ----------
  // GET version (5.2.4.5). Guard the -1 index: splice(-1, 1) would remove the LAST todo.
  const removeTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
    }
    res.json(todos);
  };
  // DELETE version (5.2.6.2 + 5.2.6.4 error handling)
  const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  };

  // ---------- update ----------
  // GET versions (5.2.4.6 + 5.2.4.7 on your own) respond with all todos.
  const updateTodoTitle = (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.title = title;
    }
    res.json(todos);
  };
  const updateTodoCompleted = (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.completed = completed === "true";
    }
    res.json(todos);
  };
  const updateTodoDescription = (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.description = description;
    }
    res.json(todos);
  };
  // PUT version (5.2.6.3 + 5.2.6.4 error handling): merge the body into the todo.
  const updateTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todos = todos.map((t) => (t.id === parseInt(id) ? { ...t, ...req.body } : t));
    res.sendStatus(200);
  };

  // Route order matters: /lab5/todos/create must come before /lab5/todos/:id,
  // otherwise "create" is parsed as an :id.
  app.get("/lab5/todos", getTodos);
  app.post("/lab5/todos", postNewTodo);
  app.get("/lab5/todos/create", createNewTodo);
  app.get("/lab5/todos/:id", getTodoById);
  app.delete("/lab5/todos/:id", deleteTodo);
  app.put("/lab5/todos/:id", updateTodo);
  app.get("/lab5/todos/:id/delete", removeTodo);
  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
  app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);
  app.get("/lab5/todos/:id/description/:description", updateTodoDescription);
}
