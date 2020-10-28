const ModelsHomeMenuItems = require("../../models/home_menu_items");
const apiResponse = require("../../models/apiResponse");

exports.get = async (req, res, next) => {
  try {
    const data = await ModelsHomeMenuItems.get();
    res.render("homeMenu", { data, selectedNavbarItem: "homeMenu" });
  } catch {
    next();
  }
};

exports.post = async ({ params: { id }, body }, res) => {
  try {
    await ModelsHomeMenuItems.edit(id, {
      ...body,
    });
    apiResponse(res, { message: " edit successfully" });
  } catch ({ message }) {
    apiResponse(res, { message, code: 500 });
  }
};

exports.delete = async ({ params: { id }, body }, res) => {
  try {
    const data = await ModelsHomeMenuItems.get();
    const deletedItem = data.find((item) => item.id === id);
    await ModelsHomeMenuItems.del(id);

    for (let i = deletedItem.indexOrder + 1; i < data.length; i++) {
      let id = data[i].id;
      delete data[i].id;
      await ModelsHomeMenuItems.edit(id, {
        ...data[i],
        indexOrder: i - 1,
      });
    }

    apiResponse(res, { message: " deleted successfully" });
  } catch ({ message }) {
    console.error(message);
    apiResponse(res, { message, code: 500 });
  }
};

exports.add = async ({ body }, res) => {
  try {
    //to do get to find the length of the arr
    const data = await ModelsHomeMenuItems.get();
    await ModelsHomeMenuItems.add({ ...body, indexOrder: data.length }); //data.length giv arr length
    apiResponse(res, { message: " edit successfully" });
  } catch ({ message }) {
    apiResponse(res, { message, code: 500 });
  }
};

exports.getApi = async (req, res) => {
  try {
    const data = await ModelsHomeMenuItems.get();
    apiResponse(res, { data });
  } catch (e) {
    apiResponse(res, { message: "server error", code: 500 });
  }
};

exports.reorder = async (req, res) => {
  try {
    const data = await ModelsHomeMenuItems.get();
    const { idArray } = req.body;
    for (let i = 0; i < idArray.length; i++) {
      const newValue = data.find((item) => item.id === idArray[i]);
      delete newValue.id;
      newValue.indexOrder = i;
      await ModelsHomeMenuItems.edit(idArray[i], newValue);
    }
    apiResponse(res, { message: " reorder successfully" });
  } catch (e) {
    apiResponse(res, { message: "server error", code: 500 });
  }
};
