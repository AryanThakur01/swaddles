import { ErrorMessage, Field } from "formik";
import { IInputFields } from "../../interfaces/interface";
import { FC } from "react";

const Input: FC<IInputFields> = ({
  label,
  placeholder,
  isRequired,
  uni,
  disabled,
  inputClass,
  labelClass,
  containerClass,
}) => {
  return (
    <div className={`flex flex-col w-full ${containerClass}`}>
      <label htmlFor={uni} className={`text-secondary_dark ${labelClass}`}>
        {label}
        {isRequired && "*"}
      </label>
      <Field
        type="text"
        name={uni}
        id={uni}
        className={`h-11 border ${
          disabled
            ? "border-primary_white text-tertiary_white"
            : "border-secondary_white text-tertiary_dark"
        } rounded-sm p-1 ${inputClass}`}
        placeholder={placeholder}
        disabled={disabled}
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
