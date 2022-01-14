const Ownable = artifacts.require("./Ownable.sol");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract('Ownable', async(accounts)=>{
    const owner = accounts[0]
    const user1 = accounts[1];
    const user2 = accounts[2];

    it("should transfer ownership", async()=>{
        const ownable = await Ownable.deployed();
        let tx = await ownable.transferOwnership(user1, {from: owner});

        truffleAssert.eventEmitted(tx, "TransferOwnership", (ev)=>{
            return ev.oldOwner == owner && ev.newOwner == user1;
        })

        let boolOwner = await ownable.isOwner.call({from: user1});

        assert.equal(boolOwner, true);
    })

    it("should revert when a non-owner tries to be added", async()=>{
        const ownable = await Ownable.deployed();

        await truffleAssert.reverts(
            ownable.transferOwnership(user2, {from: user2}),
            "Only the owner of the contract can call this function"
        )

    })
});

