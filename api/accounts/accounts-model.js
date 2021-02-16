const db = require("../../data/dbConfig");

module.exports = {
    get,
    getById,
    create,
    update,
    remove,
};

function get() {
    return db("accounts");
}

function getById(id) {
    return db("accounts").where("id", id).first();
}

function create(post) {
    return db("accounts")
        .insert(post)
        .then((id) => {
            return db("accounts").where("id", id).first();
        });
}

function update(id, post) {
    const postID = id;
    return db("accounts")
        .where("id", id)
        .update(post)
        .then(() => db("accounts").where("id", postID).first());
}

function remove(id) {
    return db("accounts")
        .where("id", id)
        .del()
        .then(() => {
            return db("accounts");
        });
}
