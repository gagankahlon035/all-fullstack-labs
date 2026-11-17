
import { useEffect, useState } from "react";
import "./App.css";

type Employee = {
  id: number;
  name: string;
  role: string;
  department: string;
};

const API = "http://localhost:5000/api/employees";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  async function loadEmployees() {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error("Cannot load employees");
      setEmployees(await response.json());
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    void loadEmployees();
  }, []);

  async function addEmployee(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role, department }),
    });

    if (response.ok) {
      setName("");
      setRole("");
      setDepartment("");
      await loadEmployees();
    }
  }

  async function deleteEmployee(id: number) {
    const response = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) await loadEmployees();
  }

  return (
    <main className="container">
      <h1>Employee Directory</h1>
      <p>Manage employees and their departments</p>

      <form onSubmit={addEmployee}>
        <h2>Add New Employee</h2>

        <input
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Job Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />

        <button type="submit">Add Employee</button>
      </form>

      <h2>Employee List ({employees.length})</h2>

      {employees.map((employee) => (
        <div className="employee-card" key={employee.id}>
          <h3>{employee.name}</h3>
          <p>{employee.role} — {employee.department}</p>
          <button
            className="delete"
            onClick={() => deleteEmployee(employee.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}

export default App;
