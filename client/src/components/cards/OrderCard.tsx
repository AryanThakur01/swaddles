import { FC, useState } from "react";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IProducts } from "../../interfaces/interface";
import { Link } from "react-router-dom";
import { removeFromCartApi } from "../../Api/Cart";

interface IOrderCard extends Partial<IProducts> {
  quantity: number;
  uniqueId: string;
  getCartProducts: () => Promise<void>;
}

const OrderCard: FC<IOrderCard> = ({
  quantity,
  _id,
  image,
  discounted_price,
  product_name,
  retail_price,
  uniqueId,
  getCartProducts,
}) => {
  const [displayQuantity, setDisplayQuantity] = useState<number>(quantity | 1);

  const updateProduct = (quantity: number) => {
    setDisplayQuantity(quantity);
  };
  const removeFromCart = async () => {
    if (typeof _id !== "string") return;
    const isRemoved = await removeFromCartApi(uniqueId);
    if (isRemoved._doc) getCartProducts();
  };

  return (
    <div className="grid grid-cols-3 rounded-sm p-2 gap-3 bg-primary_white shadow-inner">
      <div className="w-full flex justify-center items-center max-h-40">
        {image && (
          <img
            src={image[0]}
            alt="Image Not Available"
            className="rounded-sm md:max-h-40 h-40"
          />
        )}
      </div>
      <div className="flex flex-col justify-between w-full col-span-2">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between w-full items-center font-bold gap-4">
            <h2 className="text-md">{product_name}</h2>
            <button
              type="button"
              className="text-danger rounded-sm flex items-center gap-3"
              onClick={removeFromCart}
            >
              <FaRegTrashAlt />
            </button>
          </div>
          <div className="flex gap-2 items-end">
            <p className="text-sm line-through text-secondary_dark">
              ₹{retail_price}
            </p>
            <p className="text-primary_dark sm:text-xl font-bold">
              ₹{discounted_price}
            </p>
            <div className="bg-secondary_white h-full w-[1px]" />
            <p className="text-success sm:text-xl font-bold">
              {retail_price &&
                discounted_price &&
                (
                  ((retail_price - discounted_price) / retail_price) *
                  100
                ).toFixed(0)}
              % Off
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 bg-white rounded-sm text-xs"
            onClick={() =>
              displayQuantity !== 1 && updateProduct(displayQuantity - 1)
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
              updateProduct(Number(target.value));
            }}
          />
          <button
            type="button"
            className="px-3 bg-white rounded-sm text-xs"
            onClick={() => updateProduct(displayQuantity + 1)}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
