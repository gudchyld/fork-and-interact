import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

require('dotenv').config({ path: '.env' });

const INFURA_MAINNET_API_KEY_URL = process.env.INFURA_MAINNET_API_KEY_URL;
const INFURA_ROPSTEN_API_KEY_URL = process.env.INFURA_ROPSTEN_API_KEY_URL;

const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;

module.exports = {
  solidity: '0.8.9',

  networks: {
    hardhat: {
      forking: {
        url: INFURA_MAINNET_API_KEY_URL,
      },
    },
    
    ropsten: {
      url: INFURA_ROPSTEN_API_KEY_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },

    // mainnet: {
    //   url: INFURA_MAINNET_API_KEY_URL,
    //   accounts: [ACCOUNT_PRIVATE_KEY],
    // },


  },
};
