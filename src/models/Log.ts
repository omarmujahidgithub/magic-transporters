import mongoose, { Document, Schema } from 'mongoose';
/**
 * Interface representing a Log document in MongoDB.
 * @interface ILog
 * @extends {Document}
 */
export interface ILog extends Document {
  mover_id: mongoose.Types.ObjectId;
  action: string;
  timestamp: Date;
  items: mongoose.Types.ObjectId[];
}

/**
 * Mongoose schema for the Log model.
 * @const {Schema}
 */
const LogSchema: Schema = new Schema({
  mover_id: { type: mongoose.Types.ObjectId, ref: 'MagicMover', required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  items: [{ type: mongoose.Types.ObjectId, ref: 'MagicItem' }],
});

export default mongoose.model<ILog>('Log', LogSchema);
