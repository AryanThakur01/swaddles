import { ErrorMessage, Field } from "formik";
import { IInputFields } from "../../interfaces/interface";

const Input = ({ label, placeholder, isRequired, uni }: IInputFields) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={uni}>
        {label}
        {isRequired && "*"}
      </label>
      <Field
        type="text"
        name={uni}
        id={uni}
        className="h-11 border-2 border-primary_white rounded-sm p-1"
        placeholder={placeholder}
      />
      <ErrorMessage
        name={uni}
        component={({ children }: { children: string }) => (
          <div className="text-red-500">{children}</div>
        )}
      />
    </div>
  );
};

export default Input;
