// src/entities/user.entity.ts
import { Entity, Column, Index, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Ride } from "./ride.entity";
import { Rating } from "./rating.entity";
import { Message } from "./message.entity";
import { RideRequest } from "./ride-request.entity";

@Entity("users")
export class User extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: "work_building", length: 100 })
  workBuilding: string;

  @Column({ length: 100, nullable: true })
  company?: string;
  
  @Column({ length: 100, nullable: true })
  designation?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ type: "float", default: 0 })
  rating: number;

  @Column({ name: "is_driver", default: false })
  isDriver: boolean;

  @Column({ name: "is_admin", default: false })
  isAdmin: boolean;

  @Column({ name: "vehicle_info", type: "jsonb", nullable: true })
  vehicleInfo?: {
    type: string;
    model: string;
    licensePlate: string;
    capacity: number;
  };

  @OneToMany(() => Ride, (ride) => ride.driver)
  rides: Ride[];

  @OneToMany(() => Rating, (rating) => rating.ratedUser)
  ratingsReceived: Rating[];

  @OneToMany(() => Rating, (rating) => rating.rater)
  ratingsGiven: Rating[];

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];
  @OneToMany(() => RideRequest, (request) => request.passenger)
  rideRequests: RideRequest[];
}
