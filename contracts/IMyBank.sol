// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

interface IMyBank{

    function withdraw () external;
    function bankBalance() external view returns (uint);  


}