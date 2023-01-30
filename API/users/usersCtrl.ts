import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "./userModel";
const saltRounds = 10;

export async function register(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("No E-mail and Password from client on FUNCTION register in file userCtrl");// ne poluchili email and password // eto potom ubiraem s production posle proverok

    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)

    const userDB = new UserModel({ email: email, password: hash });
    await userDB.save();
    if (!userDB) throw new Error("No user was created");

    res.send({ success: true, userDB });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
}

export async function login(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;

    const userDB = await UserModel.findOne({ email })
    if (!userDB) throw new Error("Email do not match");

    const isMatch = await bcrypt.compare(password, userDB.password!)
    if (!isMatch) throw new Error("Email and Password do not match");

    res.send({ success: true, userDB: userDB });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
}

export async function updateUserByID(req: express.Request, res: express.Response) {
  try {

    const email = req.params.email;
    const findUser = await UserModel.findOne({ email })
    if (!findUser) throw new Error("Email do not match");

    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(req.body.password, salt)

    //const userDB = new UserModel({ email: email, password: hash });
    const userDB = await UserModel.findByIdAndUpdate(findUser,  { password: hash} );
    res.send({ success: true, userDB: userDB });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
}

export async function deleteUserByID(req: express.Request, res: express.Response) {
  try {
    const email = req.params.email;
    const findUser = await UserModel.findOne({ email })
    if (!findUser) throw new Error("Email do not match");

    const userDB = await UserModel.findByIdAndDelete(findUser);
    res.send({ success: true, userDB: userDB });

  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
}



