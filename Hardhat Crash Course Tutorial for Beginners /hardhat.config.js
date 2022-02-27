require("@nomiclabs/hardhat-waffle");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 const ROPSTEN_PRIVATE_KEY = "b26e473a64f288626a9e1c153320115912a4ed5a4477ecd257b35cdc592cbb84";

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/yl5v6JqXJkYgNj-7XFouFIW4F_Qa-H2F`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
