"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const newsService_1 = require("../services/newsService");
const resolvers = {
    newsList: () => __awaiter(void 0, void 0, void 0, function* () { return yield newsService_1.default.get(); }),
    newsGetById: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield newsService_1.default.getById(args.id);
    }),
    addNews: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield newsService_1.default.create(args.input);
    }),
    deleteNews: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield newsService_1.default.delete(args.id);
    }),
    updateNews: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield newsService_1.default.update(args.input.id, args.input);
    }),
};
exports.default = resolvers;
