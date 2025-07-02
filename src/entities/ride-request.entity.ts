// // src/entities/ride-request.entity.ts
// import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';
// import { BaseEntity } from './base.entity';
// import { User } from './user.entity';
// import { Ride } from './ride.entity';

// export enum RequestStatus {
//   PENDING = 'pending',
//   ACCEPTED = 'accepted',
//   REJECTED = 'rejected',
//   CANCELLED = 'cancelled',
//   COMPLETED = 'completed'
// }

// @Entity('ride_requests')
// export class RideRequest extends BaseEntity {
//   @ManyToOne(() => User, (user) => user.rideRequests)
//   @JoinColumn({ name: 'passenger_id' })
//   passenger: User;

//   @ManyToOne(() => Ride, (ride) => ride.requests)
//   @JoinColumn({ name: 'ride_id' })
//   ride: Ride;

//   @Column({
//     type: 'enum',
//     enum: RequestStatus,
//     default: RequestStatus.PENDING
//   })
//   status: RequestStatus;

//   @Column({ name: 'train_number', length: 50 })
//   trainNumber: string;

//   @Column({ name: 'arrival_time' })
//   arrivalTime: Date;

//   @Column({ name: 'from_station', length: 100 })
//   fromStation: string;

//   @Column({ name: 'to_location', length: 100 })
//   toLocation: string;

//   @Column({ name: 'max_wait_time', type: 'smallint' })
//   maxWaitTime: number; // in minutes

//   @Column({ type: 'text', nullable: true })
//   notes?: string;

//   @Column({ name: 'pickup_location', length: 255 })
//   pickupLocation: string;

//   @Column({ name: 'dropoff_location', length: 255 })
//   dropoffLocation: string;
// }

// src/entities/ride-request.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Ride } from './ride.entity';

export enum RequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

@Entity('ride_requests')
export class RideRequest extends BaseEntity {
  @ManyToOne(() => User, (user) => user.rideRequests, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'passenger_id' })
  @Index()
  passenger: User;

  @ManyToOne(() => Ride, (ride) => ride.requests, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'ride_id' })
  @Index()
  ride: Ride;

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.PENDING,
  })
  status: RequestStatus;

  @Column({ name: 'train_number', type: 'varchar', length: 50 })
  trainNumber: string;

  @Column({ name: 'arrival_time', type: 'timestamp' })
  arrivalTime: Date;

  @Column({ name: 'from_station', type: 'varchar', length: 100 })
  fromStation: string;

  @Column({ name: 'to_location', type: 'varchar', length: 100 })
  toLocation: string;

  @Column({ name: 'max_wait_time', type: 'smallint' })
  maxWaitTime: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ name: 'pickup_location', type: 'varchar', length: 255 })
  pickupLocation: string;

  @Column({ name: 'dropoff_location', type: 'varchar', length: 255 })
  dropoffLocation: string;
}
