import { Model, Schema, model } from 'mongoose'
import { IProducts } from '../config/Interfaces'

type ProductModel = Model<IProducts>
const ProductSchema = new Schema<IProducts>({
  product_name: {
    type: String,
    required: false,
  },
  brand: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  retail_price: {
    type: Number,
    required: false,
  },
  discounted_price: {
    type: Number,
    required: false,
  },
  is_SWD_Advantage_product: {
    type: Boolean,
    required: false,
  },
  product_rating: {
    type: String,
    required: false,
    default: 'NA',
  },
  overall_rating: {
    type: String,
    required: false,
    default: 'NA',
  },
  image: {
    type: String,
    required: false,
  },
  pid: {
    type: String,
    required: false,
  },
  product_category_tree: {
    type: String,
    required: false,
  },
  product_specifications: {
    type: String,
    required: false,
  },
})

export default model<IProducts, ProductModel>('Product', ProductSchema)
