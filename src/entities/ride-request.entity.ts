// src/entities/ride-request.entity.ts
import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Ride } from './ride.entity';

export enum RequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

@Entity('ride_requests')
export class RideRequest extends BaseEntity {
  @ManyToOne(() => User, (user) => user.rides)
  @JoinColumn({ name: 'passenger_id' })
  passenger: User;

  @ManyToOne(() => Ride, (ride) => ride.requests)
  @JoinColumn({ name: 'ride_id' })
  ride: Ride;

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.PENDING,
  })
  status: RequestStatus;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ name: 'pickup_location', length: 255 })
  pickupLocation: string;

  @Column({ name: 'dropoff_location', length: 255 })
  dropoffLocation: string;
}