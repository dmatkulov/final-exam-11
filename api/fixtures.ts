import mongoose from 'mongoose';
import config from './config';
import Product from './models/Product';
import User from './models/User';
import Category from './models/Category';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const models = [Product, Category, User];

  for (const model of models) {
    await dropCollection(db, model.collection.collectionName);
  }

  const [user1, user2, user3, user4] = await User.create(
    {
      username: 'user1',
      password: 'WGZYV',
      displayName: 'Илья',
      phone: '+996220220220',
      token: crypto.randomUUID(),
    },
    {
      username: 'user2',
      password: '12%WGZYV',
      displayName: 'Азамат',
      phone: '+996550550550',
      token: crypto.randomUUID(),
    },
    {
      username: 'user3',
      password: '1xx2%WGZYV',
      displayName: 'Ольга',
      phone: '+99633033032',
      token: crypto.randomUUID(),
    },
    {
      username: 'user4',
      password: 'WqxxYV',
      displayName: 'Назгуль',
      phone: '+996987654',
      token: crypto.randomUUID(),
    },
  );

  const [computers, cars, clothes] = await Category.create(
    {
      title: 'Computers',
    },
    {
      title: 'Cars',
    },
    {
      title: 'Clothes',
    },
  );

  await Product.create(
    {
      user: user1,
      category: computers,
      title:
        'Ноутбук, Acer, 12 ГБ ОЗУ, Intel Core i7, До 11 ", Б/у, Для работы, учебы, память SSD',
      description:
        'Продаю по очень низкой цене, по причине того , что не ставятся драйвера на видеокарту , и просто нужны деньги',
      price: 48000,
      image: 'fixtures/acer.webp',
    },
    {
      user: user2,
      category: computers,
      title:
        'Ноутбук, Dell, 8 ГБ ОЗУ, Intel Core i5, 13.3 ", Б/у, Для несложных задач, память SSD',
      description:
        'Этот универсальный ноутбук отлично подойдет для программирования, повседневных задач, для учителей, для работы и маркетплейсов.',
      price: 29900,
      image: 'fixtures/dell.webp',
    },
    {
      user: user1,
      category: cars,
      title: 'Mercedes-Benz 230: 1992 г., 2.3, Механика, Бензин, Седан',
      description:
        'Mercedes Benz W124 2.3 обьем. 1992год. полный электропакет подогрев сидения люк чистый салон сел поехал все работает в хорошем состоянии для своего года машина.',
      price: 320000,
      image: 'fixtures/mers.webp',
    },
    {
      user: user2,
      category: cars,
      title: 'Subaru Legacy: 2020 г., 2.5, Вариатор, Бензин, Седан',
      description:
        'Продам Subaru LEGACY. Свежепригнан ,растаможен,не оформлен.',
      price: 1780000,
      image: 'fixtures/subaru.webp',
    },
    {
      user: user3,
      category: clothes,
      title: 'Пальто, Классика, Осень-весна, По колено, L (EU 40)',
      description:
        'Пальто от Zara, шикарный жёлтый цвет состояние нового одевала очень редко, из качественной шерсти, пальто из ручной работы, продою потому что весит без дела, разгружаю гардероб, размер L ка срочная цена, покупала за 170$',
      price: 1780000,
      image: 'fixtures/clothes.webp',
    },
    {
      user: user4,
      category: clothes,
      title: 'Пуховик, Короткая модель, Оверсайз, M (EU 38)',
      description:
        'Zara куртка рубашка, водонепроницаемая,новая,размер: М, цена окончательная',
      price: 1780000,
      image: 'fixtures/mont.webp',
    },
  );
  await db.close();
};

void run();
