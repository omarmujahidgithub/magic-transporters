import mongoose, { Document, Schema } from 'mongoose';

/**
 * @interface IMagicItem
 * @extends {Document}
 */
export interface IMagicItem extends Document {
  name: string;
  weight: number;
}

/**
 * @const {Schema}
 */
const MagicItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
});

export default mongoose.model<IMagicItem>('MagicItem', MagicItemSchema);
