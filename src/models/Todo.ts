import mongoose, { Document, Schema } from 'mongoose';
export interface ITodo extends Document {
    description: string;
    isDone: boolean;
}

const TodoSchema: Schema = new Schema({
    description: { type: String, required:true },
    isDone: { type: Boolean, required: true }
});

export default mongoose.model<ITodo>('Todo', TodoSchema);
