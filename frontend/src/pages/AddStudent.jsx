import { useState } from "react";
import axios from "axios";

function AddStudent({ darkMode }) {
  const initialStudent = {
    name: "",
    rollNumber: "",
    email: "",
    department: "",
    year: "",
    phone: "",
  };

  const [student, setStudent] = useState(initialStudent);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setStudent({
      ...student,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/students",
        {
          ...student,
          year: Number(student.year),
        }
      );

      alert(response.data.message);

      setStudent(initialStudent);
    } catch (error) {
      console.error("Failed to add student:", error);

      alert(
        error.response?.data?.error ||
          "Failed to add student"
      );
    }
  };

  const clearForm = () => {
    setStudent(initialStudent);
  };

  const inputClass = `w-full px-4 py-3.5 rounded-xl border outline-none transition ${
    darkMode
      ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
  }`;

  const labelClass = `block text-sm font-semibold mb-2 ${
    darkMode ? "text-slate-300" : "text-slate-700"
  }`;

  return (
    <div
      className={`relative overflow-hidden transition-colors duration-300 ${
        darkMode ? "bg-slate-950" : "bg-slate-100"
      }`}
    >
      {/* Background glow */}

      <div
        className={`absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? "bg-blue-600/20" : "bg-blue-200/40"
        }`}
      />

      <div
        className={`absolute top-1/2 -left-40 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? "bg-purple-600/20" : "bg-purple-200/40"
        }`}
      />

      <main className="relative max-w-5xl mx-auto px-6 py-20">

        {/* HEADER */}

        <section className="mb-10">

          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${
              darkMode
                ? "bg-blue-500/10 border border-blue-400/20 text-blue-300"
                : "bg-blue-50 border border-blue-100 text-blue-700"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Student Registration
          </div>

          <h1
            className={`text-4xl md:text-5xl font-bold tracking-tight ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Add Student
          </h1>

          <p
            className={`text-lg mt-3 max-w-2xl ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Add a new student record to the student management
            system.
          </p>

        </section>

        {/* FORM CARD */}

        <section
          className={`rounded-3xl border shadow-xl overflow-hidden ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >

          {/* CARD HEADER */}

          <div
            className={`px-6 md:px-8 py-6 border-b ${
              darkMode
                ? "border-slate-800"
                : "border-slate-200"
            }`}
          >

            <h2
              className={`text-xl font-bold ${
                darkMode
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              Student Information
            </h2>

            <p
              className={`text-sm mt-1 ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Enter the student's details below.
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* NAME */}

              <div>
                <label className={labelClass}>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter student name"
                  value={student.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {/* ROLL NUMBER */}

              <div>
                <label className={labelClass}>
                  Roll Number
                </label>

                <input
                  type="text"
                  name="rollNumber"
                  placeholder="Enter roll number"
                  value={student.rollNumber}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {/* EMAIL */}

              <div>
                <label className={labelClass}>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="student@example.com"
                  value={student.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {/* PHONE */}

              <div>
                <label className={labelClass}>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={student.phone}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {/* DEPARTMENT */}

              <div>
                <label className={labelClass}>
                  Department
                </label>

                <select
                  name="department"
                  value={student.department}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">
                    Select department
                  </option>

                  <option value="Information Technology">
                    Information Technology
                  </option>

                  <option value="Computer Science Engineering">
                    Computer Science Engineering
                  </option>

                  <option value="Electronics and Communication Engineering">
                    Electronics and Communication Engineering
                  </option>

                  <option value="Electrical and Electronics Engineering">
                    Electrical and Electronics Engineering
                  </option>

                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>

                  <option value="Civil Engineering">
                    Civil Engineering
                  </option>
                </select>
              </div>

              {/* YEAR */}

              <div>
                <label className={labelClass}>
                  Year
                </label>

                <select
                  name="year"
                  value={student.year}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">
                    Select year
                  </option>

                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

            </div>

            {/* BUTTONS */}

            <div
              className={`mt-8 pt-6 border-t flex flex-col sm:flex-row sm:justify-end gap-3 ${
                darkMode
                  ? "border-slate-800"
                  : "border-slate-200"
              }`}
            >

              <button
                type="button"
                onClick={clearForm}
                className={`px-6 py-3 rounded-xl font-semibold transition ${
                  darkMode
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                Clear
              </button>

              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                Add Student
              </button>

            </div>

          </form>

        </section>

        {/* INFORMATION CARD */}

        <section
          className={`mt-8 rounded-2xl p-6 border ${
            darkMode
              ? "bg-slate-900/80 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >

          <h3
            className={`font-bold ${
              darkMode
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            Before submitting
          </h3>

          <p
            className={`text-sm mt-2 ${
              darkMode
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >
            Make sure the roll number, email address and phone
            number are correct before adding the student.
          </p>

        </section>

      </main>
    </div>
  );
}

export default AddStudent;