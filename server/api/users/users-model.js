const db = require("../../data/db-config");

const getAll = () => {
  return db("users");
};

const getById = (id) => {
  return db("users").where("id", id).first();
};

const getByFilter = (filter) => {
  //  {email: mertkaya@gmail.com}
  return db("users").where(filter).first();
};

const addUser = async (user) => {
  const [id] = await db("users").insert(user);

  return getById(id);
};

const updateUser = async (id, credentials) => {
  await db("users").where("id", id).update(credentials);
  return getById(id);
};

const deleteUser = async (id) => {
  const deletedUser = await getById(id);
  await db("users").where("id", id).delete();

  return deletedUser;
};

module.exports = {
  getAll,
  getById,
  getByFilter,
  addUser,
  updateUser,
  deleteUser,
};
