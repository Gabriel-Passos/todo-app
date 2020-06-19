import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('companies', table => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('cnpj').notNullable();
        table.string('numberPhone').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('city').notNullable();
        table.string('uf').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('companies');
}
