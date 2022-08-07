import Owner from "../models/ownerModel.js";


const OwnerRepository = {

    async createOwner(owner){
        try {
            logger.info(`[OwnerRepository] - createOwner - Request => ${JSON.stringify(owner)}`)
           return await Owner.create(owner);
        } catch (error) {
            logger.error(`[OwnerRepository] - createOwner - Error => ${error}`)
            throw error;
        }
    },

    async update(id, owner){
        try {
            logger.info(`[OwnerRepository] - update - Params => ${id}`)
            logger.info(`[OwnerRepository] - update - Request => ${JSON.stringify(owner)}`)
           return await Owner.update(owner, {
                    where: { proprietario_id: id}
           } );
        } catch (error) {
            logger.error(`[OwnerRepository] - update - Error => ${error}`)
            throw error;
        }
    },

    async getAll(){
        try {
            logger.info(`[OwnerRepository] - getAll - Request`) 
           return await Owner.findAll();
        } catch (error) {
            logger.error(`[OwnerRepository] - getAll - Error => ${error}`)
            throw error;
        }
    },

    async find(id){
        try {
           logger.info(`[OwnerRepository] - find - Params => ${id}`)
           return await Owner.findOne({ where: { proprietario_id: id}});
        } catch (error) {
            logger.error(`[OwnerRepository] - find - Error => ${error}`)
            throw error;
        }
    },

    async delete(id){
        try {
            logger.info(`[OwnerRepository] - delete - Params => ${id}`) 
           return await Owner.destroy({ where: { proprietario_id: id}});
        } catch (error) {
            logger.error(`[OwnerRepository] - delete - Error => ${error}`)
            throw error;
        }
    }
}

export default OwnerRepository;