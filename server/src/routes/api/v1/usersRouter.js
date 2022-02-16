import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

usersRouter.post('/profile', async (req, res) => {
  // const { name, age, location, blurb, style, grade } = req.body
  // const photoUrl = req.body.profilePhoto.preview
  console.log(req.body)
  try{
    // await User.query().findById(req.user.id).patch({name: })
  }catch(error){
    console.log(error)
    return res.status(500).json({error })
  }
})

export default usersRouter;
