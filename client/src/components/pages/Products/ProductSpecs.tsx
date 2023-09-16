import { useEffect, useState } from "react";
import { getSingleProductApi } from "../../../Api/Products";
import Navigation from "../../UI/Navigation";
import { IProductSpecs, IProducts } from "../../../interfaces/interface";

const ProductSpecs = () => {
  const [specs, setSpecs] = useState<
    Array<IProductSpecs> | string | undefined
  >();

  const getProductSpecs = async () => {
    try {
      const _id = new URLSearchParams(location.search).get("_id");
      const data: IProducts = await getSingleProductApi(_id);
      setSpecs(data.product_specifications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductSpecs();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="my-20 p-5 rounded-md md:w-[75vw] m-auto flex flex-col gap-5 shadow-lg text-primary_dark bg-white">
        <h1 className="text-center text-3xl font-bold">
          PRODUCT SPECIFICATIONS
        </h1>
        {typeof specs === "object" &&
          specs.map((item, i) => (
            <div key={item.key || i}>
              <h2 className="font-bold text-xl">{item.key}</h2>
              <hr />
              <p className="text-secondary_dark my-3">{item.value}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductSpecs;
