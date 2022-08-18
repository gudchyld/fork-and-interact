// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;


//A simplistic bank
//money is put into a form of safe that can be withdrawn whenever needed

//create a function that receives sent money
//create a function to be able to remove the sent money
//create a function to check the balance in the bank

contract MyBank{

    address public owner;
    //uint money;

    constructor() payable {
        owner = msg.sender;
        //money = msg.value;
    }  

    function withdraw () external{
        require(msg.sender == owner, "you can't withdraw");
        require(address(this).balance > 0, "no money in contract");
        payable(msg.sender).transfer(address(this).balance);

    }

    function bankBalance() public view returns (uint){
        return address(this).balance;

    }

    receive() external payable { }
}