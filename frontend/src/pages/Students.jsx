import { useEffect, useState } from "react";
import api from "../api";

function Students({ darkMode }) {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStudents = async () => {
    try {
      setLoading(true);

      const response = await api.get("/students");

      setStudents(response.data);
    } catch (error) {
      console.error("Failed to get students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/students/${id}`);

      setStudents((currentStudents) =>
        currentStudents.filter((student) => student._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete student:", error);
      alert("Failed to delete student.");
    }
  };

  const updateStudent = async (event) => {
    event.preventDefault();

    try {
      await api.put(`/students/${editingStudent._id}`, {
        name: editingStudent.name,
        rollNumber: editingStudent.rollNumber,
        email: editingStudent.email,
        department: editingStudent.department,
        year: Number(editingStudent.year),
        phone: editingStudent.phone,
      });

      setEditingStudent(null);

      await getStudents();
    } catch (error) {
      console.error("Failed to update student:", error);

      alert(
        error.response?.data?.error ||
          "Failed to update student."
      );
    }
  };

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    return (
      student.name?.toLowerCase().includes(searchText) ||
      student.rollNumber?.toLowerCase().includes(searchText) ||
      student.email?.toLowerCase().includes(searchText) ||
      student.department?.toLowerCase().includes(searchText)
    );
  });

  const goToAddStudent = () => {
    const element = document.getElementById("add-student");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className={`min-h-screen py-20 transition-colors duration-300 ${
        darkMode ? "bg-slate-950" : "bg-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">

          <div>
            <p className="text-blue-500 font-semibold text-sm tracking-wide">
              STUDENT RECORDS
            </p>

            <h2
              className={`text-4xl md:text-5xl font-bold mt-2 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Students
            </h2>

            <p
              className={`mt-3 max-w-xl ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              View, search, edit and manage all student records.
            </p>
          </div>

          <button
            onClick={goToAddStudent}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            + Add Student
          </button>

        </div>

        {/* SEARCH */}

        <div
          className={`rounded-2xl border p-5 mb-6 ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="relative">

            <svg
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                darkMode
                  ? "text-slate-500"
                  : "text-slate-400"
              }`}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>

            <input
              type="text"
              placeholder="Search by name, roll number, email or department..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition ${
                darkMode
                  ? "bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
                  : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500"
              }`}
            />

          </div>
        </div>

        {/* STUDENT TABLE */}

        <div
          className={`rounded-3xl border shadow-xl overflow-hidden ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >

          <div
            className={`px-6 py-5 border-b flex items-center justify-between ${
              darkMode
                ? "border-slate-800"
                : "border-slate-200"
            }`}
          >
            <div>
              <h3
                className={`text-xl font-bold ${
                  darkMode
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                All Students
              </h3>

              <p
                className={`text-sm mt-1 ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                {filteredStudents.length} student
                {filteredStudents.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">

              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

              <p
                className={`mt-4 ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Loading students...
              </p>

            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="p-12 text-center">

              <div
                className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
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
                className={`text-lg font-bold mt-5 ${
                  darkMode
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                No students found
              </h3>

              <p
                className={`mt-2 text-sm ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Try another search or add a new student.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead>
                  <tr
                    className={
                      darkMode
                        ? "bg-slate-950"
                        : "bg-slate-50"
                    }
                  >

                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Student
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Roll Number
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Department
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                      Year
                    </th>

                    <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody
                  className={`divide-y ${
                    darkMode
                      ? "divide-slate-800"
                      : "divide-slate-100"
                  }`}
                >

                  {filteredStudents.map((student) => (
                    <tr
                      key={student._id}
                      className={`transition ${
                        darkMode
                          ? "hover:bg-slate-800/60"
                          : "hover:bg-slate-50"
                      }`}
                    >

                      {/* STUDENT */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                            {student.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p
                              className={`font-semibold ${
                                darkMode
                                  ? "text-white"
                                  : "text-slate-900"
                              }`}
                            >
                              {student.name}
                            </p>

                            <p
                              className={`text-sm mt-1 ${
                                darkMode
                                  ? "text-slate-400"
                                  : "text-slate-500"
                              }`}
                            >
                              {student.phone}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* ROLL */}

                      <td
                        className={`px-6 py-5 text-sm ${
                          darkMode
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      >
                        {student.rollNumber}
                      </td>

                      {/* EMAIL */}

                      <td
                        className={`px-6 py-5 text-sm ${
                          darkMode
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      >
                        {student.email}
                      </td>

                      {/* DEPARTMENT */}

                      <td
                        className={`px-6 py-5 text-sm ${
                          darkMode
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      >
                        {student.department}
                      </td>

                      {/* YEAR */}

                      <td className="px-6 py-5 whitespace-nowrap">

                        <span className="inline-flex whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500">
                          Year {student.year}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-5">

                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() =>
                              setEditingStudent({
                                ...student,
                              })
                            }
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                              darkMode
                                ? "bg-slate-800 text-blue-400 hover:bg-slate-700"
                                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                            }`}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              deleteStudent(student._id)
                            }
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                              darkMode
                                ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                                : "bg-red-50 text-red-600 hover:bg-red-100"
                            }`}
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>
      </div>

      {/* EDIT MODAL */}

      {editingStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">

          <div
            className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${
              darkMode
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-900"
            }`}
          >

            {/* MODAL HEADER */}

            <div
              className={`px-6 py-5 border-b flex items-center justify-between ${
                darkMode
                  ? "border-slate-800"
                  : "border-slate-200"
              }`}
            >

              <div>

                <h2 className="text-xl font-bold">
                  Edit Student
                </h2>

                <p
                  className={`text-sm mt-1 ${
                    darkMode
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                >
                  Update student information
                </p>

              </div>

              <button
                onClick={() => setEditingStudent(null)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-xl transition ${
                  darkMode
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={updateStudent}
              className="p-6 space-y-5"
            >

              {/* NAME */}

              <div>

                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={editingStudent.name}
                  onChange={(event) =>
                    setEditingStudent({
                      ...editingStudent,
                      name: event.target.value,
                    })
                  }
                  required
                  className={`w-full px-4 py-3 rounded-xl border outline-none ${
                    darkMode
                      ? "bg-slate-950 border-slate-700 text-white focus:border-blue-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500"
                  }`}
                />

              </div>

              {/* ROLL + YEAR */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Roll Number
                  </label>

                  <input
                    type="text"
                    value={editingStudent.rollNumber}
                    onChange={(event) =>
                      setEditingStudent({
                        ...editingStudent,
                        rollNumber: event.target.value,
                      })
                    }
                    required
                    className={`w-full px-4 py-3 rounded-xl border outline-none ${
                      darkMode
                        ? "bg-slate-950 border-slate-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500"
                    }`}
                  />

                </div>

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Year
                  </label>

                  <select
                    value={editingStudent.year}
                    onChange={(event) =>
                      setEditingStudent({
                        ...editingStudent,
                        year: event.target.value,
                      })
                    }
                    required
                    className={`w-full px-4 py-3 rounded-xl border outline-none ${
                      darkMode
                        ? "bg-slate-950 border-slate-700 text-white focus:border-blue-500"
                        : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500"
                    }`}
                  >
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>

                </div>

              </div>

              {/* EMAIL */}

              <div>

                <label className="block text-sm font-semibold mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={editingStudent.email}
                  onChange={(event) =>
                    setEditingStudent({
                      ...editingStudent,
                      email: event.target.value,
                    })
                  }
                  required
                  className={`w-full px-4 py-3 rounded-xl border outline-none ${
                    darkMode
                      ? "bg-slate-950 border-slate-700 text-white focus:border-blue-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500"
                  }`}
                />

              </div>

              {/* PHONE */}

              <div>

                <label className="block text-sm font-semibold mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={editingStudent.phone}
                  onChange={(event) =>
                    setEditingStudent({
                      ...editingStudent,
                      phone: event.target.value,
                    })
                  }
                  required
                  className={`w-full px-4 py-3 rounded-xl border outline-none ${
                    darkMode
                      ? "bg-slate-950 border-slate-700 text-white focus:border-blue-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500"
                  }`}
                />

              </div>

              {/* DEPARTMENT */}

              <div>

                <label className="block text-sm font-semibold mb-2">
                  Department
                </label>

                <select
                  value={editingStudent.department}
                  onChange={(event) =>
                    setEditingStudent({
                      ...editingStudent,
                      department: event.target.value,
                    })
                  }
                  required
                  className={`w-full px-4 py-3 rounded-xl border outline-none ${
                    darkMode
                      ? "bg-slate-950 border-slate-700 text-white focus:border-blue-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500"
                  }`}
                >

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

              {/* BUTTONS */}

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className={`px-5 py-3 rounded-xl font-semibold transition ${
                    darkMode
                      ? "bg-slate-800 hover:bg-slate-700 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </section>
  );
}

export default Students;