import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "postgres://zdmfljue:4hAPq9G1ImZmF16RuDSlQPLhtTQTVrRo@castor.db.elephantsql.com/zdmfljue",
    {
        dialect: 'postgres',
        define: {
            timestamps: false,
        }
    }
  );

  export default sequelize;