// eslint-disable-next-line import/no-extraneous-dependencies
const { useBabelRc, override } = require('customize-cra')

// eslint-disable-next-line react-hooks/rules-of-hooks
module.exports = override(useBabelRc())
