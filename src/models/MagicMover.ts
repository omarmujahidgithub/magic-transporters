import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface representing a Magic Mover document in MongoDB.
 * @interface IMagicMover
 * @extends {Document}
 */
export interface IMagicMover extends Document {
  weight_limit: number;
  quest_state: 'resting' | 'loading' | 'on-mission';
  items: mongoose.Types.ObjectId[];
  missions_completed: number;
}
/**
 * Mongoose schema for the Magic Mover model.
 * @const {Schema}
 */
const MagicMoverSchema: Schema = new Schema({
  weight_limit: { type: Number, required: true },
  quest_state: { type: String, enum: ['resting', 'loading', 'on-mission'], required: true },
  items: [{ type: mongoose.Types.ObjectId, ref: 'MagicItem' }],
  missions_completed: { type: Number, default: 0 },
});

export default mongoose.model<IMagicMover>('MagicMover', MagicMoverSchema);
