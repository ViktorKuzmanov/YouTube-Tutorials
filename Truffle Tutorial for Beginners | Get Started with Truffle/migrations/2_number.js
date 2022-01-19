const Number = artifacts.require("Number");

module.exports = function (deployer) {
  deployer.deploy(Number, 1);
};
