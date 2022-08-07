import NewsRepository from "../repository/newsRepository";

class NewsService {

    async get(){
        return await NewsRepository.find({}, 'title hat img, publishDate').sort({ publishDate: 1}).limit(20)
    }

    async getById(_id){
        return await NewsRepository.findById(_id)
    }

    async create(news){
        return await NewsRepository.create(news)
    }

    async update(_id, news){
        return await NewsRepository.findByIdAndUpdate(_id, news)
    }

    async delete(_id){
        return await NewsRepository.findByIdAndRemove(_id)
    }

    async search(term, page, perpage){
        return await NewsRepository.find({'title' : new RegExp('.*'+term+'*.','i')})
        .skip((page - 1) * perpage)
        .limit(perpage);
    }

}

export default new NewsService();