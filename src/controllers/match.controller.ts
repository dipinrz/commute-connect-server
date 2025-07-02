// src/controllers/match.controller.ts
import { Request, Response } from 'express';
import { MatchService } from '../services/match.service';

const matchService = new MatchService();

export const getMatchingRides = async (req: Request, res: Response) => {
  try {
    const requestId = req.query.requestId as string;
    const results = await matchService.findMatchingRides(requestId);
    res.json(results);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
