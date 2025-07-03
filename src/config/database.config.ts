import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Ride } from '../entities/ride.entity';
import { RideRequest } from '../entities/ride-request.entity';
import { Rating } from '../entities/rating.entity';
import { Message } from '../entities/message.entity';
import { Building } from '../entities/building.entity';
import { Place } from '../entities/place.entity';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'ep-restless-bread-a81ewa3a-pooler.eastus2.azure.neon.tech', // From connection string
  port: 5432,
  username: 'neondb_owner', // From connection string
  password: 'npg_foK4SZ9VzsTg', // From connection string
  database: 'neondb', // From connection string
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Ride, RideRequest, Rating, Message, Building, Place],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
  ssl: true, // Required for Neon.tech
  extra: {
    ssl: {
      rejectUnauthorized: false, // For self-signed certificates (Neon uses Let's Encrypt)
    },
  },
});