// 5.2.2.1 — data encoded in the path, e.g. /lab5/add/2/4
// Results are sent as strings: res.send(6) would be read as a status code.
export default function PathParameters(app) {
  const add = (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  };
  const subtract = (req, res) => {
    const { a, b } = req.params;
    res.send((parseInt(a) - parseInt(b)).toString());
  };
  // On your own: multiply and divide
  const multiply = (req, res) => {
    const { a, b } = req.params;
    res.send((parseInt(a) * parseInt(b)).toString());
  };
  const divide = (req, res) => {
    const { a, b } = req.params;
    res.send((parseInt(a) / parseInt(b)).toString());
  };
  app.get("/lab5/add/:a/:b", add);
  app.get("/lab5/subtract/:a/:b", subtract);
  app.get("/lab5/multiply/:a/:b", multiply);
  app.get("/lab5/divide/:a/:b", divide);
}
