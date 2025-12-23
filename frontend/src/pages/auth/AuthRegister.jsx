// import { useForm } from "react-hook-form";
import Form from "../../components/Form.jsx";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
// import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSnackbar } from 'notistack';

export default function App() {
  // const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // const { toast } = useToast();

  function handleRegisterUser(data) {
    console.log(data);
    
    dispatch(registerUser(data))
      .then((res) => {
        console.log(res);

        if (res?.payload?.success) {

          enqueueSnackbar("User registered successfully", { variant: 'success' });
          navigate("/auth/login");
        } else {
          enqueueSnackbar("Registration failed", { variant: 'error' });
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err);
        enqueueSnackbar("An error occurred during registration", { variant: 'error' });
      });
  }


  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleRegisterUser} />
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
