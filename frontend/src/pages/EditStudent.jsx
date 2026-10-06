import { useEffect, useState } from "react";
import axios from "axios";

function EditStudent({ studentId, setCurrentPage }) {
  const [student, setStudent] = useState({
    name: "",
    rollNumber: "",
    email: "",
    department: "",
    year: "",
    phone: "",
  });

  useEffect(() => {
    getStudent();
  }, []);

  // Get student details
  const getStudent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/students/${studentId}`
      );

      setStudent(response.data);
    } catch (error) {
      console.error("Failed to get student:", error);
    }
  };

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setStudent({
      ...student,
      [name]: value,
    });
  };

  // Update student
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/students/${studentId}`,
        {
          ...student,
          year: Number(student.year),
        }
      );

      alert("Student updated successfully");

      setCurrentPage("students");
    } catch (error) {
      console.error("Failed to update student:", error);

      alert(
        error.response?.data?.error ||
          "Failed to update student"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <main className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <p className="text-blue-600 font-semibold text-sm">
            STUDENT MANAGEMENT
          </p>

          <h1 className="text-4xl font-bold text-slate-900 mt-1">
            Edit Student
          </h1>

          <p className="text-slate-500 mt-2">
            Update the student's information.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">

          <form onSubmit={handleSubmit}>

            {/* Name + Roll Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Student Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Roll Number
                </label>

                <input
                  type="text"
                  name="rollNumber"
                  value={student.rollNumber}
                  onChange={handleChange}
                  placeholder="Enter roll number"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={student.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={student.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

            </div>

            {/* Department + Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Department
                </label>

                <select
                  name="department"
                  value={student.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">
                    Select department
                  </option>

                  <option value="Information Technology">
                    Information Technology
                  </option>

                  <option value="Computer Science">
                    Computer Science
                  </option>

                  <option value="Electronics and Communication">
                    Electronics and Communication
                  </option>

                  <option value="Electrical and Electronics">
                    Electrical and Electronics
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
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Year
                </label>

                <select
                  name="year"
                  value={student.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">
                    Select year
                  </option>

                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="5">5th Year</option>
                </select>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">

              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition shadow-sm"
              >
                Update Student
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage("students")}
                className="sm:w-32 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold transition"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </main>
    </div>
  );
}

export default EditStudent;