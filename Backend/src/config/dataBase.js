import connectMongoDB from './mongoDB.js'

const connectDatabase = async () => {
  const db = process.env.DB_DRIVER;

  switch (db) {
    case 'mongoDB':
      await connectMongoDB();
      break;

    default:
      throw new Error('Database no soportada');
  }
}

export default connectDatabase