// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.2;

contract Number {

    uint256 public number;

    constructor(uint256 initialNumber) {
        number = initialNumber;
    }

    function setNumber(uint256 newNumber) external {
        number = newNumber;
    }
    
}