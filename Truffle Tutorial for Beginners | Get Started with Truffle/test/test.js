const Number = artifacts.require("Number.sol");

contract("Number", () => {
    it("should read initial value", async () => {
        // deploy the sc and get js object back that represents sc 
        const numberContract = await Number.new(2);
        const initialNumber = await numberContract.number();
        assert(initialNumber.toString() === "2");

        await numberContract.setNumber(3);
        const updateNumber = await numberContract.number();
        assert(updateNumber.toString() === "3");
    })
})