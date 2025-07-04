import { AppDataSource } from '../config/database.config';
import { Event } from '../entities/event.entity';

export class EventService {
  private eventRepo = AppDataSource.getRepository(Event);

  async createEvent(data: Partial<Event>) {
    const event = this.eventRepo.create(data);
    return await this.eventRepo.save(event);
  }

  async getAllEvents(type?: string) {
    if (type) {
      return await this.eventRepo.find({
        where: { type: type.toLowerCase() as any }, // normalize to lowercase
        order: { date: 'ASC' }
      });
    } else {
      return await this.eventRepo.find({
        order: { date: 'ASC' }
      });
    }
  }

  async getEventById(id: string): Promise<Event | null> {
    return await this.eventRepo.findOneBy({ id });
  }

  async filterByType(type: Event['type']): Promise<Event[]> {
    return await this.eventRepo.find({
      where: { type },
      order: { date: 'ASC', time: 'ASC' },
    });
  }

  async filterByTag(tag: string): Promise<Event[]> {
    const all = await this.eventRepo.find();
    return all.filter((event) => event.tags?.includes(tag));
  }

  async updateEvent(id: string, data: Partial<Event>) {
    await this.eventRepo.update({ id }, data);
    return this.getEventById(id);
  }

  async deleteEvent(id: string) {
    return await this.eventRepo.delete({ id });
  }
}
