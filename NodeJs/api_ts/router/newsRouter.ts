import * as express from 'express';
import NewsController from '../controllers/newsController';

const newRouter = express.Router();

newRouter.route('/api/v1/news').get(NewsController.get)
newRouter.route('/api/v1/news/:id').get(NewsController.getById)
newRouter.route('/api/v1/news').post(NewsController.create)
newRouter.route('/api/v1/news/:id').put(NewsController.update)
newRouter.route('/api/v1/news/:id').delete(NewsController.delete)
newRouter.route('/api/v1/news/export/tocsv').get(NewsController.exportToCsv)
newRouter.route('/api/v1/news/search/:term').get(NewsController.search)

export default newRouter;