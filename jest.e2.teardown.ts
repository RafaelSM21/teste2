

const { AppDataSource } = require('./path/to/your/data-source'); // Adjust the path as needed

module.exports = async () => {
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
};