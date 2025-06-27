// src/entities/rating.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('ratings')
export class Rating extends BaseEntity {
  @ManyToOne(() => User, (user) => user.ratingsGiven)
  @JoinColumn({ name: 'rater_id' })
  rater: User;

  @ManyToOne(() => User, (user) => user.ratingsReceived)
  @JoinColumn({ name: 'rated_user_id' })
  ratedUser: User;

  @Column({ type: 'float' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment?: string;

  @Column({ name: 'ride_id', nullable: true })
  rideId?: string;
}