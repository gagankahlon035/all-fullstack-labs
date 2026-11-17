const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let employees = [
  { id: 1, name: "Alex Johnson", role: "Developer", department: "IT" },
  { id: 2, name: "Taylor Smith", role: "Designer", department: "Design" }
];

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API working" });
});

app.get("/api/employees", (req, res) => {
  res.json(employees);
});

app.post("/api/employees", (req, res) => {
  const { name, role, department } = req.body;

  if (!name || !role || !department) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const employee = {
    id: Date.now(),
    name,
    role,
    department
  };

  employees.push(employee);
  res.status(201).json(employee);
});

app.delete("/api/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find(e => e.id === id);

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  employees = employees.filter(e => e.id !== id);
  res.json({ message: "Employee deleted" });
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
