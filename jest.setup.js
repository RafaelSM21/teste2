import { AppDataSource } from '../src/data-source';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

module.exports = async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(true);
};