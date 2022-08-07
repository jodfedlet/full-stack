import AnimalService from "../services/animalService.js";

const AnimalController = {
  async createAnimal(req, res, next) {
    try {
      logger.info(
        `[AnimalController] - createAnimal - Request => ${JSON.stringify(
          req.body
        )}`
      );
      await AnimalService.createAnimal(req.body);
      return res.status(201).json({ message: "Animal criado com sucesso" });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res) {
    try {
      logger.info(
        `[AnimalController] - update - Request => ${JSON.stringify(req.body)}`
      );
      logger.info(
        `[AnimalController] - update - Params => ${JSON.stringify(
          req.params.id
        )}`
      );
      await AnimalService.update(req.params.id, req.body);
      return res.status(201).json({ message: "Animal atualizado com sucesso" });
    } catch (error) {
      next(err);
    }
  },

  async getAll(req, res) {
    try {
      logger.info(`[AnimalController] - getAll - Params => {}`);
      const result = await AnimalService.getAll();
      res.status(200).json(result);
    } catch (error) {
      next(err);
    }
  },

  async find(req, res) {
    try {
      logger.info(
        `[AnimalController] - find - Params => ${JSON.stringify(req.params.id)}`
      );
      const result = await AnimalService.find(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      next(err);
    }
  },

  async delete(req, res) {
    try {
      logger.info(
        `[AnimalController] - delete => ${JSON.stringify(req.params.id)}`
      );
      await AnimalService.delete(req.params.id);
      return res.status(200).json({ message: "Animal removido com sucesso" });
    } catch (error) {
      next(err);
    }
  },
};

export default AnimalController;
