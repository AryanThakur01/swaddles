import { FC } from "react";
import { IToast } from "../../interfaces/interface";
import { GrClose } from "react-icons/gr";
import { FaCheckCircle } from "react-icons/fa";

const Toast: FC<IToast> = ({
  title,
  description,
  // duration,
  isClosable,
  status,
}: IToast) => {
  return (
    <div className="text-primary_white flex gap-2 bg-success fixed bottom-1 m-auto z-40 left-[50%] translate-x-[-50%] p-2 rounded-md">
      {status === "success" && <FaCheckCircle className="text-2xl" />}
      <div>
        <h1 className="font-extrabold text-lg gap-2">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>
      <div>
        {isClosable && (
          <button type="button" className="invert-[90%] text-sm">
            <GrClose />
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
