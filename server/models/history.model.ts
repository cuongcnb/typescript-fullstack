import { Document, Schema, Model, model} from "mongoose";

export interface IHistory extends Document {
    _id: string;
    user_id:string;
    name: string;
    gender: string;
    phone: string;
    email: string;
    location: string;
    birthday: string;
    phone_status: number; // 0. Đúng, 1. Sai
    source: string; // ID nguồn scan
    created_date?: Date;
    updated_date?: Date;
}

export const HistorySchema = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    gender: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    location: {
        type: String
    },
    birthday: {
        type: String
    },
    phone_status: {
        type: Number
    },
    source: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

const History = model<IHistory>('history', HistorySchema);
export default History;