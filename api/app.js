import * as dotenv from 'dotenv';
dotenv.config();

import sequelize from './db/index.js';


sequelize.sync();