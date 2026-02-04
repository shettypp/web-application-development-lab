// Lab 2
import React, { useState, useEffect } from "react";

/* ---------------- Button Component ---------------- */
function Button({ label, onClick, variant = "primary" }) {
  const styles = {
    primary: {
      backgroundColor: "#111827",
      color: "#ffffff",
    },
    secondary: {
      backgroundColor: "#e5e7eb",
      color: "#111827",
    },
    danger: {
      backgroundColor: "#ef4444",
      color: "#ffffff",
    },
  };

  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        transition: "opacity 0.2s ease",
        ...styles[variant],
      }}
      onMouseOver={(e) => (e.target.style.opacity = 0.85)}
      onMouseOut={(e) => (e.target.style.opacity = 1)}
    >
      {label}
    </button>
  );
}

/* ---------------- Card Wrapper ---------------- */
function Card({ title, subtitle, children }) {
  return (
    <div style={cardStyle}>
      <h2 style={{ marginBottom: "4px" }}>{title}</h2>
      {subtitle && (
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}

/* ---------------- Counter Component ---------------- */
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Card title="Counter">
      <p style={{ fontSize: "32px", margin: "12px 0" }}>{count}</p>
      <div style={{ display: "flex", gap: "8px" }}>
        <Button label="+" onClick={() => setCount(count + 1)} />
        <Button label="−" onClick={() => setCount(count - 1)} />
        <Button
          label="Reset"
          variant="secondary"
          onClick={() => setCount(0)}
        />
      </div>
    </Card>
  );
}

/* ---------------- Task List Component ---------------- */
function TaskList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  return (
    <Card title="Tasks" subtitle={`${tasks.length} active`}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <input
          type="text"
          placeholder="Add a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          style={inputStyle}
        />
        <Button label="Add" onClick={addTask} />
      </div>

      {tasks.length === 0 && (
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          No tasks yet
        </p>
      )}

      <ul style={{ padding: 0 }}>
        {tasks.map((item, index) => (
          <li key={index} style={taskItemStyle}>
            <span>{item}</span>
            <Button
              label="Delete"
              variant="danger"
              onClick={() =>
                setTasks(tasks.filter((_, i) => i !== index))
              }
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---------------- Main App ---------------- */
function App() {
  return (
    <div style={appStyle}>
      <h1 style={{ marginBottom: "24px" }}>Simple Dashboard</h1>
      <Counter />
      <TaskList />
    </div>
  );
}

/* ---------------- Styles ---------------- */
const appStyle = {
  minHeight: "100vh",
  backgroundColor: "#f9fafb",
  padding: "40px",
  fontFamily: "Inter, system-ui, sans-serif",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  maxWidth: "420px",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};

const inputStyle = {
  flex: 1,
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
};

const taskItemStyle = {
  listStyle: "none",
  padding: "10px",
  marginBottom: "8px",
  borderRadius: "6px",
  backgroundColor: "#f3f4f6",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default App;
