import { ethers } from 'hardhat';

async function main() {
  const amount = ethers.utils.parseEther('0.1');

  //get pointer to piggybank interface
  const MyBankAddr = '0x0cd9904C11F3fBF3F3A765986E872181DbdE8218';
  const bankpointer = await ethers.getContractAt('IMyBank', MyBankAddr);

  //get balance of mybank
  //const myBankBal = await bankpointer.bankBalance();
  //console.log('mybank balance is : ', piggyBankBal);

  //withdraw from the mybank
  const bankWithdraw = await bankpointer.withdraw();
  const bankWithdrawTrans = await bankWithdraw.wait();
  console.log('withdrawal receipt is', bankWithdrawTrans);

  /*Details of the Write transaction which is withdraw*/
  //Transaction Hash for Withdraw: 0x3bfada997661f5fbde249513b96a35787328f3f8d91e32484d4329884ce268b1
  //Network Deployed to          : Ropsten
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
