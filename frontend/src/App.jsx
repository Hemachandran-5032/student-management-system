import { useState } from "react";
import Home from "./pages/Home";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import Navbar from "./components/Navbar";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={
        darkMode
          ? "min-h-screen pt-16 bg-slate-950 text-white transition-colors duration-300"
          : "min-h-screen pt-16 bg-slate-100 text-slate-900 transition-colors duration-300"
      }
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* HOME */}
      <section id="home">
        <Home darkMode={darkMode} />
      </section>

      {/* STUDENTS */}
      <section id="students" className="scroll-mt-16">
        <Students darkMode={darkMode} />
      </section>

      {/* ADD STUDENT */}
      <section id="add-student" className="scroll-mt-16">
        <AddStudent darkMode={darkMode} />
      </section>

      {/* FOOTER */}
      <footer
  className={
    darkMode
      ? "bg-black text-white py-10 text-center"
      : "bg-slate-900 text-white py-10 text-center"
  }
>
  <h2 className="text-lg font-bold">
    Student Management System
  </h2>

  <p className="text-slate-400 text-sm mt-2">
    Developed by <span className="text-blue-400 font-semibold">Hemachandran B R</span>
  </p>

  <p className="text-slate-500 text-xs mt-3">
    Built with React, Node.js, Express and MongoDB
  </p>
</footer>
    </div>
  );
}

export default App;