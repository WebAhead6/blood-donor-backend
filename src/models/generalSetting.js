const QueriesGeneralSetting = require("../database/generalSetting");
const Joi = require("@hapi/joi");

const schema = Joi.object({
  indexOrder: Joi.number(),
  title: Joi.object({
    en: Joi.string(),
    he: Joi.string(),
    ar: Joi.string(),
  }),
  contextType: Joi.string(),
  context: Joi.string(),
});

const add = async (setting) => {
  if (schema.validate(setting).error)
    throw new Error(schema.validate(setting).error);
  return await QueriesGeneralSetting.add(setting);
};

const edit = async (id, generalSetting) => {
  if (!id) {
    throw new Error("id should be defined");
  }
  if (schema.validate(generalSetting).error)
    throw new Error(schema.validate(generalSetting).error.message);
  return await QueriesGeneralSetting.edit(id, generalSetting);
};
const del = async (id) => {
  if (!id) {
    throw new Error("id should be defined");
  }

  return await QueriesGeneralSetting.del(id);
};

const get = QueriesGeneralSetting.get;

module.exports = {
  add,
  get,
  edit,
  del,
};
