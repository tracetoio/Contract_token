var HDWalletProvider = require("truffle-hdwallet-provider");
var metamask_mnemonic = "habit rich kingdom blue install giggle business inquiry boat genius regret mimic";
var ganache_mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
var providerUrl = "https://ropsten.infura.io/PKVnHB5BIOAHG0FDhv1C";


module.exports = {
  networks: {
    ropsten: {
    provider: function() {
        return new HDWalletProvider(metamask_mnemonic, providerUrl)
      },
      network_id: 3,
      gas: 3000000
    },
    ganache: {
      host: "localhost",
      provider: new HDWalletProvider(ganache_mnemonic, "http://127.0.0.1:8545/"),
      port: 8545,
      gas: 4612388,
      network_id: "5777" // Match any network id
    },
    rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 9545,
      from: "0x88c65c5ca67b70a75d62bf6e160d2b0c21fff246", // default address to use for any transaction Truffle makes during migrations
      network_id: "*",
      gas: 4612388 // Gas limit used for deploys
    }
  }
  };