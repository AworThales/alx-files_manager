import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import DBClient from '../utils/db';
import RedisClient from '../utils/redis';

class AuthController {
  static async getConnect(req, res) {
    const authorization = req.header('Authorization') || null;
    if (!authorization) return res.status(401).send({ error: 'Unauthorized' });

    const buff = Buffer.from(authorization.replace('Basic ', ''), 'base64');
    const credentials = {
      email: buff.toString('utf-8').split(':')[0],
      password: buff.toString('utf-8').split(':')[1],
    };

    if (!credentials.email || !credentials.password) return res.status(401).send({ error: 'Unauthorized' });

    credentials.password = sha1(credentials.password);

    const userExists = await DBClient.db
      .collection('users')
      .findOne(credentials);
    if (!userExists) return res.status(401).send({ error: 'Unauthorized' });

    const access_token = uuidv4();
    const key = `auth_${access_token}`;
    await RedisClient.set(key, userExists._id.toString(), 86400);

    return res.status(200).send({ access_token });
  }

  static async getDisconnect(req, res) {
    const access_token = req.header('X-Token') || null;
    if (!access_token) return res.status(401).send({ error: 'Unauthorized' });

    const redisToken = await RedisClient.get(`auth_${access_token}`);
    if (!redisToken) return res.status(401).send({ error: 'Unauthorized' });

    await RedisClient.del(`auth_${access_token}`);
    return res.status(204).send();
  }
}

module.exports = AuthController;
