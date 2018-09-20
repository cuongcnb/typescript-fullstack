import { Document, Schema, Model, model} from "mongoose";

export interface IBigData extends Document {
    _id: string;
    name: string;
    gender: string;
    phone: string;
    email: string;
    location: string;
    birthday: string;
    created_date?: Date;
    updated_date?: Date;
}

export const BigDataSchema = new Schema({
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
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

const BigData = model<IBigData>('bigdata', BigDataSchema);
export default BigData;