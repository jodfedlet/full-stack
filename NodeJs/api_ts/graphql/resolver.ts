import NewsService from "../services/newsService";

const resolvers = {
    newsList: async () => await NewsService.get(),

    newsGetById: async (args) => {
        return await NewsService.getById(args.id);
    },

    addNews: async (args) => {
        return await NewsService.create(args.input);
    },

    deleteNews: async (args) => {
        return await NewsService.delete(args.id);
    },

    updateNews: async (args) => {
        return await NewsService.update(args.input.id, args.input);
    },

}

export default resolvers;