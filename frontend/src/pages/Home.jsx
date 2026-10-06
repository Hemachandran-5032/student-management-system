import { useEffect, useState } from "react";
import axios from "axios";

function Home({ darkMode }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/students"
      );

      setStudents(response.data);
    } catch (error) {
      console.error("Failed to get students:", error);
    }
  };

  const goToStudents = () => {
    const element = document.getElementById("students");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const goToAddStudent = () => {
    const element = document.getElementById("add-student");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const totalStudents = students.length;

  const totalIT = students.filter(
    (student) =>
      student.department?.toLowerCase() ===
      "information technology"
  ).length;

  const totalYear4 = students.filter(
    (student) => Number(student.year) === 4
  ).length;

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${
        darkMode ? "bg-slate-950" : "bg-slate-100"
      }`}
    >
      {/* Background glow */}

      <div
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? "bg-blue-600/20" : "bg-blue-200/40"
        }`}
      />

      <div
        className={`absolute top-1/3 -right-40 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? "bg-purple-600/20" : "bg-purple-200/40"
        }`}
      />

      <div
        className={`absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl ${
          darkMode ? "bg-cyan-500/10" : "bg-cyan-200/30"
        }`}
      />

      <main className="relative max-w-7xl mx-auto px-6 py-20">

        {/* HERO */}

        <section className="min-h-[70vh] flex items-center">

          <div className="w-full">

            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 ${
                darkMode
                  ? "bg-blue-500/10 border border-blue-400/20 text-blue-300"
                  : "bg-blue-50 border border-blue-100 text-blue-700"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Student Management System
            </div>

            <div className="max-w-4xl">

              <h1
                className={`text-5xl md:text-7xl font-bold tracking-tight leading-tight ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Manage your students.
                <span className="block text-blue-500">
                  Simple. Fast. Organized.
                </span>
              </h1>

              <p
                className={`text-lg md:text-xl mt-6 max-w-2xl leading-relaxed ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                A modern student management system to add,
                view, search, edit and manage student records
                from one place.
              </p>

              {/* HERO BUTTONS */}

              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                  onClick={goToStudents}
                  className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  View Students
                </button>

                <button
                  onClick={goToAddStudent}
                  className={`px-7 py-3.5 rounded-xl font-semibold border transition-all duration-300 hover:-translate-y-0.5 ${
                    darkMode
                      ? "bg-slate-900 border-slate-700 text-white hover:bg-slate-800"
                      : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Add Student
                </button>

              </div>

            </div>

          </div>

        </section>

        {/* STATISTICS */}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* TOTAL */}

          <div
            className={`rounded-2xl p-6 border shadow-xl transition-all duration-300 hover:-translate-y-1 ${
              darkMode
                ? "bg-slate-900 border-slate-800 hover:border-blue-500/40"
                : "bg-white border-slate-200 hover:border-blue-300"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Total Students
            </p>

            <h2
              className={`text-4xl font-bold mt-3 ${
                darkMode
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              {totalStudents}
            </h2>

            <p className="text-sm text-blue-500 mt-2">
              Registered students
            </p>
          </div>

          {/* IT */}

          <div
            className={`rounded-2xl p-6 border shadow-xl transition-all duration-300 hover:-translate-y-1 ${
              darkMode
                ? "bg-slate-900 border-slate-800 hover:border-blue-500/40"
                : "bg-white border-slate-200 hover:border-blue-300"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              IT Students
            </p>

            <h2 className="text-4xl font-bold text-blue-500 mt-3">
              {totalIT}
            </h2>

            <p className="text-sm text-blue-500 mt-2">
              Information Technology
            </p>
          </div>

          {/* YEAR 4 */}

          <div
            className={`rounded-2xl p-6 border shadow-xl transition-all duration-300 hover:-translate-y-1 ${
              darkMode
                ? "bg-slate-900 border-slate-800 hover:border-purple-500/40"
                : "bg-white border-slate-200 hover:border-purple-300"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              4th Year Students
            </p>

            <h2 className="text-4xl font-bold text-purple-500 mt-3">
              {totalYear4}
            </h2>

            <p className="text-sm text-purple-500 mt-2">
              Final year students
            </p>
          </div>

        </section>

        {/* RECENT STUDENTS */}

        <section
          className={`mt-10 rounded-3xl border shadow-xl overflow-hidden ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >

          <div
            className={`px-6 md:px-8 py-6 border-b ${
              darkMode
                ? "border-slate-800"
                : "border-slate-200"
            }`}
          >

            <div className="flex items-center justify-between">

              <div>

                <h2
                  className={`text-xl md:text-2xl font-bold ${
                    darkMode
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  Recent Students
                </h2>

                <p
                  className={`text-sm mt-1 ${
                    darkMode
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                >
                  Recently added student records
                </p>

              </div>

              <button
                onClick={goToStudents}
                className="text-blue-500 hover:text-blue-600 font-semibold text-sm transition"
              >
                View all
              </button>

            </div>

          </div>

          {students.length === 0 ? (

            <div className="p-12 text-center">

              <div
                className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5 ${
                  darkMode
                    ? "bg-slate-800"
                    : "bg-slate-100"
                }`}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className={
                    darkMode
                      ? "text-slate-400"
                      : "text-slate-500"
                  }
                >
                  <circle cx="9" cy="7" r="4" />
                  <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
                  <path d="M16 3.5a4 4 0 0 1 0 7.5" />
                  <path d="M19 15a4 4 0 0 1 3 4v2" />
                </svg>
              </div>

              <h3
                className={`text-lg font-bold ${
                  darkMode
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                No students available
              </h3>

              <p
                className={`text-sm mt-2 ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Add your first student to get started.
              </p>

            </div>

          ) : (

            <div
              className={`divide-y ${
                darkMode
                  ? "divide-slate-800"
                  : "divide-slate-100"
              }`}
            >

              {students
                .slice(-5)
                .reverse()
                .map((student) => (

                  <div
                    key={student._id}
                    className={`px-6 md:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition ${
                      darkMode
                        ? "hover:bg-slate-800"
                        : "hover:bg-slate-50"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                        {student.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>

                        <h3
                          className={`font-semibold ${
                            darkMode
                              ? "text-white"
                              : "text-slate-900"
                          }`}
                        >
                          {student.name}
                        </h3>

                        <p
                          className={`text-sm mt-1 ${
                            darkMode
                              ? "text-slate-400"
                              : "text-slate-500"
                          }`}
                        >
                          {student.rollNumber}
                        </p>

                      </div>

                    </div>

                    <div
                      className={`text-sm ${
                        darkMode
                          ? "text-slate-300"
                          : "text-slate-600"
                      }`}
                    >
                      {student.department}
                    </div>

                    <div className="text-sm font-semibold text-blue-500">
                      Year {student.year}
                    </div>

                  </div>

                ))}

            </div>

          )}

        </section>

        {/* QUICK ACCESS */}

        <section className="mt-10">

          <div
            className={`relative overflow-hidden rounded-3xl p-8 md:p-10 border ${
              darkMode
                ? "bg-gradient-to-r from-blue-950 via-slate-900 to-purple-950 border-blue-900/50"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-500"
            }`}
          >

            <div className="relative z-10">

              <p
                className={`text-sm font-semibold ${
                  darkMode
                    ? "text-blue-400"
                    : "text-blue-100"
                }`}
              >
                QUICK ACCESS
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
                Manage your students easily
              </h2>

              <p className="text-slate-300 mt-3 max-w-xl">
                Add new records, search existing students and
                update information whenever you need.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">

                <button
                  onClick={goToStudents}
                  className="px-5 py-3 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-semibold transition"
                >
                  View Students
                </button>

                <button
                  onClick={goToAddStudent}
                  className="px-5 py-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-white border border-white/20 font-semibold transition"
                >
                  Add Student
                </button>

              </div>

            </div>

            <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-purple-500/20 blur-3xl" />

          </div>

        </section>

      </main>
    </div>
  );
}

export default Home;