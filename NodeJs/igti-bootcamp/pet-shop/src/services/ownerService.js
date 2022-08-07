import OwnerRepository from "../repository/ownerRepository.js";

const OwnerService  = {
    async createOwner(owner){
        logger.info(`[OwnerService] - createOwner - Request => ${JSON.stringify(owner)}`)
        return await OwnerRepository.createOwner(owner);
    },

    async update(id, owner){
        logger.info(`[OwnerService] - update - Request => ${JSON.stringify(owner)}`)
        logger.info(`[OwnerService] - update - Params => ${JSON.stringify(id)}`)
        return await OwnerRepository.update(id, owner);
    },

    async getAll(){
        logger.info(`[OwnerService] - getAll - Request`)
        return await OwnerRepository.getAll();
    },

    async find(id){
        logger.info(`[OwnerService] - find - Params => ${JSON.stringify(id)}`)
        return await OwnerRepository.find(id);
    },

    async delete(id){
        logger.info(`[OwnerService] - delete - Params => ${JSON.stringify(id)}`)
        return await OwnerRepository.delete(id);
    },

}

export default OwnerService;