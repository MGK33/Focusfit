import { useState } from "react";

const workouts = {
  Monday: [
    "Incline DB Press",
    "Arnold Press",
    "Cable Chest Fly",
    "Lateral Raises",
    "Rope Triceps Pushdown",
    "Dips (to failure)"
  ],
  Tuesday: [
    "Romanian Deadlifts",
    "Walking Lunges",
    "Hamstring Curls",
    "Pull-Ups",
    "Seated Cable Row"
  ],
  Thursday: [
    "Pull-Ups",
    "Lat Pulldown",
    "Rear Delt Flys",
    "Barbell Curls",
    "Hammer Curls"
  ],
  Friday: [
    "Front Squats",
    "Step-Ups",
    "Glute Bridges",
    "Hanging Leg Raises",
    "Weighted Planks"
  ]
};

export default function App() {
  const [completed, setCompleted] = useState({});

  const toggleExercise = (day, exercise) => {
    const key = `${day}-${exercise}`;
    setCompleted({
      ...completed,
      [key]: !completed[key]
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>
        BUILT DIFFERENT
      </h1>
      {Object.entries(workouts).map(([day, exercises]) => (
        <div key={day} style={{ marginBottom: 30, border: '1px solid #ccc', borderRadius: 10, padding: 20 }}>
          <h2 style={{ fontSize: 20, marginBottom: 10 }}>{day}</h2>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {exercises.map((exercise) => {
              const key = `${day}-${exercise}`;
              return (
                <li key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>{exercise}</span>
                  <button onClick={() => toggleExercise(day, exercise)}>
                    {completed[key] ? "✅ Done" : "Mark Done"}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
