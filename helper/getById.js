const { Op } = require("sequelize")
const recursiveInclude = require('./recursiveInclude');

async function getByIdData(bodyData, model) {
    try {
        let options = {}, query = {}, include = [], attributes = {}
        if (bodyData.hasOwnProperty('options')) {
            options = bodyData.options
            if (options.hasOwnProperty('include')) {
                include = options.include
            }
            if (options.hasOwnProperty('attributes')) {
                attributes = options.attributes
            }
        }
        if (bodyData.hasOwnProperty('query')) {
            query = bodyData.query
        }
        if (include) {
            await recursiveInclude(include)
        }
        const data = await model.findOne({
            where: {
                [Op.and]: [query]
            },
            attributes: attributes,
            include: include
        })
        return data
    } catch (error) {
        return error.message
    }
}

module.exports = getByIdData