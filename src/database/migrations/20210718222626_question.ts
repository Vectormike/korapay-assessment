import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('questions', t => {
        t.increments('id')
        t.integer('author_id')
        t.string('title')
        t.string('text')
        t.integer('vote_id')
        t.integer('answer_id')
        t.string('role').defaultTo("user")
        t.timestamp('createdAt').defaultTo(knex.fn.now());
        t.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('questions')
}

