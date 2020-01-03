const https = require("https");

const isTokenValid = async token => {
  if (token) {
    const { recaptcha } = strapi.config.middleware.settings;

    const secretKey = recaptcha.RECAPTCHA_SERET_KEY;
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    return await https.get(verificationURL, googleResponse => {
      let rawData = "";
      googleResponse.on("data", chunk => {
        rawData += chunk;
      });
      googleResponse.on("end", function() {
        try {
          var parsedData = JSON.parse(rawData);
          if (parsedData.success === true) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      });
    });
  } else {
    return false;
  }
};

module.exports = {
  isTokenValid
};
