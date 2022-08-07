import { DataTypes, Sequelize } from "sequelize";

import connection from "../databases/connection.js";

const Owner =  connection.define('proprietarios', {
    proprietario_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    nome: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    telefone: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

});

export default Owner;