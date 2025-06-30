import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import passwordhash from "password-hash"
import 'dotenv/config'

export const userRegister = async (req, res, next) => {
  try {
    const { email, password,name } = req.body;
    const hash = passwordhash.generate(password)
    const check = await User.findOne({ email: email });
    if (check) {
      res.json({ status: 401, msg: "This email was already registered" });
    }
    const data = new User({ name:name, email:email, password:hash });
    await data.save();
    const id = data._id;
    const token = jwt.sign(
      { name, email, id },
      `${process.env.JWT_SECRET_KEY}`,
      {
        expiresIn: 86400,
      }
    );
    res.json({
      status: 201,
      msg: "Registration successfull",
      token: token,
      user: data,
    });
  } catch (error) {
    next(error);
  }
};
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email: email });
    if (data && passwordhash.verify(password, data.password)) {
      const { email, name, _id } = data;
      const token = jwt.sign(
        { name, email, _id },
        `${process.env.JWT_SECRET_KEY}`,
        {
          expiresIn: 86400,
        }
      );
      res.json({ status: 201, msg: "Login successfull", token: token,user: data });
    } else {
      res.json({ status: 400, msg: "Invalid Credential" });
    }
  } catch (error) {
    next(error);
  }
};

export const nextAuth = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const data = await User.findOne({ email: email });
    if (data) {
      const { email, name, _id } = data;
      const token = jwt.sign(
        { name, email, _id },
        `${process.env.JWT_SECRET_KEY}`,
        {
          expiresIn: 86400,
        }
      );
      res.json({ status: 201, msg: "login successfull", token: token,user:data });
    } else {
      const password = (Math.random() + 1).toString(36).substring(7);
      const hash = passwordhash.generate(password)
      const data = new User({ name:name, email:email, password:hash });
      await data.save();
      const id = data._id;
      const token = jwt.sign(
        { name, email, id },
        `${process.env.JWT_SECRET_KEY}`,
        {
          expiresIn: 86400,
        }
      );
      res.json({
        status: 201,
        msg: "login successfull",
        token: token,
        user: data,
      });
    }
  } catch (error) {
    next(error);
  }
};
