exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('username', 255).unique().notNullable();
    table.string('email', 255).notNullable();
    table.string('password', 255).notNullable();
    table.string('firstName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.string('phone', 9).nullable();
    table.string('description', 255).nullable();
    table.string('main_title', 255).nullable();
    table.timestamps(false, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
