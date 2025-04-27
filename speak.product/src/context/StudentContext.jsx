import { createContext, useContext, useState, useEffect } from "react";
import studentService from "../services/student.service";

const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const studentId = 2;
        const data = await studentService.getStudentById(studentId);
        setStudent(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  return (
    <StudentContext.Provider
      value={{
        student,
        loading,
        error,
      }}
    >
        {children}
    </StudentContext.Provider>
  );
};

const useStudent = () => {
  const context = useContext(StudentContext);

  if (context === undefined) {
    throw new Error("useStudent must be used within StudentProvider");
  }
  return context;
};

export { StudentProvider, useStudent };
