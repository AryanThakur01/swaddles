import Navigation from '../../UI/Navigation.tsx'
import { getProductList } from '../../../Api/Products.tsx'
import { FC, Fragment, useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import Input from '../../UI/Input.tsx'
import * as yup from 'yup'
import { IProducts } from '../../../interfaces/interface.tsx'

interface ICheckoutPage{}
interface ICheckoutProducts extends IProducts{
  qty?: number
}


const CheckoutPage:FC<ICheckoutPage> = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [order, setOrder] = useState<ICheckoutProducts[]>();
  const [retailPrice, setRetailPrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [deliveryCharges, setDeliveryCharges] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [searchingProducts, setSearchingProducts] = useState<boolean>(false);

  // --------------------- Functions for the page -----------------------------
  const productsData = async ()=>{
    const siteUrl = new URLSearchParams(window.location.search);
    let search: string = siteUrl.get("search") || "";
    let searchList = JSON.parse(search)

    let orderData = await getProductList(search);
    for (let j = 0; j < searchList.length; j++) searchList[j] = JSON.parse(searchList[j])
    for (let i = 0; i < orderData.length; i++) {
      orderData[i].image = JSON.parse(orderData[i].image)
      for (let j = 0; j < searchList.length; j++) {
        if(searchList[j].order === orderData[i]._id)
          orderData[i].qty = searchList[j].qty
      }
    }
    setOrder(orderData)
    setQuantity(orderData.length)
  }
  const onSumitHandler = async () => {
    setUploading(true);
    setUploading(false);
  };
  // --------------------------------------------------------------------------

  // -------------------- Additional Components -------------------------------
  const ProductCard: FC<ICheckoutProducts> = ({_id, brand, image, product_name, retail_price, discounted_price, qty})=>{
    
    return(
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <div className="h-28 w-28 flex justify-center items-center overflow-hidden bg-white rounded shadow-sm">
            <img src={image[0]} className="h-28"/>
          </div>
          <div className="flex flex-col justify-between text-lg">
            <h2>{product_name}</h2>
            <p className="text-secondary_dark">&times; {qty}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-5">
          <p>₹ {discounted_price.toLocaleString()}</p>
          <button className="text-3xl text-secondary_dark hover:scale-105 hover:text-primary_dark">&times;</button>
        </div>
      </div>
    )
  }
  // --------------------------------------------------------------------------

  // -------------------- Formik Data And Validation --------------------------
  const validationSchema = yup.object({
    username: yup.string().required("Field Required"),
    cardnumber: yup.string().required("Field Required"),
    expirationdate: yup.string().required("Field Required"),
    cvc: yup.string().required("Field Required"),
    address: yup.string().required("Field Required"),
    city: yup.string().required("Field Required"),
    state: yup.string().required("Field Required"),
    postaladdress: yup.string().required("Field Required"),
  });
  const initialData = {
    username: "",
    cardnumber: "",
    expirationdate: "",
    cvc: "",
    address: "",
    city: "",
    state: "",
    postaladdress: "",
  };
  // --------------------------------------------------------------------------

  // --------------------- To Load When The Page Loads ------------------------
  useEffect(()=>{
    productsData()
  },[])
  // --------------------------------------------------------------------------

  const inputClass="h-9"
  return (
    <div>
      <Navigation />
      <div className="my-20 grid md:grid-cols-5 gap-3 bg-white p-3 max-w-7xl m-auto rounded">
        <div className="min-h-full min-w-full bg-primary_white p-3 col-span-3 rounded shadow-inner flex flex-col">
          {order && order.map(item=>
            <div key={item._id}>
              <ProductCard {...item}/>
              <hr className="my-5"/>
            </div>
          )}
        </div>

        <div className="min-h-full min-w-full bg-primary_white p-3 col-span-2 rounded shadow-inner">
          <div className="bg-white p-3 rounded-sm shadow-md">
            <h2 className="text-secondary_dark text-xl">Price Details</h2>
            <hr className="my-2" />
            <div className="flex justify-between my-2 text-secondary_dark">
              <p>Price({quantity} Items)</p>
              <p className="text-primary_dark">₹ {retailPrice}</p>
            </div>
            <div className="flex justify-between my-2 text-secondary_dark">
              <p>Discount</p>
              <p className="text-success font-bold">
                -₹ {retailPrice - discountPrice}
              </p>
            </div>
            <div className="flex justify-between my-2 text-secondary_dark">
              <p>Delivery Charges</p>
              <p
                className={`${deliveryCharges? "" : "text-success"} font-bold`}
              >
                {deliveryCharges ? `${deliveryCharges.toLocaleString()}`: "Free"}
              </p>
            </div>
            <hr className="my-6" />
            <div className="flex justify-between my-2 text-primary_dark font-bold text-2xl">
              <p>Total Amount</p>
              <p>{discountPrice.toLocaleString()}</p>
            </div>
            <hr className="my-6" />
          </div>
          <h2 className="my-5 text-xl font-bold text-secondary_dark">Contact Information</h2>
          <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={onSumitHandler}
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
                    <hr className="my-5"/>
                    <h2 className="my-5 text-xl font-bold text-secondary_dark">Payment Details</h2>
                    <Input
                      label="Card Number"
                      placeholder="4323 4323 4323 3243"
                      isRequired={true}
                      inputClass={inputClass}
                      uni="cardnumber"
                    />
                    <div className="flex gap-4">
                      <Input
                        label="Expiration Date (MM/YY)"
                        placeholder="mm/dd/yyyy"
                        isRequired={true}
                        uni="expirationdate"
                        inputClass={"w-full " + inputClass}
                      />
                      <Input
                        label="CVC"
                        isRequired={true}
                        uni="cvc"
                        inputClass={"w-full " + inputClass}
                        containerClass="max-w-[20%]"
                      />
                    </div>
                    <hr className="my-5"/>
                    <h2 className="my-5 text-xl font-bold text-secondary_dark">Shipping address</h2>
                      <Input
                        label="Address"
                        placeholder="Address"
                        isRequired={true}
                        uni="address"
                        inputClass={"w-full " + inputClass}
                      />
                      <div className="grid grid-cols-3 gap-2">
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
                          label="Postal Code"
                          isRequired={true}
                          uni="postaladdress"
                          inputClass={"w-full " + inputClass}
                        />
                      </div>
                   </div>
                  <hr />
                  <div className="flex flex-col w-full gap-2">
                    <button
                      type="submit"
                      className="p-2 text-white bg-primary_dark rounded-sm w-40 self-end"
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
  )
}

export default CheckoutPage;
