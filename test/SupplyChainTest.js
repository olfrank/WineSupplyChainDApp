
var SupplyChain = artifacts.require('./SupplyChain.sol');


    let supplyChain;
    var sku = 1
    var upc = 1
    const originVineyardName = "Gillermo Moyano"
    const originVineyardInformation = "Zuccardi Valle de Uco";
    const originVineyardLatitude = "-33.77042210196439";
    const originVineyardLongitude = "-69.15480441534444";
    var productID = sku + upc
    const productNotes = "beautifully balanced with aromatics of chocolate, berry, and tobacco.";
    const productPrice = web3.utils.toWei("1", "ether");
    const amount = web3.utils.toWei("2", "ether");
    var itemState = 0

    var ownerID;
    var originVigneronID;
    var distributorID;
    var retailerID;
    var consumerID;
    const emptyAddress = '0x00000000000000000000000000000000000000'



contract('SupplyChain', async (accs) => {
    accounts = accs;

    ownerID = accounts[0]
    originVigneronID = accounts[1]
    distributorID = accounts[2]
    retailerID = accounts[3]
    consumerID = accounts[4]

    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("Vigneron: accounts[1] ", accounts[1])
    console.log("Distributor: accounts[2] ", accounts[2])
    console.log("Retailer: accounts[3] ", accounts[3])
    console.log("Consumer: accounts[4] ", accounts[4])

});

    it("Testing smart contract function viticultureItem() that allows a Vigneron to cultivate the grapes", async() => {
        supplyChain = await SupplyChain.deployed();

        await supplyChain.addVigneron(originVigneronID, {from: ownerID});
        
        let tx = await supplyChain.viticultureItem( 
            upc, 
            originVigneronID, 
            originVineyardName, 
            originVineyardInformation, 
            originVineyardLatitude, 
            originVineyardLongitude, 
            productNotes, 
            {from: originVigneronID} 
        );
        
        let event = tx.logs[0].event;

        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        assert.equal(resultBufferOne[0], sku, 'Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Invalid item UPC')
        assert.equal(resultBufferOne[2], originVigneronID, 'Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originVigneronID, 'Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originVineyardName, 'Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originVineyardInformation, 'Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originVineyardLatitude, 'Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originVineyardLongitude, 'Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], 0, 'Invalid item State')
        assert.equal(event, "Viticultured", 'No/Invalid event emitted');        
    })    


    it("Testing smart contract function vinifyItem() that allows a vignereon to make wine", async() => {
        supplyChain = await SupplyChain.deployed();
        
        let tx = await supplyChain.vinifyItem(upc, {from: originVigneronID});
        let event = tx.logs[0].event;

        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        assert.equal(resultBufferTwo[6], 1, "Wrong state");
        assert.equal(event, "Vinified", "event was not emitted")

    })  
    
    it("Testing smart contract function elevageItem() that allows a vigneron to age the wine", async() => {
        supplyChain = await SupplyChain.deployed();

        let age = 10;
        let tx = await supplyChain.elevageItem(upc, age, {from: originVigneronID});
        let event = tx.logs[0].event;

        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        assert.equal(resultBufferTwo[6], 2);
        assert.equal(event, "Elevaged");
    })    


    it("Testing smart contract function packItem() that allows a vigneron to pack wine", async() => {
        supplyChain = await SupplyChain.deployed()
    
        let tx = await supplyChain.packItem(upc, {from: originVigneronID});
        let event = tx.logs[0].event;

        let resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        assert.equal(resultBufferTwo[6], 3, "invalid product state");
        assert.equal(event, "Packed", "invalid event emitted")
    })  


    it("Testing smart contract function sellItem() that allows a vigneron to sell wine", async() => {
        supplyChain = await SupplyChain.deployed()
        
        let tx = await supplyChain.sellItem(upc, productPrice, {from: originVigneronID});
        let event = tx.logs[0].event;
        
        let resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        assert.equal(resultBufferTwo[6], 4, "invalid product state");
        assert.equal(resultBufferTwo[5], productPrice, "invalid price of product ");
        assert.equal(event, "ForSale", "invalid event emitted");
    })    

 
    it("Testing smart contract function buyItem() that allows a retailer to buy wine", async() => {
        supplyChain = await SupplyChain.deployed()

        await supplyChain.addRetailer(retailerID, {from: ownerID});
        
        let tx = await supplyChain.buyItem(upc, {from: retailerID, value: productPrice});
        let event = tx.logs[0].event;
 
        let resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        let resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        assert.equal(resultBufferTwo[6], 5, "invalid product state");
        assert.equal(resultBufferOne[2], retailerID, "invalid product owner");
        assert.equal(event, "Sold", "invalid event emitted");
    })    


    it("Testing smart contract function shipItem() that allows a distributor to ship wine", async() => {
        supplyChain = await SupplyChain.deployed()

        await supplyChain.addDistributor(distributorID, {from: ownerID});

        let tx = await supplyChain.shipItem(upc, {from: distributorID});
        let event = tx.logs[0].event;

        let resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        assert.equal(resultBufferTwo[6], 6, "invalid product state");
        assert.equal(event, "Shipped", "invalid event emitted");
              
    })    


    it("Testing smart contract function receiveItem() that allows a retailer to mark wine received", async() => {
        supplyChain = await SupplyChain.deployed();
        
        let tx = await supplyChain.receiveItem(upc, {from: retailerID});
        let event = tx.logs[0].event;

        let resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        let resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        assert.equal(resultBufferOne[2], retailerID, "invalid ownerId");
        assert.equal(resultBufferTwo[6], 7, "invalid product state");
        assert.equal(event, "Received", "invalid event emitted");
        
             
    });   


    it("Testing smart contract function purchaseItem() that allows a consumer to purchase wine", async() => {
        supplyChain = await SupplyChain.deployed();

        await supplyChain.addConsumer(consumerID, {from: ownerID});

        let tx = await supplyChain.purchaseItem(upc, {from: consumerID, value: productPrice});
        let event = tx.logs[0].event;

        let resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        let resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        assert.equal(resultBufferOne[2], consumerID, "invalid ownerId");
        assert.equal(resultBufferTwo[6], 8, "invalid product state");
        assert.equal(event, "Purchased", "invalid event emitted");
        
    });



