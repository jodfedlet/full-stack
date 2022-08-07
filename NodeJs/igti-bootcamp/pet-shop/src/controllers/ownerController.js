import OwnerService from "../services/ownerService.js";

const OwnerController = {
  async createOwner(req, res) {
    try {
      logger.info(
        `[OwnerController] - createOwner - Request => ${JSON.stringify(
          req.body
        )}`
      );
      await OwnerService.createOwner(req.body);
      return res.status(201).json({ message: "Owner atualizado com sucesso" });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res) {
    try {
      logger.info(
        `[OwnerController] - update - Request => ${JSON.stringify(req.body)}`
      );
      logger.info(
        `[OwnerController] - update - Params => ${JSON.stringify(
          req.params.id
        )}`
      );
      await OwnerService.update(req.params.id, req.body);
      return res.status(200).json({ message: "Owner atualizado com sucesso" });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res) {
    try {
      logger.info(`[OwnerController] - getAll - Request `);

      const result = await OwnerService.getAll();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async find(req, res) {
    try {
      logger.info(
        `[OwnerController] - find - Params => ${JSON.stringify(req.params.id)}`
      );
      const result = await OwnerService.find(req.params.id);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res) {
    try {
      logger.info(
        `[OwnerController] - delete => ${JSON.stringify(req.params.id)}`
      );
      await OwnerService.delete(req.params.id);
      return res.status(200).json({ message: "Owner removido com sucesso" });
    } catch (err) {
      next(err);
    }
  },
};

export default OwnerController;
