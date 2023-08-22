const { User, Shop, UserShop } = require('../models')
module.exports = {
    model: {
        "userModule": User,
        "shopModule": Shop,
        "userShopModule": UserShop
    }
}