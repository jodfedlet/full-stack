import { DataTypes, Sequelize } from "sequelize";

import connection from "../databases/connection.js";
import Owner from "./ownerModel.js";

const Animal =  connection.define('animais', {
   animal_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    nome: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    tipo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

});

Animal.belongsTo(Owner, { foreignKey: 'proprietario_id'});

export default Animal;