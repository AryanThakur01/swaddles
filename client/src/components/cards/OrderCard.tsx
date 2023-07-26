import { FC, useState } from "react";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IProducts } from "../../interfaces/interface";
import { Link } from "react-router-dom";

interface IOrderCard extends Partial<IProducts> {
  quantity: number;
}

const OrderCard: FC<IOrderCard> = ({
  quantity,
  _id,
  description,
  image,
  discounted_price,
  product_name,
  retail_price,
}) => {
  const [displayQuantity, setDisplayQuantity] = useState(quantity | 1);
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 rounded-sm p-2 gap-3 bg-primary_white shadow-inner">
      <div className="w-full flex justify-center items-center md:max-h-48">
        {image && (
          <img
            // src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
            src={image[0]}
            alt="Image Not Available"
            className="rounded-sm md:max-h-48"
          />
        )}
      </div>
      <div className="flex flex-col gap-3 w-full md:col-span-2 justify-center">
        <div className="flex justify-between w-full items-center font-bold gap-4">
          <h2 className="text-md">{product_name}</h2>
          <button
            type="button"
            className="text-danger rounded-sm flex items-center gap-3"
          >
            <p>Remove</p>
            <FaRegTrashAlt />
          </button>
        </div>
        <p className="max-w-[80%] text-tertiary_dark">
          {description?.substring(0, 80)}
          <Link
            to={`http://localhost:5173/product?_id=${_id}`}
            className="text-primary hover:font-bold"
          >
            ...Read More
          </Link>
        </p>
        <div className="flex gap-2 items-end">
          <p className="text-sm line-through text-secondary_dark">
            ₹{retail_price}
          </p>
          <p className="text-primary_dark text-xl font-bold">
            ₹{discounted_price}
          </p>
          <div className="bg-secondary_white h-full w-[1px]" />
          <p className="text-success text-xl font-bold">
            {retail_price &&
              discounted_price &&
              (
                ((retail_price - discounted_price) / retail_price) *
                100
              ).toFixed(0)}
            % Off
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 bg-white rounded-sm text-xs"
            onClick={() =>
              displayQuantity !== 1 && setDisplayQuantity(displayQuantity - 1)
            }
          >
            <FaMinus />
          </button>
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="w-16 outline-none shadow-sm rounded-sm text-center"
            value={displayQuantity}
            onChange={({ target }) => {
              setDisplayQuantity(Number(target.value));
            }}
          />
          <button
            type="button"
            className="px-3 bg-white rounded-sm text-xs"
            onClick={() => setDisplayQuantity(displayQuantity + 1)}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
