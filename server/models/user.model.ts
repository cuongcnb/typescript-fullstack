import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    _id: string;
    name: string;
    gender: string;
    phone: string;
    created_date?: Date;
}

export const UserSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: 'Enter a name'
    },
    gender: {
        type: String
    },
    phone: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', UserSchema);
export default User;