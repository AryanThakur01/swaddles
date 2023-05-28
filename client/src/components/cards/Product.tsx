import Assets from '../../assests.ts';
import { IProduct } from '../../types/components.ts';

const Product: React.FC<IProduct> = ({
  name,
  image,
  description,
  price,
  previousPrice,
  cardColor,
}) => (
  <div className={`w-60 p-2 flex flex-col gap-2 bg-${cardColor} rounded-md text-primary_dark justify-between`}>
    <div className="flex flex-col gap-2">
      <img src={image} alt="!!" className="w-60 rounded-md" />
      <div className="flex items-center justify-between">
        <div className="text-xl">{name}</div>
        <button type="button"><img src={Assets.cart} alt="!" /></button>
      </div>
      <p className="text-sm text-tertiary_dark">
        {description.substring(0, 43)}
        ....
        <button type="button" className="text-primary underline inline">Read More</button>
      </p>
      <div className="flex flex-wrap">
        {
          previousPrice
            ? (
              <span className="bg-red-500 text-primary_white px-2 rounded-full text-sm">
                -
                {(price / previousPrice) * 100}
                %
              </span>
            ) : <div />
        }
      </div>
      <div className="flex gap-4 items-center">
        <div className="text-2xl text-success font-semibold">
          ₹
          {price}
        </div>
        {previousPrice
          ? (
            <div className="text-tertiary_dark text-sm">
              <s>
                ₹
                {previousPrice}
              </s>
            </div>
          )
          : <div />}
      </div>
    </div>
    <button type="button" className="w-full p-1 bg-primary flex items-center justify-center gap-3 rounded-sm">
      <img src={Assets.view} alt="!!" className="h-3" />
      <span className="text-primary_white font-bold">VIEW</span>
    </button>
  </div>
);

export default Product;
