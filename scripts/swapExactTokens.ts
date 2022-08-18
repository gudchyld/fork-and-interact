import { ethers } from 'hardhat';
const helpers = require('@nomicfoundation/hardhat-network-helpers');

async function main() {
  const MaticAddr = '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0';
  const USDTAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  const UNIRouter = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

  const amountIn = ethers.utils.parseUnits('2', '18');
  const amountOutMin = ethers.utils.parseUnits('3', '18');

  //impersonating stunt
  const MaticHolder = '0xf584f8728b874a6a5c7a8d4d387c9aae9172d621';
  await helpers.impersonateAccount(MaticHolder);
  const impersonatedSigner = await ethers.getSigner(MaticHolder);

  //get pointer to matic
  const Matic = await ethers.getContractAt(
    'IERC20',
    MaticAddr,
    impersonatedSigner
  );

  //get pointer to usdt
  const USDT = await ethers.getContractAt('IERC20', USDTAddress);

  //get pointer to Router uniswap
  const ROUTER = await ethers.getContractAt(
    'IUniswap',
    UNIRouter,
    impersonatedSigner
  );

  await Matic.approve(UNIRouter, amountIn);

  const matBal = await Matic.balanceOf(MaticHolder);
  const usdtBal = await USDT.balanceOf(MaticHolder);

  console.log('matic before swap', matBal);
  console.log('usdt before swap', usdtBal);

  await ROUTER.swapExactTokensForTokens(
    2000,
    2000,
    [MaticAddr, USDTAddress],
    MaticHolder,
    Math.floor(Date.now() / 1000) + 60 * 10,
    { gasLimit: ethers.utils.hexlify(1000000) }
  );

  const maticBalAfter = await Matic.balanceOf(MaticHolder);
  const usdtBalAfter = await USDT.balanceOf(MaticHolder);

  console.log('Matic afer swap', maticBalAfter);
  console.log('usdt after swap', usdtBalAfter);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
