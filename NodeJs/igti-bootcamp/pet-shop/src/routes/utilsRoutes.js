import * as express from 'express';
import * as fs from 'fs';

const { name, version } = JSON.parse(fs.readFileSync('./package.json'));

const router = express.Router();

router.get(['/version', '/pet-shop-api/version'], (req, res) => {
    res.status(200).json({ name, version });
});

router.get('/healthcheck', (req, res) => {
    return res.status(200).json({ status: 'UP' });
});

export default router;