import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./src/entity/User";
import config from "./config";
import { Item } from "./src/entity/Item";
import { Category } from "./src/entity/Category";

const AppDataSource = new DataSource({
    type: "postgres",
    host: config.host,
    port: 5432,
    username: config.username,
    password: config.password,
    database: config.database,
    entities: [User, Category, Item],
    synchronize: true,
    logging: false,
})

export default AppDataSource;