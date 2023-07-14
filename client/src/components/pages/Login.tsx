import { Link, useNavigate } from "react-router-dom";
import Navigation from "../UI/Navigation";
import assets from "../assets";
import { FaArrowRight, FaGoogle } from "react-icons/fa";
import Input from "../UI/Input";
import { FC, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { ILogin } from "../../interfaces/interface";
import { loginUser } from "../../Api/User";

const Login: FC = () => {
  const validationSchema = yup.object({
    username: yup.string().required("Field Required"),
    password: yup.string().required("Field Required"),
  });
  const initialData: ILogin = {
    username: "",
    password: "",
  };
  const [uploading, setUploading] = useState(false);

  // const userData: IUserDocument | undefined = UserDetails();
  const onSumitHandler = async (values: ILogin) => {
    setUploading(true);
    try {
      loginUser(values);
      navigate("/");
      // userData?.setUser && userData.setUser(user);
    } catch (error) {
      console.log(error);
    }
    setUploading(false);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []);
  return (
    <>
      <Navigation />
      <div className="flex md:w-[80%] m-3 md:mx-auto my-20 gap-8 shadow-md bg-white p-5 rounded-sm">
        <div className="flex flex-col gap-6 w-full md:w-[50%]">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl">Log In</h1>
            <h3 className="text-md">
              <span className="text-tertiary_white">
                Don't Have an account?
              </span>{" "}
              <Link to="/signup" className="text-blue-900 underline">
                Sign Up
              </Link>
            </h3>
          </div>
          <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={onSumitHandler}
            enableReinitialize={true}
          >
            {() => {
              return (
                <Form className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <Input
                      label="Username"
                      placeholder="Enter Username or Email"
                      isRequired={true}
                      uni="username"
                    />
                    <Input
                      label="Password"
                      placeholder="Password"
                      isRequired={true}
                      uni="password"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <button
                      type="submit"
                      className="p-2 text-white bg-primary_dark rounded-sm flex justify-center items-center gap-2"
                      disabled={uploading}
                    >
                      Login
                      <FaArrowRight />
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <button
            type="button"
            className="p-2 border-2 border-tertiary_white rounded-sm flex justify-center items-center gap-2"
          >
            <FaGoogle />
            Sign in with google
          </button>
        </div>
        <div
          className="md:w-[45%] min-h-full overflow-hidden rounded-md md:flex hidden"
          style={{
            background: `url(${assets.Signup}) no-repeat center center/cover`,
          }}
        />
      </div>
    </>
  );
};

export default Login;
