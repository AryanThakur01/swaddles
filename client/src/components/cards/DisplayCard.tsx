import { FC } from "react";
import { IProducts } from "../../interfaces/interface";
import { Link } from "react-router-dom";
interface IStar {
  isOff?: boolean;
}

const DisplayCard: FC<IProducts> = ({
  _id,
  // __v,
  product_name,
  product_category_tree,
  // pid,
  retail_price,
  discounted_price,
  image,
  is_SWD_Advantage_product,
  description,
  product_rating,
  overall_rating,
  brand,
  product_specifications,
}) => {
  const Star: FC<IStar> = ({ isOff }) => {
    return (
      <svg
        className={`w-4 h-4 ${
          !isOff ? "text-yellow-300" : "text-gray-300 dark:text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />{" "}
      </svg>
    );
  };
  return (
    <div className="p-5 shadow-md gap-6 items-center flex md:flex-row flex-col justify-between rounded-md">
      <div className="md:w-[20%]">
        <img className="max-h-60" src={image[0]} alt="OFFLINE" />
      </div>
      <div className="flex flex-col gap-2 md:w-[80%]">
        <h2 className="text-xl">{product_name}</h2>
        <div className="flex gap-4 px-2 flex-wrap">
          {product_category_tree &&
            product_category_tree.map((category) => (
              <p className="text-primary" key={category}>
                {category}
              </p>
            ))}
          {/* {console.log(product_category_tree)} */}
        </div>
        <div className="flex items-center space-x-1">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star isOff />
          {/* <div className="px-3 text-secondary_dark">(250)</div> */}
        </div>
        <div className="flex items-end gap-3 flex-wrap">
          <p className="text-4xl font-bold text-primary_dark">
            ₹{discounted_price}
          </p>
          {discounted_price !== retail_price && (
            <>
              <p className="text-xl text-secondary_dark line-through">
                ₹{retail_price}
              </p>
              <p className="text-xl text-success font-bold">
                {(
                  ((retail_price - discounted_price) / retail_price) *
                  100
                ).toFixed(0)}
                % off
              </p>
            </>
          )}
        </div>
        <p className="text-secondary_dark">
          {description.substring(0, 250)}...{" "}
          <Link to={`/product?_id=${_id}`} className="text-primary underline">
            Read More
          </Link>
        </p>
        {/* <ul className="list-disc px-5 text-secondary_dark">
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
            molestias.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            eligendi inventore nulla a qui eum.
          </li>
        </ul> */}
        <div className="flex gap-3 flex-wrap">
          <button className="w-32 p-2 border border-primary text-primary font-bold rounded-sm">
            Add To Cart
          </button>
          {/* <button className="w-32 p-2 bg-primary text-primary_white font-bold rounded-sm">
            View Product
          </button> */}
          <Link
            to={`/product?_id=${_id}`}
            className="w-32 p-2 bg-primary text-center text-primary_white font-bold rounded-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
