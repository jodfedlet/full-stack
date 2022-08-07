import * as express from 'express';
import path from 'path';
import AnimalController from '../controllers/animalController.js';

const router = express.Router();

router.get('/', AnimalController.getAll)
router.post('/', AnimalController.createAnimal)
router.get('/:id', AnimalController.find)
router.put('/:id', AnimalController.update)
router.delete('/:id', AnimalController.delete)

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);    
    res.status(400).send({ error: err.message });    
});

export default router;