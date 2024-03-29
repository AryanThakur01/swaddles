import Navigation from "../../UI/Navigation.tsx";
import { getProductList } from "../../../Api/Products.tsx";
import { FC, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import Input from "../../UI/Input.tsx";
import * as yup from "yup";
import { ICheckout, IProducts } from "../../../interfaces/interface.tsx";
import { Checkout, ICheckoutData, saveOrder } from "../../../Api/Checkout.tsx";
import { UserDetails } from "../../../context/AuthProvider.tsx";
import { useNavigate } from "react-router-dom";

interface ICheckoutPage {}
interface ICheckoutProducts extends IProducts {
  qty?: number;
}

const CheckoutPage: FC<ICheckoutPage> = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [order, setOrder] = useState<ICheckoutProducts[]>();
  const [retailPrice, setRetailPrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [deliveryCharges, setDeliveryCharges] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  // const [searchingProducts, setSearchingProducts] = useState<boolean>(false);
  const user = UserDetails();
  const navigate = useNavigate();

  // --------------------- Functions for the page -----------------------------
  const productsData = async () => {
    const siteUrl = new URLSearchParams(window.location.search);
    let search: string = siteUrl.get("search") || "";
    let searchList = JSON.parse(search);

    let orderData = await getProductList(search);
    let tempRetail = 0;
    let tempDiscount = 0;
    for (let j = 0; j < searchList.length; j++)
      searchList[j] = JSON.parse(searchList[j]);
    for (let i = 0; i < orderData.length; i++) {
      orderData[i].image = JSON.parse(orderData[i].image);
      for (let j = 0; j < searchList.length; j++) {
        if (searchList[j].order === orderData[i]._id) {
          orderData[i].qty = searchList[j].qty;
          tempRetail += orderData[j].retail_price;
          tempDiscount += orderData[j].discounted_price;
        }
      }
    }
    setRetailPrice(tempRetail);
    setDiscountPrice(tempDiscount);
    setDeliveryCharges(tempDiscount <= 500 ? 40 : 0);
    setOrder(orderData);
    setQuantity(orderData.length);
  };
  const onSubmitHandler = async (values: ICheckoutData) => {
    setUploading(true);

    try {
      const siteUrl = new URLSearchParams(window.location.search);
      let search: string[] = JSON.parse(siteUrl.get("search") || "");
      let searchList: ICheckout[] = [];
      let len = search.length;
      for (let i = 0; i < len; i++) {
        searchList.push(JSON.parse(search[i]));
      }
      let partialOptions = await Checkout(searchList, values);
      let options = {
        ...partialOptions,
        key: "rzp_test_iHQbRxa3O0xQE3",
        name: `order from user: ${user?._id} `,
        Description: `Transaction for products`,
        handler: async (response: any) => {
          // console.log(values);
          // console.log(response);
          // console.log(searchList);
          await saveOrder(values, response, searchList);
          navigate("/account/myorders");
        },
        prefill: {
          name: user?.firstname || "" + user?.lastname || "",
          email: user?.email,
          contact: user?.mobile,
        },
      };
      const paymentObject = (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
    }
    setUploading(false);
  };

  // --------------------------------------------------------------------------

  // -------------------- Additional Components -------------------------------
  const ProductCard: FC<ICheckoutProducts> = ({
    image,
    product_name,
    discounted_price,
    qty,
  }) => {
    return (
      <div className="flex justify-between gap-4 md:flex-row flex-col">
        <div className="flex gap-4 md:flex-row flex-col">
          <div className="md:h-28 md:w-28 flex justify-center items-center overflow-hidden bg-white rounded shadow-sm">
            <img src={image[0]} className="md:h-28 h-full" />
          </div>
          <div className="flex flex-col justify-between text-lg">
            <h2>{product_name}</h2>
            <div className="flex justify-between gap-5 flex-wrap">
              <div className="md:hidden ">
                <p>₹{discounted_price.toLocaleString()}</p>
              </div>
              <p className="text-secondary_dark">&times; {qty}</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col justify-between gap-5 flex-wrap">
          <p>₹{discounted_price.toLocaleString()}</p>
        </div>
      </div>
    );
  };
  // --------------------------------------------------------------------------

  // -------------------- Formik Data And Validation --------------------------
  const validationSchema = yup.object({
    username: yup.string().required("Field Required"),
    address: yup.string().required("Field Required"),
    city: yup.string().required("Field Required"),
    state: yup.string().required("Field Required"),
    postalCode: yup.string().required("Field Required"),
  });
  const initialData = {
    username: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  };
  // --------------------------------------------------------------------------

  // --------------------- To Load When The Page Loads ------------------------
  useEffect(() => {
    productsData();
  }, []);
  // --------------------------------------------------------------------------

  const inputClass = "h-9";
  return (
    <div>
      <Navigation />
      <div className="my-20 grid md:grid-cols-5 grid-cols-1 gap-3 bg-white p-3 max-w-7xl m-auto rounded">
        <div className="min-h-full min-w-full bg-primary_white p-3 col-span-3 rounded shadow-inner flex flex-col">
          {order &&
            order.map((item) => (
              <div key={item._id}>
                <ProductCard {...item} />
                <hr className="my-5" />
              </div>
            ))}
        </div>

        <div className="min-h-full min-w-full bg-primary_white p-3 col-span-2 rounded shadow-inner">
          <div className="bg-white p-3 rounded-sm shadow-md">
            <h2 className="text-secondary_dark text-xl">Price Details</h2>
            <hr className="my-2" />
            <div className="flex justify-between my-2 text-secondary_dark">
              <p>Price({quantity} Items)</p>
              <p className="text-primary_dark">
                ₹ {retailPrice.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between my-2 text-secondary_dark">
              <p>Discount</p>
              <p className="text-success font-bold">
                -₹ {(retailPrice - discountPrice).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between my-2 text-secondary_dark">
              <p>Delivery Charges</p>
              <p
                className={`${deliveryCharges ? "" : "text-success"} font-bold`}
              >
                {deliveryCharges
                  ? `${deliveryCharges.toLocaleString()}`
                  : "Free"}
              </p>
            </div>
            <hr className="my-6" />
            <div className="flex justify-between my-2 text-primary_dark font-bold text-2xl">
              <p>Total Amount</p>
              <p>{discountPrice.toLocaleString()}</p>
            </div>
            <hr className="my-6" />
            <p className="text-center text-success">
              You Saved <b>₹{(retailPrice - discountPrice).toLocaleString()}</b>
            </p>
          </div>
          <h2 className="my-5 text-xl font-bold text-secondary_dark">
            Contact Information
          </h2>
          <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
            enableReinitialize={true}
          >
            {() => {
              return (
                <Form className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <Input
                      label="Full Name"
                      placeholder="Enter Your Name"
                      isRequired={true}
                      uni="username"
                      labelClass="py-2"
                      inputClass={inputClass}
                    />
                    <hr className="my-5" />
                    <h2 className="my-5 text-xl font-bold text-secondary_dark">
                      Shipping address
                    </h2>
                    <Input
                      label="Address"
                      placeholder="Address"
                      isRequired={true}
                      uni="address"
                      inputClass={"w-full " + inputClass}
                    />
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
                      <Input
                        label="City"
                        isRequired={true}
                        uni="city"
                        inputClass={"w-full " + inputClass}
                      />
                      <Input
                        label="State/Province"
                        isRequired={true}
                        uni="state"
                        inputClass={"w-full " + inputClass}
                      />
                      <Input
                        label="Postal Code(PIN)"
                        isRequired={true}
                        uni="postalCode"
                        inputClass={"w-full " + inputClass}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="flex flex-col w-full gap-2">
                    <button
                      type="submit"
                      className={`p-2 text-white ${
                        uploading ? "bg-secondary_white" : "bg-primary_dark"
                      } rounded w-40 self-end`}
                      disabled={uploading}
                    >
                      Make Payment
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
