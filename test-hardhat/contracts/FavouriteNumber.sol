// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract FavouriteNumber {
    uint public myFavouriteNumber;

    constructor(uint _number) {
        myFavouriteNumber = _number;
    }

    function setMyFavouriteNumber(uint _number) external {
        console.log("changing fav number from %s to %s", myFavouriteNumber, _number);
        myFavouriteNumber = _number;
    }
}