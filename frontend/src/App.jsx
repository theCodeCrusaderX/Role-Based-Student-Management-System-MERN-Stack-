import { Routes, Route } from "react-router-dom";

//auth
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import CheckAuth from "./components/common/CheckAuth";

//student
import StudentDashboard from "./pages/dashboard/StudentDashboard";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";

// import { Loader2 } from "lucide-react";
import { Triangle } from "react-loader-spinner";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

// //app state ::
// const user = {
//   role : "admin",
//   name : "12"
// }
// const isAuthenticated = true
// const isLoading = false

export default function App() {
  const dispatch = useDispatch();

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  //using useEffect it prevent api to call in infinite loop
  //we put dispatch as dependency arr if it gets changes which
  //is not regularly happen for more complex project

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);
  console.log("isLoading", isLoading);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Triangle
          visible={true}
          height="90"
          width="90"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* auth  */}
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        ></Route>

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/student/dashboard"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <StudentDashboard />
            </CheckAuth>
          }
        ></Route>
        <Route
          path="/admin/dashboard"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminDashboard />
            </CheckAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
}
