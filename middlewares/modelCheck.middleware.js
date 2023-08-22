const modelName = require('../utils/models')
module.exports = checkModel = (model) => {
    // you can do like this
    // return require(`../models/${tableName}`);
    if (!modelName.model[model]) {
        return { message: "Please enter correct table name!!" }
    }
    return modelName.model[model]
}

