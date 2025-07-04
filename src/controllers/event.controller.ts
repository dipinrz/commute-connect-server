import { Request, Response } from 'express';
import { EventService } from '../services/event.service';

const eventService = new EventService();

export class EventController {
  static async create(req: any, res: any) {
    try {
      const event = await eventService.createEvent(req.body);
      return res.status(201).json({ success: true, data: event });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }


static async getAllEvents  (req: any, res: any)  {
  try {
    const { type } = req.query;
    const events = await eventService.getAllEvents(type as string);
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch events' });
  }
};

  static async getById(req: any, res: any) {
    try {
      const event = await eventService.getEventById(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      return res.json({ success: true, data: event });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  static async filterByType(req: any, res: any) {
    try {
      const { type } = req.query;
      const events = await eventService.filterByType(type as any);
      return res.json({ success: true, data: events });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  static async filterByTag(req: any, res: any) {
    try {
      const { tag } = req.query;
      const events = await eventService.filterByTag(tag as string);
      return res.json({ success: true, data: events });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  static async update(req: any, res: any) {
    try {
      const event = await eventService.updateEvent(req.params.id, req.body);
      return res.json({ success: true, data: event });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  static async delete(req: any, res: any) {
    try {
      await eventService.deleteEvent(req.params.id);
      return res.json({ success: true, message: 'Event deleted' });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
}
