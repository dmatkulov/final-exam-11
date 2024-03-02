import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Computers', 'Cars', 'Clothes'],
      message: 'Unknown category',
    },
  },
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;
