import express from "express";
import { User } from "../../../models/index.js";
import UserSerializer from "../../../serializers/UserSerializer.js";
import uploadImage from '../../../services/uploadImage.js'

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

usersRouter.post('/profile', uploadImage.single('image'), async (req, res) => {
  try{
    const { body } = req
    const newBody = {...body}
    newBody.image = req.file?.location
    const user = await User.query().findById(req.user.id)
    const patch = await user.$query().patchAndFetch(newBody)
    return res.status(201).json({ userInfo: patch})
  }catch(error){
    console.log(error)
    return res.status(500).json({ error })
  }
})



export default usersRouter;
