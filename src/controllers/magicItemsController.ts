import { Request, Response } from 'express';
import MagicItem from '../models/MagicItem';
/**
 * Add a new Magic Item.
 * @param {Request} req 
 * @param {Response} res 
 */

export const addMagicItem = async (req: Request, res: Response) => {
  const { name, weight } = req.body;
  try {
    const newItem = new MagicItem({ name, weight });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    if(err instanceof Error)
    res.status(500).json({ error: err.message });
  }
};
