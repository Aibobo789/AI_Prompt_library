import {Schema, model, models} from 'mongoose'

const UserSchema = new Schema({
    email:{
        type: String,
        unique:[true, 'Email is already existing'],
        required:[true, 'Email is required']
    },
    username:{
        type: String,
        required:[true, 'Username is required'],
        match: [/^[a-zA-Z0-9_-]{4,20}$/,"username invalid"]
    },
    image:{
        type:String,
    }
});

const User = models.User || model('User',UserSchema);

export default User;