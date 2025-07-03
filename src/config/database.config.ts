// // src/config/database.config.ts
// import { DataSource } from 'typeorm';
// import { User } from '../entities/user.entity';
// import { Ride } from '../entities/ride.entity';
// import { RideRequest } from '../entities/ride-request.entity';
// import { Rating } from '../entities/rating.entity';
// import { Message } from '../entities/message.entity';
// import { Building } from '../entities/building.entity';

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

import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Ride } from '../entities/ride.entity';
import { RideRequest } from '../entities/ride-request.entity';
import { Rating } from '../entities/rating.entity';
import { Message } from '../entities/message.entity';
import { Building } from '../entities/building.entity';

import 'dotenv/config';
import { Place } from '../entities/place.entity';
import { CommunityPost } from '../entities/community.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Ride, RideRequest, Rating, Message, Building,Place,CommunityPost],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
