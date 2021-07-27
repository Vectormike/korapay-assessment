import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
     return knex.schema.createTable('votes', t => {
        t.increments('id')
        t.integer('answerId')
        t.integer('userId')
        t.integer('vote')
        t.timestamp('createdAt').defaultTo(knex.fn.now());
        t.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
}

