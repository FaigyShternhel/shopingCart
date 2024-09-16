import { Request, Response } from "express";
import { Item } from "../entity/Item";
import { Category } from "../entity/Category";
import AppDataSource from "../../data-source";

export const addItem = async (req: Request, res: Response) => {
  try {
    const { name, category, quantity } = req.body;
    const itemRepository = AppDataSource.getRepository(Item);
    const categoryRepository = AppDataSource.getRepository(Category);

    const existingItem = await itemRepository.findOne({
      where: { name },
      relations: ["category"]
    });

    let item;

    if (existingItem && existingItem.category.name === category.name) {
      existingItem.quantity += quantity;
      item = await itemRepository.save(existingItem);
    } else {
      const categoryEntity = await categoryRepository.findOne({ where: { name: category.name } });

      if (!categoryEntity) {
        return res.status(404).send({ message: "Category not found" });
      }

      item = await itemRepository.save({
        name,
        quantity,
        category: categoryEntity,
      });
    }

    res.status(201).send(item);
  } catch (error) {
    res.status(500).send({ message: "Failed to add item" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);
    const categories = await categoryRepository.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch categories" });
  }
};

export const getItems = async (req: Request, res: Response) => {
  try {
    const itemRepository = AppDataSource.getRepository(Item);
    const items = await itemRepository.find({ relations: ["category"] });
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch items" });
  }
};

export const checkout = async (req: Request, res: Response) => {
    try {
      const { items } = req.body;
      const itemRepository = AppDataSource.getRepository(Item);
  
      for (const cartItem of items) {
        const { name, category, quantity } = cartItem;
        let existingItem = await itemRepository.findOne({ where: { name }, relations: ["category"] });
  
        if (existingItem && existingItem.category.name === category.name) {
          existingItem.quantity += quantity;
          await itemRepository.save(existingItem);
        } else {
          const categoryRepository = AppDataSource.getRepository(Category);
          const categoryEntity = await categoryRepository.findOne({ where: { name: category.name } });
  
          if (categoryEntity) {
            const newItem = itemRepository.create({
              name,
              quantity,
              category: categoryEntity,
            });
            await itemRepository.save(newItem);
          }
        }
      }
  
      res.status(200).send({ message: "Checkout successful" });
    } catch (error) {
      res.status(500).send({ message: "Failed to complete checkout" });
    }
  };