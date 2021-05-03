const generateGuid = () => {
  var result, i, j;
  result = "";
  for (j = 0; j < 32; j++) {
    if (j == 8 || j == 12 || j == 16 || j == 20) result = result + "_";
    i = Math.floor(Math.random() * 16)
      .toString(16)
      .toUpperCase();
    result = result + i;
  }
  return result;
};
async function asyncTryCatch(func, ...args) {
  let data = null;
  try {
    data = await func(...args);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log({ e });
  }
  return data;
}
function getNamespace() {
  return typeof chrome == "undefined" ? {} : chrome;
}
module.exports = {
  generateGuid,
  asyncTryCatch,
  getNamespace,
};
