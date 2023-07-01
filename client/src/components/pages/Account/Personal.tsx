import { FC } from "react";
import AccountNavigation from "../../UI/ProfileNavigation";
import Navigation from "../../UI/Navigation";
import { UserDetails } from "../../../context/AuthProvider";
import { IUserDocument } from "../../../interfaces/interface";
import Input from "../../UI/Input";
import { Formik } from "formik";
import { Form } from "react-router-dom";
import * as yup from "yup";

const Personal: FC = () => {
  const user: IUserDocument | undefined = UserDetails();
  const detailUpdate = () => {};
  const initialPersonalInformation = {
    firstname: user?.firstname,
    lastname: user?.lastname,
  };
  const personalInfoSchema = yup.object({
    firstname: yup.string().required("Can't be Empty"),
    lastname: yup.string().required("Can't be Empty"),
  });
  const submitPersonalInfo = () => {};
  return (
    <>
      {console.log(UserDetails())}
      <Navigation />
      <AccountNavigation activePage="personal">
        <div>
          <div className="flex gap-5">
            <h1 className="text-2xl">Personal Information</h1>
            <button
              type="button"
              onClick={detailUpdate}
              className="text-primary"
            >
              Edit
            </button>
          </div>
          <div className="flex gap-3">
            <Formik
              initialValues={initialPersonalInformation}
              validationSchema={personalInfoSchema}
              onSubmit={submitPersonalInfo}
            >
              <Form>
                <Input
                  label="FirstName"
                  placeholder={`${user?.firstname}`}
                  uni="firstname"
                />
              </Form>
            </Formik>
          </div>
        </div>
      </AccountNavigation>
    </>
  );
};

export default Personal;
