const ModelsGeneralSetting = require("../../models/generalSetting");
const apiResponse = require("../../models/apiResponse");

exports.add = async (req, res) => {
  try {
    await ModelsGeneralSetting.add(req.body);
    apiResponse(res, { message: " added successfully" });
  } catch ({ message }) {
    apiResponse(res, { message, code: 500 });
  }
};
exports.post = async ({ params: { id }, body }, res) => {
  try {
    await ModelsGeneralSetting.edit(id, {
      ...body,
    });
    apiResponse(res, { message: " edit successfully" });
  } catch ({ message }) {
    apiResponse(res, { message, code: 500 });
  }
};

exports.delete = async ({ params: { id } }, res) => {
  try {
    const data = await ModelsGeneralSetting.get();
    const deletedItem = data.find((item) => item.id === id);
    await ModelsGeneralSetting.del(id);

    for (let i = deletedItem.indexOrder + 1; i < data.length; i++) {
      let id = data[i].id;
      delete data[i].id;
      await ModelsGeneralSetting.edit(id, {
        ...data[i],
        indexOrder: i - 1,
      });
    }
    apiResponse(res, { message: " deleted successfully" });
  } catch ({ message }) {
    apiResponse(res, { message, code: 500 });
  }
};

exports.reorder = async (req, res) => {
  try {
    const data = await ModelsGeneralSetting.get();
    const { idArray } = req.body;
    for (let i = 0; i < idArray.length; i++) {
      const newValue = data.find((item) => item.id === idArray[i]);
      delete newValue.id;
      newValue.indexOrder = i;
      await ModelsGeneralSetting.edit(idArray[i], newValue);
    }
    apiResponse(res, { message: " reorder successfully" });
  } catch (e) {
    apiResponse(res, { message: "server error", code: 500 });
  }
};

exports.getGeneralSettingApi = async (req, res) => {
  try {
    const data = (await ModelsGeneralSetting.get()) || [];
    apiResponse(res, { data });
  } catch (e) {
    console.log(e.message);
    apiResponse(res, { message: "server error", code: 500 });
  }
};
