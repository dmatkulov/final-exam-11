// import mongoose from 'mongoose';
// import config from './config';
//
// const dropCollection = async (
//   db: mongoose.Connection,
//   collectionName: string,
// ) => {
//   try {
//     await db.dropCollection(collectionName);
//   } catch (e) {
//     console.log(`Collection ${collectionName} was missing, skipping drop...`);
//   }
// };
//
// const run = async () => {
//   await mongoose.connect(config.mongoose.db);
//   const db = mongoose.connection;
//
//   await db.close();
// };
//
// void run();
