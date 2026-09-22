/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */

const config = {
    trailingComma: 'none',
    tabWidth: 4,
    semi: false, // Do not use semicolons
    singleQuote: true,
    overrides: [
        {
            files: ['client/**'],
            options: {
                semi: false
            }
        },
        {
            files: ['server/**'],
            options: {
                semi: true
            }
        },
        {
            files: ['*.html'],
            options: {
                tabWidth: 4
            }
        }
    ]
}

export default config

/** COMMONJS */
// module.exports = { trailingComma: "es5" }
