import { ethers } from 'hardhat';

async function main() {
  const amount = ethers.utils.parseEther('1');

  const Bank = await ethers.getContractFactory('MyBank');
  const bank = await Bank.deploy({ value: amount });

  await bank.deployed();

  console.log('deployed with 1 ETH to:', bank.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
