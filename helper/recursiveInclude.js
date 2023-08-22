const modelCheck = require('../middlewares/modelCheck.middleware');

async function recursiveInclude(array) {
    try {
        array.map(async (data) => {
            const modelName = modelCheck(data.model)
            if (typeof modelName === 'object') return modelName
            data.model = modelName

            if (data.include) {
                await recursiveInclude(data.include)
            }
        })
    } catch (error) {
        return error.message
    }
}

module.exports = recursiveInclude