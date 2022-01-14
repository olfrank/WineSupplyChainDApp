const DistributorRole = artifacts.require("./DistributorRole.sol");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract("DistributorRole", async(accounts)=>{
    const ownerID = accounts[0]
    const originVigneronID = accounts[1];
    const distributorID = accounts[2];

    it('should revert when a non-distributor tries to add a distributor', async()=>{
        const distributorRole = await DistributorRole.deployed();
        
        await truffleAssert.reverts(
            distributorRole.addDistributor(distributorID, {from: originVigneronID}),
            "Only a Distributor can call this function"
        );
    })

    it('should add a new distributor', async()=>{
        const distributorRole = await DistributorRole.deployed();

        let tx1 = await distributorRole.addDistributor(distributorID, {from: ownerID});
        let event = tx1.logs[0].event;

        let bool = await distributorRole.isDistributor.call(distributorID);

        assert.equal(event, "DistributorAdded", "error");
        assert.equal(bool, true, "Not a distributor");
    })

    it('should remove a distributor', async()=>{
        const distributorRole = await DistributorRole.deployed();

        let tx = await distributorRole.renounceDistributor({from: distributorID});
        let event = tx.logs[0].event;

        let newBool = await distributorRole.isDistributor.call(distributorID);
        assert.equal(newBool, false, "Is still a distributor");
        assert.equal(event, "DistributorRemoved", "Retailer has not been removed")
    })

    


})