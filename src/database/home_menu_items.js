const { db } = require('./index')

const add = async (data) => {
    await db.collection('home_menu').doc().set(data)
    return data
}




const edit = async (id, data) => {
    await db.collection('home_menu').doc(id).set(data)
    return "object updated";
}



const del = async (id) => {
    await db.collection('home_menu').doc(id).delete()
    return "object deleted";

}


const get = async () => {
    const alertsRef = await db.collection('home_menu').orderBy("indexOrder");
    const doc = await alertsRef.get();
    var result = []
    doc.forEach(doc => {
        result.push({ id: doc.id, ...doc.data() })
    });
    return result;
}


module.exports = {
    add,
    edit,
    delete: del,
    get
};