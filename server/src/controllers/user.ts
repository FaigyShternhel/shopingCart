import { User } from "../entity/User";
import AppDataSource from "../../data-source";
import { Request, Response } from "express";

export const addUser = async (req: Request, res: Response) => {  
  try {
    const user = req.body;
    const userRepository = AppDataSource.getRepository(User);

    const signedUser = await userRepository.save(user);

    res.status(201).send(signedUser);
  } catch (error) {
    res.status(500).send({ message: "Failed to add user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { firstName, personalId } = req.body;
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
      where: {
        firstName,
        personalId,
      },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
};