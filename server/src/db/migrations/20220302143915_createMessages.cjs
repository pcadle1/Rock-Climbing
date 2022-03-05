/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('messages', (table) => {
    table.bigIncrements('id')
    table.bigInteger('senderId').notNullable().unsigned().index().references('users.id')
    table.bigInteger('receiverId').notNullable().unsigned().index().references('users.id')
    table.text('messageText').notNullable()
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('messages')
}
