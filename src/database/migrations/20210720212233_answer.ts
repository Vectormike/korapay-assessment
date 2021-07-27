import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
     return knex.schema.createTable('answers', t => {
        t.increments('id')
        t.integer('author_id')
        t.integer('question_id')
        t.integer('vote_id')
        t.string('text')
        t.timestamp('createdAt').defaultTo(knex.fn.now());
        t.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
}

