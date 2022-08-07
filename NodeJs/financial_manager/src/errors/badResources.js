module.exports = function BadResources(message = 'Este recurso não pertence ao usuário') {
    this.name = 'BadResourcesError';
    this.message = message;
};
