"use strict";
// // src/config/database.config.ts
// import { DataSource } from 'typeorm';
// import { User } from '../entities/user.entity';
// import { Ride } from '../entities/ride.entity';
// import { RideRequest } from '../entities/ride-request.entity';
// import { Rating } from '../entities/rating.entity';
// import { Message } from '../entities/message.entity';
// import { Building } from '../entities/building.entity';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT || '5432'),
//   username: "postgres",
//   password: "root",
//   database: "commuteconnect",
//   synchronize: process.env.NODE_ENV !== 'production',
//   logging: process.env.NODE_ENV === 'development',
//   entities: [User, Ride, RideRequest, Rating, Message, Building],
//   migrations: ['src/migrations/*.ts'],
//   subscribers: [],
// });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const ride_entity_1 = require("../entities/ride.entity");
const ride_request_entity_1 = require("../entities/ride-request.entity");
const rating_entity_1 = require("../entities/rating.entity");
const message_entity_1 = require("../entities/message.entity");
const building_entity_1 = require("../entities/building.entity");
require("dotenv/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
    entities: [user_entity_1.User, ride_entity_1.Ride, ride_request_entity_1.RideRequest, rating_entity_1.Rating, message_entity_1.Message, building_entity_1.Building],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
});
