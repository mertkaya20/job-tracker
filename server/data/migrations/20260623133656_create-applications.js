/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("applications", (tbl) => {
    tbl.increments("id");
    tbl
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    tbl.string("company_name").notNullable();
    tbl.string("position").notNullable();
    tbl.string("status").notNullable().defaultTo("applied");
    tbl.date("applied_date");
    tbl.text("notes");
    tbl.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("applications");
};
