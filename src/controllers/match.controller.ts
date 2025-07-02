import { Request, Response } from 'express';
import { MatchService } from '../services/match.service';

const matchService = new MatchService();

export const getMatchingRides = async (req: any, res: any) => {
  const requestId = req.query.requestId as string;
  if (!requestId) return res.status(400).json({ error: 'Missing requestId' });

  try {
    const rides = await matchService.findMatchingRides(requestId);
    res.json(rides);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMatchingRequests = async (req: any, res: any) => {
  const rideId = req.query.rideId as string;
  if (!rideId) return res.status(400).json({ error: 'Missing rideId' });

  try {
    const requests = await matchService.findMatchingRequests(rideId);
    res.json(requests);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
