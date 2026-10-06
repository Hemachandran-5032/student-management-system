import { useEffect, useState } from "react";

function Navbar({ darkMode, setDarkMode }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
        setMenuOpen(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 shadow-lg transition-all duration-300 ${
        showNavbar
          ? "translate-y-0"
          : "-translate-y-full"
      } ${
        darkMode
          ? "bg-slate-950 text-white border-b border-slate-800"
          : "bg-white text-slate-900 border-b border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* TOP NAVBAR */}

        <div className="h-16 flex items-center justify-between">

          {/* LOGO / NAME */}

          <button
            onClick={() => scrollToSection("home")}
            className="text-lg sm:text-xl font-bold tracking-wide"
          >
            Student Management
          </button>

          {/* DESKTOP MENU */}

          <div className="hidden md:flex items-center gap-2">

            <button
              onClick={() => scrollToSection("home")}
              className={`px-4 py-2 rounded-lg transition ${
                darkMode
                  ? "hover:bg-slate-800"
                  : "hover:bg-slate-100"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("students")}
              className={`px-4 py-2 rounded-lg transition ${
                darkMode
                  ? "hover:bg-slate-800"
                  : "hover:bg-slate-100"
              }`}
            >
              Students
            </button>

            <button
              onClick={() => scrollToSection("add-student")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
            >
              + Add Student
            </button>

            {/* THEME */}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition ${
                darkMode
                  ? "bg-slate-800 hover:bg-slate-700"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
              title={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {darkMode ? "☀" : "☾"}
            </button>

          </div>

          {/* MOBILE BUTTONS */}

          <div className="flex md:hidden items-center gap-2">

            {/* THEME BUTTON */}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition ${
                darkMode
                  ? "bg-slate-800 hover:bg-slate-700"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? "☀" : "☾"}
            </button>

            {/* MENU BUTTON */}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition ${
                darkMode
                  ? "bg-slate-800 hover:bg-slate-700"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </svg>
              )}
            </button>

          </div>

        </div>

        {/* MOBILE MENU */}

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen
              ? "max-h-96 opacity-100 pb-4"
              : "max-h-0 opacity-0"
          }`}
        >

          <div
            className={`pt-2 space-y-2 border-t ${
              darkMode
                ? "border-slate-800"
                : "border-slate-200"
            }`}
          >

            {/* HOME */}

            <button
              onClick={() => scrollToSection("home")}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition ${
                darkMode
                  ? "hover:bg-slate-800"
                  : "hover:bg-slate-100"
              }`}
            >
              Home
            </button>

            {/* STUDENTS */}

            <button
              onClick={() => scrollToSection("students")}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition ${
                darkMode
                  ? "hover:bg-slate-800"
                  : "hover:bg-slate-100"
              }`}
            >
              Students
            </button>

            {/* ADD STUDENT */}

            <button
              onClick={() => scrollToSection("add-student")}
              className="w-full text-left px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              + Add Student
            </button>

          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;