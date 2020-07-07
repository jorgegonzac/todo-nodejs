import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

export interface IAccount extends Document {
    email: string;
    password: string;
}

const AccountSchema: Schema = new Schema({
    email: { type: String, required:true },
    password: { type: String, required:true },
});

AccountSchema.pre('save', function(next) {
    var account = this;

    // only hash the password if it has been modified (or is new)
    if (!account.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(account.get('password'), salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            account.set('password', hash);
            next();
        });
    });
});


export default mongoose.model<IAccount>('Account', AccountSchema);
