const { expect } = require("chai");

describe("MyContract", () => {

    let favouriteNumberContract

    beforeEach( async () => {
        const FavouriteNumber = await ethers.getContractFactory("FavouriteNumber");
        favouriteNumberContract = await FavouriteNumber.deploy(7);
        await favouriteNumberContract.deployed();
    }) 

    it("should return 7 as my favourite number", async function () {
        expect(await favouriteNumberContract.myFavouriteNumber()).to.equal(7);
    });

    it("should return my 10 as my favourite number", async function () {
        const changeNumberTransaction = await favouriteNumberContract.setMyFavouriteNumber(10)
        await changeNumberTransaction.wait();
        expect(await favouriteNumberContract.myFavouriteNumber()).to.equal(10);
    });

})