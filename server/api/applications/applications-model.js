const db = require("../../data/db-config");

const getAll = (userId) => {
  return db("applications").where("user_id", userId);
};

const getById = (id) => {
  return db("applications").where("id", id).first();
};

const addApplications = async (application) => {
  const [row] = await db("applications").insert(application).returning("id");
  return getById(row.id);
};

const updateApplication = async (id, changes) => {
  await db("applications").where("id", id).update(changes);
  return getById(id);
};

const deleteApplication = async (id) => {
  const foundApplication = await getById(id);
  await db("applications").where("id", id).delete();

  return foundApplication;
};

const getStats = (userId) => {
  return db("applications")
    .where("user_id", userId)
    .groupBy("status")
    .select("status")
    .count("id as count");
};

module.exports = {
  getAll,
  getById,
  addApplications,
  updateApplication,
  deleteApplication,
  getStats,
};
