import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String, 
  email: String,
  password: String,
  role :{type:String,default:"user"},
  date: { type: Date, default: Date.now },
});
export const User = mongoose.model('User', userSchema);
