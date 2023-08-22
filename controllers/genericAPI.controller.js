const modelCheck = require('../middlewares/modelCheck.middleware');
const getByIdData = require('../helper/getById')
const getAllData = require('../helper/getAllData')

exports.add = async (req, res, next) => {
    try {
        const modelName = modelCheck(req.params.tableName)
        if (typeof modelName === 'object') next(modelName)

        const addData = await modelName.create(req.body)
        if (!addData) {
            return res.status(400).json({ message: "Something went wrong, Not able to add the data!!" })
        }
        return res.status(200).json({ message: "Data added successfully!!" })

    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const modelName = modelCheck(req.params.tableName)
        if (typeof modelName === 'object') next(modelName)

        const checkData = await modelName.findOne({ where: { id: req.params.id } })
        if (!checkData) {
            return res.status(400).json({ message: "Not exist!!" })
        }

        const updateData = await modelName.update(req.body, { where: { id: req.params.id } })
        if (!updateData) {
            return res.status(400).json({ message: "Something went wrong, Not able to update the data!!" })
        }
        return res.status(200).json({ message: "Data updated successfully!!" })
    } catch (error) {
        next(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const modelName = modelCheck(req.params.tableName)
        if (typeof modelName === 'object') next(modelName)

        const checkData = await modelName.findOne({ where: { id: req.params.id } })
        if (!checkData) {
            return res.status(400).json({ message: "Not exist!!" })
        }
        await checkData.destroy()
        return res.status(200).json({ message: "Data deleted successfully!!" })
    } catch (error) {
        next(error)
    }
}

exports.getById = async (req, res, next) => {
    try {
        const modelName = modelCheck(req.params.tableName)
        if (typeof modelName === 'object') next(modelName)

        const option = { ...req.body };
        if (!option.hasOwnProperty('query')) {
            option['query'] = {};
        }
        option.query['id'] = req.params.id

        const checkData = await getByIdData(option, modelName)
        if (!checkData) {
            return res.status(400).json({ message: "Not exist!!" })
        }
        return res.status(200).json(checkData)
    } catch (error) {
        next(error)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const modelName = modelCheck(req.params.tableName)
        if (typeof modelName === 'object') next(modelName)

        const option = { ...req.body };
        if (!option.hasOwnProperty('query')) {
            option['query'] = {};
        }

        const checkData = await getAllData(option, modelName)
        if (!checkData) {
            return res.status(400).json({ message: "Not exist!!" })
        }
        return res.status(200).json(checkData)
    } catch (error) {
        next(error)
    }
}