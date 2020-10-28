const { db } = require("./index");

const add = async (data) => {
  await db.collection("generalSetting").doc().set(data);
  return data;
};
const edit = async (id, data) => {
  await db.collection("generalSetting").doc(id).set(data);
  return "object updated";
};

const del = async (id) => {
  await db.collection("generalSetting").doc(id).delete();
  return "object deleted";
};
const get = async () => {
  const settingGeneralRef = await db
    .collection("generalSetting")
    .orderBy("indexOrder");
  const doc = await settingGeneralRef.get();
  var result = [];
  doc.forEach((doc) => {
    const data = doc.data();

    result.push({ id: doc.id, ...data });
  });
  return result;
};

module.exports = {
  add,
  get,
  del,
  edit,
};
