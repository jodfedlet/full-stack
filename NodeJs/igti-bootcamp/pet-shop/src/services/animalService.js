import AnimalRepository from "../repository/animalRepository.js";

const AnimalService  = {
    async createAnimal(animal){
        logger.info(`[AnimalService] - createAnimal - Request => ${JSON.stringify(animal)}`)
        return await AnimalRepository.createAnimal(animal);
    },

    async update(id, animal){
        logger.info(`[AnimalService] - update - Request => ${JSON.stringify(animal)}`)
        logger.info(`[AnimalService] - update - Params => ${JSON.stringify(id)}`)
        return await AnimalRepository.update(id, animal);
    },

    async getAll(){
        logger.info(`[AnimalService] - getAll - Request`)
        return await AnimalRepository.getAll();
    },

    async find(id){
        logger.info(`[AnimalService] - find - Params => ${JSON.stringify(id)}`)
        return await AnimalRepository.find(id);
    },

    async delete(id){
        logger.info(`[AnimalService] - delete - Params => ${JSON.stringify(id)}`)
        return await AnimalRepository.delete(id);
    },

}

export default AnimalService;