const VigneronRole = artifacts.require("./VigneronRole.sol");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract("VigneronRole", async(accounts)=>{
    const ownerID = accounts[0]
    const retailerID = accounts[1];
    const vigneronID = accounts[2];

    it('should revert when a non-vigneron tries to add a vigneron', async()=>{
        const vigneronRole = await VigneronRole.deployed();
        
        await truffleAssert.reverts(
            vigneronRole.addVigneron(vigneronID, {from: retailerID}),
            "Only a Vigneron can call this function"
        );
    })

    it('should add a new vigneron', async()=>{
        const vigneronRole = await VigneronRole.deployed();

        let tx1 = await vigneronRole.addVigneron(vigneronID, {from: ownerID});
        let event = tx1.logs[0].event;

        let bool = await vigneronRole.isVigneron.call(vigneronID);

        assert.equal(event, "VigneronAdded", "error");
        assert.equal(bool, true, "Not a vigneron");
    })

    it('should remove a vigneron', async()=>{
        const vigneronRole = await VigneronRole.deployed();

        let tx = await vigneronRole.renounceVigneron({from: vigneronID});
        let event = tx.logs[0].event;

        let newBool = await vigneronRole.isVigneron.call(vigneronID);
        assert.equal(newBool, false, "Is still a vigneron");
        assert.equal(event, "VigneronRemoved", "Retailer has not been removed")
    })

})