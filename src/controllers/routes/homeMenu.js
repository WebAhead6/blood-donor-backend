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

exports.delete = async ({ params: { id } }, res) => {
  try {
    await ModelsHomeMenuItems.del(id);
    apiResponse(res, { message: " deleted successfully" });
  } catch ({ message }) {
    apiResponse(res, { message, code: 500 });
  }
};

exports.add = async ({ body }, res) => {
  try {
    //to do get to find the length of the arr
    const data = await ModelsHomeMenuItems.get();
    await ModelsHomeMenuItems.add({...body, order:data.length});//{...body,index}
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