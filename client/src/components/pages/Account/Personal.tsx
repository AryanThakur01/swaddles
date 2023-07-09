import { Form, Formik } from "formik";
import { FC, useState } from "react";
import { UserDetails } from "../../../context/AuthProvider";
import { IUserDocument, IPersonalInfo } from "../../../interfaces/interface";
import Navigation from "../../UI/Navigation";
import AccountNavigation from "../../UI/ProfileNavigation";
import Input from "../../UI/Input";
import * as yup from "yup";
import axios from "axios";

const Personal: FC = () => {
  const [edit, setEdit] = useState("");
  const user: IUserDocument | undefined = UserDetails();
  delete user?.setUser;

  const formInputFields: Array<IPersonalInfo> = [
    {
      title: "Personal Information",
      fields: [
        {
          uni: "firstname",
          label: "First Name",
          value: user?.firstname,
          placeholder: "First Name",
        },
        {
          uni: "lastname",
          label: "Last Name",
          value: user?.lastname,
          placeholder: "Last Name",
        },
      ],
    },
    {
      title: "Email Address",
      fields: [
        {
          uni: "email",
          label: "Email",
          value: user?.firstname,
          placeholder: "Enter Your Email Address",
        },
      ],
    },
    {
      title: "Mobile Address",
      fields: [
        {
          uni: "mobile",
          label: "Mobile Number",
          value: user?.mobile,
          placeholder: "Enter Your Mobile Number",
        },
      ],
    },
  ];

  const validationSchema = yup.object({
    firstname: yup.string().required("Field Required"),
    lastname: yup.string().required("Field Required"),
  });

  const onsubmitHandler = async (values: IUserDocument) => {
    delete values.password;
    delete values.email;
    try {
      const { data: user } = await axios.put(
        `${import.meta.env.VITE_BACKEND}/api/v1/userdata/update`,
        { ...values }
      );
      localStorage.setItem("user", JSON.stringify(user._doc));
      setEdit("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Navigation />
      <AccountNavigation activePage="personal">
        {user ? (
          <div className="flex flex-col gap-10">
            {formInputFields.map((category) => (
              <div key={category.title}>
                <Formik
                  initialValues={user}
                  onSubmit={onsubmitHandler}
                  validationSchema={validationSchema}
                  enableReinitialize
                >
                  {({ resetForm }) => {
                    return (
                      <>
                        {/* {console.log(values)} */}
                        <Form className="flex flex-col w-fit">
                          <div className="flex gap-6">
                            <h1 className="text-2xl">{category.title}</h1>
                            <button
                              className="text-primary"
                              type="reset"
                              onClick={() => {
                                if (edit !== category.title)
                                  setEdit(category.title);
                                else setEdit("");
                                resetForm();
                              }}
                            >
                              {edit === category.title ? "Cancel" : "Edit"}
                            </button>
                          </div>
                          <div className="flex gap-2 my-4 flex-wrap">
                            {category.fields.map((field) => (
                              <div key={field.uni}>
                                <Input
                                  label={
                                    category.title === edit ? field.label : ""
                                  }
                                  placeholder={field.placeholder}
                                  uni={field.uni}
                                  disabled={category.title !== edit}
                                />
                              </div>
                            ))}
                          </div>
                          <div>
                            {category.title === edit && (
                              <button
                                type="submit"
                                className="bg-primary self-end h-11 w-20 text-primary_white font-semibold rounded-sm"
                              >
                                Save
                              </button>
                            )}
                          </div>
                        </Form>
                      </>
                    );
                  }}
                </Formik>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </AccountNavigation>
    </>
  );
};

export default Personal;
