import express from 'express';
import Category from '../models/Category';
import mongoose from 'mongoose';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (_req, res, next) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (e) {
    return next(e);
  }
});

categoriesRouter.post('/', async (req, res, next) => {
  try {
    const categoryData = {
      title: req.body.title,
    };

    const category = new Category(categoryData);
    await category.save();
    return res.send(category);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
});

export default categoriesRouter;
