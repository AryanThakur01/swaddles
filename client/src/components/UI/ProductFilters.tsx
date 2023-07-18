import { FC, ReactNode, useEffect, useState } from "react";
import { getFilters } from "../../Api/Products";
import { useNavigate } from "react-router-dom";
import { getProductData } from "../../context/ProductProvider";

interface IProductFilterProps {
  children: ReactNode;
}

const ProductFilters: FC<IProductFilterProps> = ({ children }) => {
  const [filterList, setFilterList] = useState<Array<string>>([]);
  const [activeFilter, setActiveFilter] = useState<string | undefined>("");

  const filters = async () => {
    const data = await getFilters();
    const tempFilterList = [];
    let filterListLength = tempFilterList.length;
    for (let i = data.length - 1; i >= 0; i--) {
      for (let j = 0; j < data[i].length; j++) {
        if (j + 1 > filterListLength) {
          const s: Set<string> = new Set();
          tempFilterList.push(s);
          filterListLength++;
        }
        tempFilterList[j].add(data[i][j]);
      }
    }
    const url = new URL(location.href);
    // const filter = url.searchParams.get("filter");
    // if (!filter) {
    tempFilterList[0] = Array.from(tempFilterList[0]);
    setFilterList([...tempFilterList[0]]);
    // } else {
    //   let i;
    //   for (i = 0; i < tempFilterList.length; i++) {
    //     if (tempFilterList[i].has(filter)) {
    //       break;
    //       // tempFilterList[i] = Array.from(tempFilterList[i]);
    //       // setFilterList([...tempFilterList[i]]);
    //     }
    //   }
    //   // console.log(tempFilterList[i + 1]);
    //   tempFilterList[i + 1] = Array.from(tempFilterList[i + 1]);
    //   setFilterList([...tempFilterList[i + 1]]);
    // }
  };
  const navigate = useNavigate();

  const products = getProductData();

  const filterData = (filter: string) => {
    const url = new URL(location.href);
    setActiveFilter(filter);
    filter = filter.split(" & ").join("-amp-");
    url.searchParams.set("filter", filter);
    url.searchParams.set("page", "1");
    navigate(url.pathname + url.search);
    if (products?.getProductList) products.getProductList();
  };

  useEffect(() => {
    const url = new URL(location.href);
    setActiveFilter(url.searchParams.get("filter")?.split("-amp-").join(" & "));
    filters();
  }, [activeFilter]);
  return (
    <div className="flex gap-3 p-2 my-20">
      <div className="w-[25%] p-3 flex-col gap-3 max-w-sm hidden md:flex bg-white shadow-sm h-fit rounded-sm">
        <h1 className="text-xl">Filters</h1>
        <hr />
        <div className="flex flex-col gap-3"></div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xs font-bold my-3">
            {activeFilter ? activeFilter.toUpperCase() : "CATEGORIES"}
          </h2>
          {filterList.map((filter) => (
            <button
              className={`text-start text-sm mx-2 text-ellipsis overflow-hidden whitespace-nowrap hover:font-bold ${
                activeFilter === filter && "font-bold"
              }`}
              value={filter}
              key={filter}
              onClick={() => filterData(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full p-3 bg-white shadow-sm min-h-full rounded-sm">
        {children}
      </div>
    </div>
  );
};

export default ProductFilters;
