const { Op } = require("sequelize")
const recursiveInclude = require('./recursiveInclude');

async function getAllData(bodyData, model) {
    try {
        let options = {}, limit = null, offset = null, pageNo = 0, perPage = 0,
            search = null, query = {}, include = [], sortBy = [], attributes = {}
        if (bodyData.hasOwnProperty('search')) {
            search = bodyData.search;
            delete bodyData.search;
        }
        if (bodyData.hasOwnProperty('options')) {
            options = bodyData.options
            if (options.hasOwnProperty('include')) {
                include = options.include
            }
            if (options.hasOwnProperty('sortBy')) {
                sortBy = options.sortBy
            }
            if (options.hasOwnProperty('attributes')) {
                attributes = options.attributes
            }
        }
        if (bodyData.hasOwnProperty('query')) {
            query = bodyData.query
        }
        if (search && search.hasOwnProperty('keys') && Array.isArray(search.keys) && search.keys.length) {
            let keyword = []
            for (let keyIndex = 0; keyIndex < search.keys.length; keyIndex++) {
                const key = search.keys[keyIndex];
                keyword.push({ [key]: { [Op.iLike]: `%${search.value}%` } })
            }
            query[Op.or] = keyword;
        }
        if (include) {
            await recursiveInclude(include)
        }
        if (options.paginate === true) {
            // limit = (options.perPage) ? parseInt(options.perPage) : 25
            // offset = (options.pageNo) ? (0 + (options.pageNo - 1) * limit) : 1
            limit = parseInt(options.limit)
            offset = (options.pageNo - 1) * limit
            pageNo = options.pageNo
            perPage = options.limit
        }

        const data = await model.findAll({
            where: {
                [Op.and]: [query]
            },
            attributes: options.attributes,
            include: include,
            limit: limit,
            offset: offset,
            order: options.sortBy
        })

        const data1 = await model.findAll({
            where: {
                [Op.and]: [query]
            }
        })
        const count = data1.length

        const Pagination = {
            TotalData: count,
            PageNo: pageNo,
            Limit: perPage,
            Offset: offset
        }

        const finalData = { data: data, paginate: Pagination }

        return finalData
    } catch (error) {
        return error.message
    }
}

module.exports = getAllData 