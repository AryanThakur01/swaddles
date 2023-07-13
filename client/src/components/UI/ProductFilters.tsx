import { FC, ReactNode } from "react";

interface IProductFilterProps {
  children: ReactNode;
}

const ProductFilters: FC<IProductFilterProps> = ({ children }) => {
  return (
    <div className="flex gap-3 p-2 my-20">
      <div className="w-[25%] p-3 flex-col gap-3 hidden md:flex bg-white shadow-sm min-h-full rounded-sm">
        <h1 className="text-xl">Filters</h1>
        <div></div>
      </div>
      <div className="w-full p-3 bg-white shadow-sm min-h-full rounded-sm">
        {children}
      </div>
    </div>
  );
};

export default ProductFilters;
