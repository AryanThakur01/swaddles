import { FC, ReactNode, useEffect, useState } from "react";
import { getFilters } from "../../Api/Products";
import { useNavigate } from "react-router-dom";

interface IProductFilterProps {
  children: ReactNode;
}

const ProductFilters: FC<IProductFilterProps> = ({ children }) => {
  const [filterList, setFilterList] = useState<Array<string>>([]);

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
    for (let i = tempFilterList.length - 1; i >= 0; i--) {
      tempFilterList[i] = Array.from(tempFilterList[i]);
      setFilterList([...tempFilterList[i]]);
    }
  };
  const navigate = useNavigate();

  const filterData = (filter: string) => {
    const url = new URL(location.href);
    url.searchParams.set("filter", filter);
    navigate(url.pathname + url.search);
    // console.log(url.search);
    // location.reload();
  };

  useEffect(() => {
    filters();
  }, []);
  return (
    <div className="flex gap-3 p-2 my-20">
      <div className="w-[25%] p-3 flex-col gap-3 max-w-sm hidden md:flex bg-white shadow-sm h-fit rounded-sm">
        <h1 className="text-xl">Filters</h1>
        <hr />
        <div className="flex flex-col gap-3"></div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xs font-bold my-3">CATEGORIES</h2>
          {filterList.map((filter) => (
            <button
              className="text-start text-sm mx-2 text-ellipsis overflow-hidden whitespace-nowrap hover:font-bold"
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
