import { useEffect, useState } from "react";
import axios from "axios";

function Students({ darkMode }) {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);

  const [editingStudent, setEditingStudent] = useState({
    id: "",
    name: "",
    rollNumber: "",
    email: "",
    department: "",
    year: "",
    phone: "",
  });

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

  const goToAddStudent = () => {
    const element = document.getElementById("add-student");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/students/${id}`
      );

      alert(response.data.message);
      getStudents();
    } catch (error) {
      console.error("Failed to delete student:", error);
      alert("Failed to delete student");
    }
  };

  const openEditModal = (student) => {
    setEditingStudent({
      id: student._id,
      name: student.name || "",
      rollNumber: student.rollNumber || "",
      email: student.email || "",
      department: student.department || "",
      year: student.year || "",
      phone: student.phone || "",
    });

    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);

    setEditingStudent({
      id: "",
      name: "",
      rollNumber: "",
      email: "",
      department: "",
      year: "",
      phone: "",
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditingStudent({
      ...editingStudent,
      [name]: value,
    });
  };

  const updateStudent = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/students/${editingStudent.id}`,
        {
          name: editingStudent.name,
          rollNumber: editingStudent.rollNumber,
          email: editingStudent.email,
          department: editingStudent.department,
          year: Number(editingStudent.year),
          phone: editingStudent.phone,
        }
      );

      alert(response.data.message);

      closeEditModal();
      getStudents();
    } catch (error) {
      console.error("Failed to update student:", error);

      alert(
        error.response?.data?.error ||
          "Failed to update student"
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

  const inputClass = `w-full px-4 py-3 rounded-xl border outline-none transition ${
    darkMode
      ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
  }`;

  const labelClass = `block text-sm font-semibold mb-2 ${
    darkMode ? "text-slate-300" : "text-slate-700"
  }`;

  return (
    <>
      {/* STUDENTS */}

      <div
        className={`relative overflow-hidden transition-colors duration-300 ${
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

        <main className="relative max-w-7xl mx-auto px-6 py-20">

          {/* HEADER */}

          <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">

            <div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  darkMode
                    ? "bg-blue-500/10 border border-blue-400/20 text-blue-300"
                    : "bg-blue-50 border border-blue-100 text-blue-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Student Records
              </div>

              <h1
                className={`text-4xl md:text-5xl font-bold tracking-tight ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Students
              </h1>

              <p
                className={`text-lg mt-3 max-w-xl ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Manage student records, search information,
                edit details and maintain your database.
              </p>
            </div>

            <button
              onClick={goToAddStudent}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              + Add Student
            </button>

          </section>

          {/* TABLE CARD */}

          <section
            className={`rounded-3xl shadow-xl border overflow-hidden ${
              darkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >

            {/* SEARCH */}

            <div
              className={`p-6 md:p-7 border-b ${
                darkMode
                  ? "border-slate-800"
                  : "border-slate-200"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>
                  <h2
                    className={`text-xl font-bold ${
                      darkMode
                        ? "text-white"
                        : "text-slate-900"
                    }`}
                  >
                    All Students
                  </h2>

                  <p
                    className={`text-sm mt-1 ${
                      darkMode
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    {filteredStudents.length} student
                    {filteredStudents.length !== 1 ? "s" : ""}{" "}
                    found
                  </p>
                </div>

                <div className="relative w-full md:w-96">

                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-slate-400"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-4-4" />
                    </svg>
                  </div>

                  <input
                    type="text"
                    placeholder="Search students..."
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl outline-none border transition ${
                      darkMode
                        ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    }`}
                  />

                </div>

              </div>
            </div>

            {/* NO STUDENTS */}

            {filteredStudents.length === 0 ? (
              <div className="py-20 px-6 text-center">

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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>

                <h3
                  className={`text-xl font-bold ${
                    darkMode
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  No students found
                </h3>

                <p
                  className={`mt-2 ${
                    darkMode
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                >
                  Try a different search or add a new student.
                </p>

                <button
                  onClick={goToAddStudent}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
                >
                  + Add Student
                </button>

              </div>
            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1000px]">

                  <thead
                    className={
                      darkMode
                        ? "bg-slate-800"
                        : "bg-slate-50"
                    }
                  >
                    <tr>

                      {[
                        "Student",
                        "Roll Number",
                        "Department",
                        "Year",
                        "Phone",
                        "Action",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className={`text-left px-6 py-4 text-xs font-bold uppercase tracking-wider ${
                            darkMode
                              ? "text-slate-400"
                              : "text-slate-500"
                          }`}
                        >
                          {heading}
                        </th>
                      ))}

                    </tr>
                  </thead>

                  <tbody
                    className={
                      darkMode
                        ? "divide-y divide-slate-800"
                        : "divide-y divide-slate-100"
                    }
                  >

                    {filteredStudents.map((student) => (

                      <tr
                        key={student._id}
                        className={`transition duration-200 ${
                          darkMode
                            ? "hover:bg-slate-800"
                            : "hover:bg-blue-50/40"
                        }`}
                      >

                        {/* STUDENT */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                              {student.name
                                ?.charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>

                              <p
                                className={`font-bold ${
                                  darkMode
                                    ? "text-white"
                                    : "text-slate-900"
                                }`}
                              >
                                {student.name}
                              </p>

                              <p
                                className={`text-sm mt-0.5 ${
                                  darkMode
                                    ? "text-slate-400"
                                    : "text-slate-500"
                                }`}
                              >
                                {student.email}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* ROLL */}

                        <td className="px-6 py-5">

                          <span
                            className={`font-mono text-sm px-3 py-1.5 rounded-lg ${
                              darkMode
                                ? "bg-slate-800 text-slate-300"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {student.rollNumber}
                          </span>

                        </td>

                        {/* DEPARTMENT */}

                        <td className="px-6 py-5">

                          <span className="inline-flex px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                            {student.department}
                          </span>

                        </td>

                        {/* YEAR */}

                        <td
                          className={`px-6 py-5 text-sm font-semibold ${
                            darkMode
                              ? "text-slate-300"
                              : "text-slate-700"
                          }`}
                        >
                          Year {student.year}
                        </td>

                        {/* PHONE */}

                        <td
                          className={`px-6 py-5 text-sm ${
                            darkMode
                              ? "text-slate-400"
                              : "text-slate-600"
                          }`}
                        >
                          {student.phone}
                        </td>

                        {/* ACTION */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2">

                            <button
                              onClick={() =>
                                openEditModal(student)
                              }
                              className="px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-semibold transition"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                deleteStudent(student._id)
                              }
                              className="px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold transition"
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

          </section>

          {/* BOTTOM CARD */}

          <section className="mt-8">

            <div
              className={`rounded-2xl p-6 md:p-8 shadow-xl ${
                darkMode
                  ? "bg-gradient-to-r from-blue-700 to-indigo-800"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600"
              }`}
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>

                  <p className="text-blue-100 text-sm font-semibold">
                    READY TO ADD?
                  </p>

                  <h2 className="text-2xl font-bold text-white mt-1">
                    Add a new student record
                  </h2>

                  <p className="text-blue-100 mt-1">
                    Continue to the student registration form.
                  </p>

                </div>

                <button
                  onClick={goToAddStudent}
                  className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold transition"
                >
                  Add Student →
                </button>

              </div>

            </div>

          </section>

        </main>

      </div>

      {/* EDIT MODAL */}

      {showEditModal && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          {/* BACKDROP */}

          <div
            onClick={closeEditModal}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* MODAL */}

          <div
            className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${
              darkMode
                ? "bg-slate-900 border border-slate-800"
                : "bg-white border border-slate-200"
            }`}
          >

            {/* MODAL HEADER */}

            <div
              className={`sticky top-0 z-10 px-6 md:px-8 py-5 border-b ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2
                    className={`text-xl font-bold ${
                      darkMode
                        ? "text-white"
                        : "text-slate-900"
                    }`}
                  >
                    Edit Student
                  </h2>

                  <p
                    className={`text-sm mt-1 ${
                      darkMode
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    Update the student's information.
                  </p>

                </div>

                <button
                  onClick={closeEditModal}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-2xl transition ${
                    darkMode
                      ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  ×
                </button>

              </div>

            </div>

            {/* FORM */}

            <form
              onSubmit={updateStudent}
              className="p-6 md:p-8"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className={labelClass}>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={editingStudent.name}
                    onChange={handleEditChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Roll Number
                  </label>

                  <input
                    type="text"
                    name="rollNumber"
                    value={editingStudent.rollNumber}
                    onChange={handleEditChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={editingStudent.email}
                    onChange={handleEditChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={editingStudent.phone}
                    onChange={handleEditChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Department
                  </label>

                  <select
                    name="department"
                    value={editingStudent.department}
                    onChange={handleEditChange}
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

                <div>
                  <label className={labelClass}>
                    Year
                  </label>

                  <select
                    name="year"
                    value={editingStudent.year}
                    onChange={handleEditChange}
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
                  onClick={closeEditModal}
                  className={`px-6 py-3 rounded-xl font-semibold transition ${
                    darkMode
                      ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20 transition"
                >
                  Update Student
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </>
  );
}

export default Students;