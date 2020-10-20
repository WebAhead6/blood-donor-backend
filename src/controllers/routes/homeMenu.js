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
      let id= data[i].id
      delete data[i].id
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

// exports.reorder = async ({ params: { draggedId,droppedId}, body }, res) => {
//   try {
//     const data = await ModelsHomeMenuItems.get();

//     await ModelsHomeMenuItems.edit(draggedId, {
//         ...body, order:draggedindex
//     });
//     await ModelsHomeMenuItems.edit(droppedId, {
//       ...body,
//   });

//     apiResponse(res, { message: " edit successfully" });
//   } catch ({ message }) {
//     apiResponse(res, { message, code: 500 });
//   }
// };

// exports.delete = async ({ params: { id } }, res) => {
//   try {
//     console.log("id",id);
//     //const data = await ModelsHomeMenuItems.get();
//    const deleteItem = await ModelsHomeMenuItems.del(id);// after delet now we save the deleted id and sh
// console.log(deleteItem);

//     apiResponse(res, { message: " deleted successfully" });
//   } catch ({ message }) {
//     apiResponse(res, { message, code: 500 });
//   }
// };

// for (let i = body.orderIndex; i < data.length; i++) {
//   console.log("data[i].indexOrder",data[i].indexOrder);
//   await ModelsHomeMenuItems.edit(data[i].id, {
//     indexOrder: data[i].indexOrder-1,
//     ...data[i]
//   });
