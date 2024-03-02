import express from 'express';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import mongoose, { Types } from 'mongoose';
import { ProductResponse, ProductsFields } from '../types';
import Product from '../models/Product';

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    let products: ProductResponse[] = [];
    const categoryId = req.query.category as string;

    if (categoryId) {
      try {
        new Types.ObjectId(categoryId);
      } catch {
        return res.status(404).send({ error: 'Wrong category ID' });
      }

      products = await Product.find(
        {
          category: categoryId,
        },
        { user: 0, description: 0, category: 0 },
      );
    } else {
      products = await Product.find(
        {},
        { user: 0, description: 0, category: 0 },
      );
    }

    return res.send(products);
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

productsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const userId = req.user?._id;
    const productId = req.params.id;

    try {
      new Types.ObjectId(productId);
    } catch {
      return res.status(404).send({ error: 'Wrong Item ID!' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({ error: 'Item not found!' });
    }

    await Product.findOneAndDelete<ProductsFields>({
      _id: productId,
      user: userId,
    });

    return res.send({ message: 'Item was successfully deleted ' });
  } catch (e) {
    return next(e);
  }
});

export default productsRouter;
