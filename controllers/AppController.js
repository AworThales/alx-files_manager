import RedisClient from '../utils/redis';
import DBClient from '../utils/db';

class AppController {
  static getStatus(req, res) {
    const response = {
      redis: RedisClient.isAlive(),
      db: DBClient.isAlive(),
    };
    return res.status(200).send(response);
  }

  static async getStats(req, res) {
    const response = {
      users: await DBClient.nbUsers(),
      files: await DBClient.nbFiles(),
    };
    return res.status(200).send(response);
  }
}

module.exports = AppController;
