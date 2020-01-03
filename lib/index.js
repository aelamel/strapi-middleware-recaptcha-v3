"use strict";
const { isTokenValid } = require("./validator/recaptcha.validator");

module.exports = strapi => {
  return {
    /**
     * Initialize the hook
     */

    initialize() {
      const { recaptcha } = strapi.config.middleware.settings;

      if (recaptcha.enabled) {
        strapi.app.use(async (ctx, next) => {
          if (ctx.header["x-recaptcha-token"]) {
            const isValidToken = await isTokenValid(
              ctx.header["x-recaptcha-token"]
            );
            if (isValidToken) {
              return await next();
            }
          }

          ctx.unauthorized(`Not authorized!`);
        });
      }
    }
  };
};
