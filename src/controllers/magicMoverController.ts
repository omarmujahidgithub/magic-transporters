import { Request, Response } from 'express';
import MagicMover from '../models/MagicMover';
import Log from '../models/Log';
import MagicItem from '../models/MagicItem';

/**
 * Add a new Magic Mover.
 * @param {Request} req 
 * @param {Response} res
 */
export const addMagicMover = async (req: Request, res: Response) => {
  const { weight_limit, quest_state } = req.body;
  try {
    const newMover = new MagicMover({ weight_limit, quest_state });
    await newMover.save();
    res.status(201).json(newMover);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

/**
 * Start Loading a Magic Mover.
 * @param {Request} req 
 * @param {Response} res
 */
export const startLoading = async (req: Request, res: Response) => {
  const { moverId } = req.body;
  try {
    const mover = await MagicMover.findById(moverId);
    if (!mover) {
      return res.status(404).json({ error: 'Magic Mover not found' });
    }
    if (mover.quest_state !== 'resting') {
      return res.status(400).json({ error: 'Magic Mover must be in resting state to start loading' });
    }

    mover.quest_state = 'loading';
    await mover.save();

    res.status(200).json(mover);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};


/**
 * Load a Magic Mover with items.
 * @param {Request} req 
 * @param {Response} res 
 */
export const loadMagicMover = async (req: Request, res: Response) => {
  const { moverId, items } = req.body;
  try {
    const mover = await MagicMover.findById(moverId);
    if (!mover) {
      return res.status(404).json({ error: 'Magic Mover not found' });
    }
    if (mover.quest_state !== 'loading') {
      return res.status(400).json({ error: 'Magic Mover is not in loading state' });
    }
    
    const totalWeight = (await MagicItem.find({ _id: { $in: items } })).reduce((sum, item) => sum + item.weight, 0);
    if (totalWeight > mover.weight_limit) {
      return res.status(400).json({ error: 'Exceeds weight limit' });
    }

    mover.items.push(...items);
    await mover.save();

    const log = new Log({ mover_id: mover._id, action: 'loading', items });
    await log.save();

    res.status(200).json(mover);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};


/**
 * Start a mission for a Magic Mover.
 * @param {Request} req
 * @param {Response} res
 */
export const startMission = async (req: Request, res: Response) => {
  const { moverId } = req.body;
  try {
    const mover = await MagicMover.findById(moverId);
    if (!mover) {
      return res.status(404).json({ error: 'Magic Mover not found' });
    }
    if (mover.quest_state !== 'loading') {
      return res.status(400).json({ error: 'Magic Mover is not in loading state' });
    }

    mover.quest_state = 'on-mission';
    await mover.save();

    const log = new Log({ mover_id: mover._id, action: 'on-mission', items: mover.items });
    await log.save();

    res.status(200).json(mover);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

/**
 * End a mission for a Magic Mover.
 * @param {Request} req 
 * @param {Response} res 
 */
export const endMission = async (req: Request, res: Response) => {
  const { moverId } = req.body;
  try {
    const mover = await MagicMover.findById(moverId);
    if (!mover) {
      return res.status(404).json({ error: 'Magic Mover not found' });
    }
    if (mover.quest_state !== 'on-mission') {
      return res.status(400).json({ error: 'Magic Mover is not on a mission' });
    }

    mover.quest_state = 'resting';
    mover.missions_completed += 1;
    mover.items = [];
    await mover.save();

    const log = new Log({ mover_id: mover._id, action: 'resting', items: [] });
    await log.save();

    res.status(200).json(mover);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

/**
 * List Magic Movers who completed the most missions.
 * @param {Request} req 
 * @param {Response} res 
 */
export const listTopMovers = async (req: Request, res: Response) => {
  try {
    const movers = await MagicMover.find().sort({ missions_completed: -1 });
    res.status(200).json(movers);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
