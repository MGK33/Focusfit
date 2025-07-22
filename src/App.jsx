// FocusFit v2: Polished UI upgrade with card layout, soft theme, and icons
import { useState } from "react";

const workouts = {
  Monday: ["Incline DB Press", "Arnold Press", "Cable Chest Fly", "Lateral Raises", "Rope Triceps Pushdown", "Dips (to failure)"],
  Tuesday: ["Romanian Deadlifts", "Walking Lunges", "Hamstring Curls", "Pull-Ups", "Seated Cable Row"],
  Thursday: ["Pull-Ups", "Lat Pulldown", "Rear Delt Flys", "Barbell Curls", "Hammer Curls"],
  Friday: ["Front Squats", "Step-Ups", "Glute Bridges", "Hanging Leg Raises", "Weighted Planks"]
};

const daysOfWeek = Object.keys(workouts);

export default function FocusFitApp() {
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("focusfit-completed");
    return saved ? JSON.parse(saved) : {};
  });
  const [tab, setTab] = useState("today");

  const toggleExercise = (day, exercise) => {
    const key = `${day}-${exercise}`;
    setCompleted((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetWeek = () => {
    setCompleted({});
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    padding: 16,
    marginBottom: 12
  };

  const buttonStyle = {
    background: "#66c2a5",
    color: "white",
    border: "none",
    borderRadius: 6,
    padding: "6px 12px",
    cursor: "pointer"
  };

  const renderToday = () => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const todaysWorkout = workouts[today] || [];
    return (
      <div>
        <h2 style={{ marginBottom: 10 }}>{today}'s Workout</h2>
        {todaysWorkout.length === 0 ? <p>Rest or active recovery day</p> : (
          <div>
            {todaysWorkout.map((exercise) => {
              const key = `${today}-${exercise}`;
              return (
                <div key={key} style={cardStyle}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{exercise}</span>
                    <button style={buttonStyle} onClick={() => toggleExercise(today, exercise)}>
                      {completed[key] ? "✅" : "Done"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderPlan = () => (
    <div>
      <h2 style={{ marginBottom: 10 }}>My Weekly Plan</h2>
      {daysOfWeek.map((day) => (
        <div key={day} style={{ marginBottom: 20 }}>
          <h3 style={{ marginBottom: 8 }}>{day}</h3>
          {workouts[day].map((exercise) => {
            const key = `${day}-${exercise}`;
            return (
              <div key={key} style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{exercise}</span>
                  <button style={buttonStyle} onClick={() => toggleExercise(day, exercise)}>
                    {completed[key] ? "✅" : "Done"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <button style={{ ...buttonStyle, marginTop: 10 }} onClick={resetWeek}>🔁 Reset All</button>
    </div>
  );

  const renderLog = () => (
    <div>
      <h2 style={{ marginBottom: 10 }}>Quick Log</h2>
      {["Mood", "Sleep", "Focus"].map((label) => (
        <div key={label} style={{ ...cardStyle, marginBottom: 10 }}>
          <label>{label}:
            <input
              type="text"
              placeholder={`Enter ${label.toLowerCase()} here`}
              style={{ width: "100%", marginTop: 6, padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
            />
          </label>
        </div>
      ))}
    </div>
  );

  const renderBuild = () => (
    <div>
      <h2 style={{ marginBottom: 10 }}>Plan Builder</h2>
      <div style={cardStyle}>
        <p>
          [ADHD-friendly questionnaire coming soon. This will ask about your goals,
          preferred training days, and available equipment. Then build a plan just for you.]
        </p>
      </div>
    </div>
  );

  const navButton = (label, active) => (
    <button
      onClick={() => setTab(label.toLowerCase())}
      style={{
        flex: 1,
        padding: 10,
        fontWeight: tab === label.toLowerCase() ? "bold" : "normal",
        background: tab === label.toLowerCase() ? "#66c2a5" : "#f0f0f0",
        color: tab === label.toLowerCase() ? "white" : "#333",
        border: "none"
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ padding: 20, fontFamily: 'Poppins, sans-serif', maxWidth: 600, margin: '0 auto', background: '#f9fafc', minHeight: '100vh', paddingBottom: 80 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>FocusFit</h1>
      {tab === "today" && renderToday()}
      {tab === "plan" && renderPlan()}
      {tab === "log" && renderLog()}
      {tab === "build" && renderBuild()}

      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#ffffff", display: "flex", borderTop: "1px solid #ccc", zIndex: 10 }}>
        {navButton("Today")}
        {navButton("Plan")}
        {navButton("Log")}
        {navButton("Build")}
      </nav>
    </div>
  );
}
