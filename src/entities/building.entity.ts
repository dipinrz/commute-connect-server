// src/entities/building.entity.ts
import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('buildings')
export class Building extends BaseEntity {
  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 100 })
  address: string;

  @Column({ type: 'point', nullable: true })
  @Index({ spatial: true })
  location?: string;

  @Column({ type: 'jsonb', nullable: true })
  amenities?: {
    parking: boolean;
    cafeteria: boolean;
    security: boolean;
  };

  @Column({ name: 'contact_email', length: 100, nullable: true })
  contactEmail?: string;

  @Column({ name: 'contact_phone', length: 20, nullable: true })
  contactPhone?: string;
}