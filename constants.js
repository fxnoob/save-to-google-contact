const { generateGuid } = require("./src/services/helper");
const constants = {
  appConfig: {
    appName: "Save/Search Contacts",
    key:
      "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAku6bpzxXjrjnFMsoltjR\nMAXZLOqRgxrG/5hRq0hbe3Gc2L4eJnWdLLMr6zwQb4DXFuYfsrTaevI0VVGgOe2s\nCmN6pMxplp9qnR1vj59g9omPK2R0VBQgGEyWAp1r/iDx2NBZcUUB6yfhxC9T/nJ1\nqnq4jMFhv4skeoQB+i6sq5zV7G4pLp+urameXXqAbqbyX8dnia4z3O9kYQFpyplL\nee4yN7LqQDcVGlSThhJKgV9TX1QfIv1kDsoTDgrrJMpodiDsEFIfD3hu+Ettjr8x\n17CQmDM14kzz1jS8tVy6HDz/c8ekL1A8ouR/3sxKYwf83lgNu+uPVNChPHatR4ik\nVwIDAQAB\n-----END PUBLIC KEY-----\n",
  },
  contentScript: {
    mountId: generateGuid(),
  },
  support: {
    howToUseVid: "https://www.youtube.com/watch?v=FeFummlSs38",
    googleFormLink: "https://forms.gle/P5EPJcC2fAWw9gGT6",
  },
};

module.exports = constants;
