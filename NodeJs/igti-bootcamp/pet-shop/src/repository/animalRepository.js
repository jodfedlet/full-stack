import Animal from "../models/animalModel.js";


const AnimalRepository = {

    async createAnimal(animal){
        try {
            logger.info(`[AnimalRepository] - createAnimal - Request => ${JSON.stringify(animal)}`)
           return await Animal.create(animal);
        } catch (error) {
            logger.error(`[AnimalRepository] - createAnimal - Error => ${error}`)
            throw error;
        }
    },

    async update(id, animal){
        try {
            logger.info(`[AnimalRepository] - update - Params => ${id}`)
            logger.info(`[AnimalRepository] - update - Request => ${JSON.stringify(animal)}`)
           return await Animal.update(animal, {
                    where: { proprietario_id: id}
           } );
        } catch (error) {
            logger.error(`[AnimalRepository] - update - Error => ${error}`)
            throw error;
        }
    },

    async getAll(){
        try {
            logger.info(`[AnimalRepository] - getAll - Request`) 
           return await Animal.findAll();
        } catch (error) {
            logger.error(`[AnimalRepository] - getAll - Error => ${error}`)
            throw error;
        }
    },

    async find(id){
        try {
           logger.info(`[AnimalRepository] - find - Params => ${id}`)
           return await Animal.findOne({ where: { proprietario_id: id}});
        } catch (error) {
            logger.error(`[AnimalRepository] - find - Error => ${error}`)
            throw error;
        }
    },

    async delete(id){
        try {
            logger.info(`[AnimalRepository] - delete - Params => ${id}`) 
           return await Animal.destroy({ where: { proprietario_id: id}});
        } catch (error) {
            logger.error(`[AnimalRepository] - delete - Error => ${error}`)
            throw error;
        }
    }
}

export default AnimalRepository;