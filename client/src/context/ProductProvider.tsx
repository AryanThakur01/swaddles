import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IProducts } from "../interfaces/interface";
import { getProductsApi } from "../Api/Products";

interface IProductsContext {
  pagesAvailable: number;
  productList: IProducts[] | undefined;
  setProductList?: Dispatch<SetStateAction<IProducts[] | undefined>>;
  getProductList?: () => void;
}
const ProductContext = createContext<undefined | IProductsContext>(undefined);

const ProductProvider: FC<PropsWithChildren> = ({ children }) => {
  const [pagesAvailable, setPagesAvailable] = useState<number>(1);
  const [productList, setProductList] = useState<undefined | IProducts[]>([]);

  const getProductList = async () => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    const filter = params.get("filter");
    const page = Number(params.get("page"));
    const limit = 20;

    if (!search) return;

    let data = await getProductsApi(search, page, limit, filter);

    const length = data.length;
    setPagesAvailable(Math.ceil(length / limit));

    data = data.productList;
    const dataList: Array<IProducts> = [];

    Object.keys(data).map((item) => {
      const image = data[item].image;
      let categories = data[item].product_category_tree;
      data[item].product_category_tree = categories
        .substring(2, categories.length - 2)
        .split(" >> ");
      data[item].image = image.substring(2, image.length - 2).split('", "');
      dataList.push(data[item]);
    });
    setProductList([...dataList]);
  };
  useEffect(() => {
    getProductList();
  }, []);
  return (
    <ProductContext.Provider
      value={{ pagesAvailable, productList, getProductList, setProductList }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const getProductData = () => useContext(ProductContext);

export default ProductProvider;
