import express from 'express';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import mongoose from 'mongoose';
import { ProductsFields } from '../types';
import Product from '../models/Product';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  try {
  } catch (e) {
    return next(e);
  }
});
productsRouter.post(
  '/',
  imagesUpload.single('image'),
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      const userId = req.user?._id;
      const categoryId = req.body.category;
      const image = req.file ? req.file.filename : null;

      if (!userId) {
        return res.status(422).send({ error: 'User ID is undefined!' });
      }

      const productsData: ProductsFields = {
        user: userId,
        category: categoryId,
        title: req.body.title,
        description: req.body.description,
        price: parseFloat(req.body.price),
        image,
      };

      const product = new Product(productsData);
      await product.save();
      return res.send(product);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      return next(e);
    }
  },
);

export default productsRouter;
