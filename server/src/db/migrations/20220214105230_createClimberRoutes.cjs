/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('climberRoutes', (table) => {
    table.bigIncrements('id')
    table.bigInteger('climberId').notNullable().unsigned().index().references('users.id')
    table.bigInteger('routeId').notNullable().unsigned().index().references('routes.id')
    table.integer('ticks').defaultTo(0)
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('climberRoutes')
}
