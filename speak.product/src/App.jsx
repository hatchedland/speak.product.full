import { Suspense } from "react";

// 3rd party libraries
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// local components
import Layout from "./layout/Layout";
import CourseDetail from "./pages/CourseDetail";
import NotFound from "./pages/404NotFound";
import Approval from "./pages/Approval";
import AddStudent from "./pages/AddStudent";
import AddCourse from "./pages/AddCourse";
import { StudentProvider } from "./context/StudentContext";
import Success from "./pages/Success";

function App() {
  return (
    <Suspense fallback={<Layout loading={true} />}>
      <StudentProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<CourseDetail />} />
            <Route
              path="enrolled"
              element={
                <Success
                  content={{
                    title: "Consent Form Sent Successfully",
                    description:
                      "The consent form has been sent to your parent/guardian; you will be notified once they respond",
                  }}
                />
              }
            />{" "}
            <Route path="approval/:id" element={<Approval />} />
            <Route
              path="approved"
              element={
                <Success
                  content={{
                    title: "Consent Submitted Successfully",
                    description:
                      "Thank you! Your response has been recorded. we appreciate your time and input. Your child will be notified accordingly.",
                  }}
                />
              }
            />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </StudentProvider>
    </Suspense>
  );
}

export default App;
