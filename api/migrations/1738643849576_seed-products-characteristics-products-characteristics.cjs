/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = pgm => {
  pgm.sql(`INSERT into products (name)
           VALUES ('Sprockets'), ('Cogs'), ('Face Cream'), ('Muskers'), ('Hand Sanitizer'), ('Lettuce')
    `);

  pgm.sql(`INSERT into characteristics (name, score_value)
           VALUES ('Plastic-Free', 2), ('Locally Produced', 1), ('Wasteful', -1), ('Humane', 1), ('Vegan', 1), ('Unhealthy', -1), ('Healthy', 1)
    `);

  pgm.sql(`INSERT into products_characteristics (product_id, characteristic_id)
           VALUES ((SELECT id FROM products WHERE name = 'Sprockets'), (SELECT id FROM characteristics WHERE name = 'Plastic-Free')),
           ((SELECT id FROM products WHERE name = 'Sprockets'), (SELECT id FROM characteristics WHERE name = 'Locally Produced')),
           ((SELECT id FROM products WHERE name = 'Cogs'), (SELECT id FROM characteristics WHERE name = 'Plastic-Free')),
           ((SELECT id FROM products WHERE name = 'Cogs'), (SELECT id FROM characteristics WHERE name = 'Wasteful')),
           ((SELECT id FROM products WHERE name = 'Face Cream'), (SELECT id FROM characteristics WHERE name = 'Humane')),
           ((SELECT id FROM products WHERE name = 'Face Cream'), (SELECT id FROM characteristics WHERE name = 'Vegan')),
           ((SELECT id FROM products WHERE name = 'Face Cream'), (SELECT id FROM characteristics WHERE name = 'Locally Produced')),
           ((SELECT id FROM products WHERE name = 'Muskers'), (SELECT id FROM characteristics WHERE name = 'Wasteful')),
           ((SELECT id FROM products WHERE name = 'Muskers'), (SELECT id FROM characteristics WHERE name = 'Unhealthy')),
           ((SELECT id FROM products WHERE name = 'Hand Sanitizer'), (SELECT id FROM characteristics WHERE name = 'Vegan')),
           ((SELECT id FROM products WHERE name = 'Hand Sanitizer'), (SELECT id FROM characteristics WHERE name = 'Humane')),
           ((SELECT id FROM products WHERE name = 'Lettuce'), (SELECT id FROM characteristics WHERE name = 'Vegan')),
           ((SELECT id FROM products WHERE name = 'Lettuce'), (SELECT id FROM characteristics WHERE name = 'Humane')),
           ((SELECT id FROM products WHERE name = 'Lettuce'), (SELECT id FROM characteristics WHERE name = 'Healthy'))
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = pgm => {};
