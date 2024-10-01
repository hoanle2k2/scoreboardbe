import mongoose from "mongoose";

export const CONNECT_DB = async () => {
  try {
    const uri = 'mongodb://localhost:27017/scoreboard';
    await mongoose.connect(uri);

    const db = mongoose.connection;

    db.on('connected', () => {
      console.log('Connected to mongoDB');
    });

    db.on('reconnected', () => {
      console.log('Reconnected to mongoDB');
    });
    db.on('error', error => {
      console.log('Mongo connection has an error', error)
      mongoose.disconnect()
    })
    db.on('disconnected', () => {
      console.log('Mongo connection is disconnected')
    })
  } catch (error) {
    console.error('Error connected to MongoDB: ', error);
  }
}