// 5.2.2.2 — data encoded in the query string,
// e.g. /lab5/calculator?operation=add&a=2&b=4
export default function QueryParameters(app) {
  const calculator = (req, res) => {
    const { a, b, operation } = req.query;
    let result: number | string = 0;
    switch (operation) {
      case "add":
        result = parseInt(a) + parseInt(b);
        break;
      case "subtract":
        result = parseInt(a) - parseInt(b);
        break;
      // On your own: multiply and divide
      case "multiply":
        result = parseInt(a) * parseInt(b);
        break;
      case "divide":
        result = parseInt(a) / parseInt(b);
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  };
  app.get("/lab5/calculator", calculator);
}
