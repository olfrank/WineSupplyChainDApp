const RetailerRole = artifacts.require("./RetailerRole.sol");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract("RetailerRole", async(accounts)=>{
    const ownerID = accounts[0]
    const originVigneronID = accounts[1];
    const retailerID = accounts[2];

    it('should revert when a non-retailer tries to add a retailer', async()=>{
        const retailerRole = await RetailerRole.deployed();
        
        await truffleAssert.reverts(
            retailerRole.addRetailer(retailerID, {from: originVigneronID}),
            "Only a Retailer can call this function"
        );
    })

    it('should add a new retailer', async()=>{
        const retailerRole = await RetailerRole.deployed();

        let tx1 = await retailerRole.addRetailer(retailerID, {from: ownerID});
        let event = tx1.logs[0].event;

        let bool = await retailerRole.isRetailer.call(retailerID);

        assert.equal(event, "RetailerAdded", "error");
        assert.equal(bool, true, "Not a retailer");
    })

    it('should remove a retailer', async()=>{
        const retailerRole = await RetailerRole.deployed();

        let tx = await retailerRole.renounceRetailer({from: retailerID});
        let event = tx.logs[0].event;
        let newBool = await retailerRole.isRetailer.call(retailerID);
        
        assert.equal(newBool, false, "Is still a retailer");
        assert.equal(event, "RetailerRemoved", "Retailer has not been removed")
    })

    


})