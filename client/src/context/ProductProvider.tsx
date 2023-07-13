import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { IProducts } from "../interfaces/interface";

interface IProductsContext extends IProducts {
  setProduct?: Dispatch<SetStateAction<IProducts>>;
}
const ProductContext = createContext<IProductsContext | undefined>(undefined);

const ProductProvider: FC<PropsWithChildren> = ({ children }) => {
  const [product, setProduct] = useState<IProducts>({
    _id: "",
    brand: "",
    description: "",
    discounted_price: 0,
    image: [],
    is_SWD_Advantage_product: false,
    product_name: "",
    product_rating: "",
    retail_price: 0,
  });
  return (
    <ProductContext.Provider value={{ ...product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const getProductData = () => {
  return useContext(ProductContext);
};

export default ProductProvider;
