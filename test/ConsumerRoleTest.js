const ConsumerRole = artifacts.require("./ConsumerRole.sol");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract("ConsumerRole", async(accounts)=>{
    const ownerID = accounts[0]
    const originVigneronID = accounts[1];
    const consumerID = accounts[2];

    it('should revert when a non-consumer tries to add a consumer', async()=>{
        const consumerRole = await ConsumerRole.deployed();
        
        await truffleAssert.reverts(
            consumerRole.addConsumer(consumerID, {from: originVigneronID}),
            "Only a Consumer can call this function"
        );
    })

    it('should add a new consumer', async()=>{
        const consumerRole = await ConsumerRole.deployed();

        let tx1 = await consumerRole.addConsumer(consumerID, {from: ownerID});
        let event = tx1.logs[0].event;

        let bool = await consumerRole.isConsumer.call(consumerID);

        assert.equal(event, "ConsumerAdded", "error");
        assert.equal(bool, true, "Not a consumer");
    })

    it('should remove a consumer', async()=>{
        const consumerRole = await ConsumerRole.deployed();

        let tx = await consumerRole.renounceConsumer({from: consumerID});
        let event = tx.logs[0].event;

        let newBool = await consumerRole.isConsumer.call(consumerID);
        assert.equal(newBool, false, "Is still a consumer");
        assert.equal(event, "ConsumerRemoved", "Retailer has not been removed")
    })

    


})