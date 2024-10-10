import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import Loading from "./Loading";
import Label from "./Label";
import toast from "react-hot-toast";
import { setUser, setLoading } from "../lib/storeSlice"; // Import actions

const Login = ({ setLogin }) => {
  const [loading, setLoadingState] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoadingState(true);
      dispatch(setLoading(true)); // Set loading state while logging in
      const formData = new FormData(e.target);
      const { email, password } = Object.fromEntries(formData);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Dispatch setUser with user info after successful login
      dispatch(setUser({ uid: user.uid, email: user.email }));

      toast.success("Login successful!");
      navigate('/profile');
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Email or Password not matched";
          break;
        default:
          errorMessage = "An error occurred. Please try again.";
      }
      console.log("Error", error);
      setErrMsg(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false)); // Reset loading state after login attempt
    }
  };

  return (
    <div className="bg-red-800 rounded-lg max-w-3xl mx-auto">
      <form
        onSubmit={handleLogin}
        className="max-w-2xl mx-auto pt-10 px-10 lg:px-0 text-white"
      >
        <div className="border-b border-b-white/40 pb-5">
          <h2 className="text-lg font-semibold uppercase leading-7">
            Login Form
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-200">
            You need to provide required information to login.
          </p>
        </div>
        <div className="border-b border-b-white/10 pb-5">
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Label title="Email address" htmlFor="email" />
              <input
                type="email"
                name="email"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-4 outline-none text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-skyText sm:text-sm sm:leading-6 mt-2"
              />
            </div>
            <div className="sm:col-span-3">
              <Label title="Password" htmlFor="password" />
              <input
                type="password"
                name="password"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-4 outline-none text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-skyText sm:text-sm sm:leading-6 mt-2"
              />
            </div>
          </div>
        </div>
        {errMsg && (
          <p className="bg-white/90 text-red-600 text-center py-1 rounded-md tracking-wide font-semibold">
            {errMsg}
          </p>
        )}
        <button
          type="submit"
          className="mt-5 bg-gray-900 w-full py-2 uppercase text-base font-bold tracking-wide text-gray-300 rounded-md hover:text-white hover:bg-gray-800 duration-200"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <p className="text-sm leading-6 text-gray-200 text-center -mt-2 py-10">
        Don't have an Account?{" "}
        <button
          onClick={() => setLogin(false)}
          className="text-gray-200 font-semibold underline underline-offset-2 decoration-[1px] hover:text-white duration-200"
        >
          Register
        </button>
      </p>
      {loading && <Loading />}
    </div>
  );
};

export default Login;
