import { Category } from "./src/entity/Category";
import AppDataSource from "./data-source";

const seedCategories = async () => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);

    const categories = [
      "גבינות",
      "ירקות ופירות",
      "מוצרי ניקיון",
      "מאפים",
      "בשר ודגים",
    ];

    for (const categoryName of categories) {
      let category = await categoryRepository.findOne({ where: { name: categoryName } });

      if (!category) {
        category = categoryRepository.create({ name: categoryName });
        await categoryRepository.save(category);
        console.log(`Category "${categoryName}" saved.`);
      } else {
        console.log(`Category "${categoryName}" already exists.`);
      }
    }
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
};

export default seedCategories;