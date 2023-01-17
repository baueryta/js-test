// Sequelize einbinden
import { Sequelize, DataTypes } from "sequelize";
import {dirname} from "path";
import { fileURLToPath } from "url";

const storePath = dirname(fileURLToPath(import.meta.url)) + "./../database.sqlite";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: storePath
});

let Question = sequelize.define("questions", { 
    name: {
            allowNull:  false,
            type:       DataTypes.STRING
            },
    answer: { type:       DataTypes.STRING }
    
});

export default {
    sequelize: sequelize,
    Question: Question
};