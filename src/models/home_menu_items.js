const QueriesHomeMenu = require('../database/home_menu_items');
const Joi = require('@hapi/joi');

const schema = Joi.object({
    indexOrder:Joi.number(),
    title: Joi.object({
        en: Joi.string(),
        he: Joi.string(),
        ar: Joi.string()
    }),
    src: Joi.string(),
    redirectionLink: Joi.string(),
})

const edit = async (id, item) => {
    if(!id)
        throw new Error("id should be defined");

    if (schema.validate(item).error)
        throw new Error(schema.validate(item).error.message);

    return await QueriesHomeMenu.edit(id,item);
}


const get = QueriesHomeMenu.get;


const del = async (id) => {
    if(!id)
        throw new Error("id should be defined");


    return await QueriesHomeMenu.delete(id)

}

const add = async (item) => {
    if (schema.validate(item).error)
        throw new Error(schema.validate(item).error);
    return await QueriesHomeMenu.add(item);
}



module.exports = {
    edit,
    get,
    del,
    add
}