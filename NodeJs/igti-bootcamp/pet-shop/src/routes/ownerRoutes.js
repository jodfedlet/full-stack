import * as express from 'express';
import OwnerController from '../controllers/ownerController.js'

const router = express.Router();

router.get('/', OwnerController.getAll)
router.post('/', OwnerController.createOwner)
router.get('/:id', OwnerController.find)
router.put('/:id', OwnerController.update)
router.delete('/:id', OwnerController.delete)

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);    
    res.status(400).send({ error: err.message });    
});

export default router;