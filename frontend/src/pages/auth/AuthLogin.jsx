import Form from "../../components/Form.jsx";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function App() {
  const dispatch = useDispatch();

  function handleLoginUser(data) {
    dispatch(loginUser(data))
      .then((res) => {
        console.log("res :: ", res);

        if (res.meta.requestStatus === "fulfilled") {
          alert("logged in");
        } else {
          alert("error");
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
        alert("error");
      });
  }

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleLoginUser} type="login" />
          <p className="text-sm text-center mt-4">
            don't have an account?{" "}
            <Link to="/auth/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
