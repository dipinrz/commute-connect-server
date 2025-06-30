// src/entities/ride.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { RideRequest } from "./ride-request.entity";

export enum RideStatus {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

@Entity("rides")
export class Ride extends BaseEntity {
  @ManyToOne(() => User, (user) => user.rides)
  @JoinColumn({ name: "driver_id" })
  driver: User;

  @Column({ name: "train_number", length: 50 })
  trainNumber: string;

  @Column({ name: "departure_station", length: 100 })
  departureStation: string;

  @Column({ name: "arrival_station", length: 100 })
  arrivalStation: string;

  @Column({ name: "departure_time", type: "timestamptz" })
  departureTime: Date;

  @Column({ name: "available_seats" })
  availableSeats: number;

  @Column({ name: "vehicle_information" })
  vehicleInformation: string;

  @Column({ name: "route_details", nullable: true })
  routeDetails: string;

  @Column({ name: "additional_details", nullable: true })
  additionalDetails: string;

  @Column({
    type: "enum",
    enum: RideStatus,
    default: RideStatus.PENDING,
  })
  status: RideStatus;

  @Column({ type: "jsonb", nullable: true })
  route?: {
    coordinates: [number, number][];
    polyline: string;
  };

@OneToMany(() => RideRequest, (request) => request.ride)
requests: RideRequest[];
}
