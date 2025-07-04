import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  organizer: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  time: string;

  @Column()
  location: string;

  @Column({ type: 'int', default: 0 })
  attendees: number;

  @Column({ type: 'int' })
  maxAttendees: number;

  @Column({
    type: 'enum',
    enum: [
      'social',
      'professional',
      'entertainment',
      'wellness',
      'sports',
      'volunteering',
      'workshop',
      'celebration',
      'hackathon',
      'webinar',
    ],
    default: 'social',
  })
  type:
    | 'social'
    | 'professional'
    | 'entertainment'
    | 'wellness'
    | 'sports'
    | 'volunteering'
    | 'workshop'
    | 'celebration'
    | 'hackathon'
    | 'webinar';

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column({ nullable: true })
  image: string; // can be emoji, URL, or null

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
