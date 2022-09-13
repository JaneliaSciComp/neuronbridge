const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1024,
  viewportHeight: 1800,
  chromeWebSecurity: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://localhost:3000',
    excludeSpecPattern: '*~',
  },
})
