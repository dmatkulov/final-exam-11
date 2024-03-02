import mongoose, { HydratedDocument } from 'mongoose';
import { ProductsFields } from '../types';
import Category from './Category';
import User from './User';

const ProductSchema = new mongoose.Schema<ProductsFields>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (userId: mongoose.Types.ObjectId) => {
        const user = await User.findById(userId);
        return Boolean(user);
      },
      message: 'User does not exists',
    },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const category = await Category.findById(value);
        return Boolean(category);
      },
      message: 'Category does not exist!',
    },
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    validate: {
      validator: function (this: HydratedDocument<ProductsFields>) {
        return this.price > 0;
      },
      message: 'Price cannot be less than zero (0 kgs)',
    },
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
