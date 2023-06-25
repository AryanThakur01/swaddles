import { Link } from "react-router-dom";
import Navigation from "../UI/Navigation";
import assets from "../assets";
import { FaArrowRight, FaGoogle } from "react-icons/fa";
import Input from "../UI/Input";
import { FC } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { IRegistrationData } from "../../interfaces/interface";
import axios from "axios";

const Signup: FC = () => {
  const validationSchema = yup.object({
    firstname: yup.string().required("Field Required"),
    lastname: yup.string().required("Field Required"),
    username: yup.string().required("Field Required"),
    email: yup.string().required("Field Required"),
    password: yup.string().required("Field Required"),
    address: yup.string(),
    mobile: yup.string().required("Field Required"),
  });
  const initialData: IRegistrationData = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    address: "",
    mobile: "",
  };
  const onSumitHandler = async (values: IRegistrationData) => {
    try {
      const res = await axios({
        method: "post",
        url: `/api/v1/auth/register`,
        data: {
          ...values,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navigation />
      <div className="flex md:w-[80%] m-3 md:mx-auto my-20 gap-8 border-2 border-black p-5 rounded-sm">
        <div
          className="md:w-[45%] min-h-full overflow-hidden rounded-md md:flex hidden"
          style={{
            background: `url(${assets.Signup}) no-repeat center center/cover`,
          }}
        />
        <div className="flex flex-col gap-6 w-full md:w-[50%]">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl">Sign Up</h1>
            <h3 className="text-md">
              <span className="text-tertiary_white">
                Already have an account?
              </span>{" "}
              <Link to="/login" className="text-blue-900 underline">
                Sign in
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
                    <div className="flex lg:flex-row flex-col gap-2">
                      <Input
                        label="First Name"
                        placeholder="firstname"
                        isRequired={true}
                        uni="firstname"
                      />
                      <Input
                        label="Last Name"
                        placeholder="lastname"
                        isRequired={true}
                        uni="lastname"
                      />
                    </div>
                    <Input
                      label="Username"
                      placeholder="Username"
                      isRequired={true}
                      uni="username"
                    />
                    <Input
                      label="Email"
                      placeholder="Email"
                      isRequired={true}
                      uni="email"
                    />
                    <Input
                      label="Password"
                      placeholder="Password"
                      isRequired={true}
                      uni="password"
                    />
                    <Input
                      label="Address"
                      placeholder="address"
                      uni="address"
                    />
                    <Input
                      label="Mobile"
                      placeholder="Mobile"
                      isRequired={true}
                      uni="mobile"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <button
                      type="submit"
                      className="p-2 text-white bg-black rounded-sm flex justify-center items-center gap-2"
                    >
                      Create Account
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
            Sign up With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
