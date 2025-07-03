import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

export type PostType = 'community' | 'ride' | 'adventure';

@Entity('community_posts')
export class CommunityPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.communityPosts, { eager: true, onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'varchar', nullable: true })
  avatar: string | null; // can store emoji or image URL

  @Column({ type: 'varchar', nullable: true })
  designation: string | null; // optional job title

  @Column({ type: 'varchar', nullable: true })
  company: string | null;

  @Column({ name: 'work_building', type: 'varchar', nullable: true })
  workBuilding: string | null;

  @Column({ type: 'enum', enum: ['community', 'ride', 'adventure'], default: 'community' })
  type: PostType;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[]; // e.g. ['carpool', 'tech']

  @CreateDateColumn()
  createdAt: Date;
}
