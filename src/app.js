App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originVigneronID: "0x0000000000000000000000000000000000000000",
    originVineyardName: null,
    originVineyardInformation: null,
    originVineyardLatitude: null,
    originVineyardLongitude: null,
    productNotes: null,
    productPrice: 0,
    productAge: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originVigneronerID = $("#originVigneronID").val();
        App.originVineyardName = $("#originVineyardName").val();
        App.originVineyardInformation = $("#originVineyardInformation").val();
        App.originVineyardLatitude = $("#originVineyardLatitude").val();
        App.originVineyardLongitude = $("#originVineyardLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productAge = $("#productAge").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();

    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access");
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }

        console.log('getMetamaskAccountID');
        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            // console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);

            // console.log("web3: ", web3);
            // console.log("web3 eth: ", web3.eth);
            // console.log("web3 eth defaultAccount: ", web3.eth.defaultAccount);
            // console.log("web3 eth accounts: ", web3.eth.accounts);

            web3.eth.defaultAccount = web3.eth.accounts[0];
            
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        // console.log('processId',processId);

        App.readForm();

        switch(processId) {
            case 1:
                return await App.viticultureItem(event);
            case 2:
                return await App.vinifyItem(event);
            case 3:
                return await App.elevageItem(event);
            case 4:
                return await App.packItem(event);
            case 5:
                return await App.sellItem(event);
            case 6:
                return await App.buyItem(event);
            case 7:
                return await App.shipItem(event);
            case 8:
                return await App.receiveItem(event);
            case 9:
                return await App.purchaseItem(event);
            case 10:
                return await App.fetchItemBufferOne(event);
            case 11:
                return await App.fetchItemBufferTwo(event);
            case 12:
                return App.removeModal(event);
            }
    },

    removeModal: (event)=>{
        event.preventDefault();
        try{
            $("#fetchData").addClass("hidden");
            // $(".btn-exit").click(function(){
            //     $("#fetchData").addClass("hidden");
            // })
        }catch(err){
            console.log("removeModal: ", err.message);
        }
        
    },

    viticultureItem: async(event)=> {
        event.preventDefault();
        // var processId = parseInt($(event.target).data('id'));
        try{
            var upcVini = $("#upcVini").val();;
            var nameVineyard = $("#nameVineyard").val();
            var infoVineyard = $("#infoVineyard").val();
            var latVineyard = $("#latVineyard").val();
            var longVineyard = $("#longVineyard").val();
            var prodNotes = $("#prodNotes").val();
            
            const instance = await App.contracts.SupplyChain.deployed();
            await instance.viticultureItem(
                upcVini, 
                App.metamaskAccountID, 
                nameVineyard, 
                infoVineyard, 
                latVineyard, 
                longVineyard, 
                prodNotes,
                {from: App.metamaskAccountID}
            );

        }catch(err){
            console.log("Error @ viticultureItem: ", err.message);
        }
        
    },
    


    vinifyItem: async(event)=>{
        event.preventDefault();
        try{
            const instance = await App.contracts.SupplyChain.deployed()
            await instance.vinifyItem(App.upc, {from: App.metamaskAccountID});
            var vinifyOutput = "Wine has been vinified";
            $("#vinifyOutput").text(vinifyOutput);
            console.log('vinifyItem: ', vinifyOutput);

        }catch(err){
            var vinifyError = "Vinification could not be processed"
            $("#vinifyOutput").text(vinifyError);
            console.log("Error @ vinifyItem: ", err.message);
        }
    },



    elevageItem: async (event) =>{
        event.preventDefault();
        try{
            const instance = await App.contracts.SupplyChain.deployed()
            await instance.elevageItem(App.upc, App.productAge, {from: App.metamaskAccountID});

            var elevageOutput = "Wine has been barrel aged."
            $("#elevageOutput").text(elevageOutput);
            console.log('elevageItem: ', elevageOutput);

        }catch(err){
            var elevageError = "Elevage transaction could not be processed"
            $("#elevageOutput").text(elevageError);
            console.log("Error @ elevageItem: ", err.message);
        }
    },
    
    packItem: async (event) =>{
        event.preventDefault();
        try{
            const instance = await App.contracts.SupplyChain.deployed()
            await instance.packItem(App.upc, {from: App.metamaskAccountID});
            var packOutput = "Item has been Packed"
            $("#packOutput").text(packOutput);
            console.log('packItem: ', packOutput);
        }catch(err){
            var packError = "Pack Item transaction could not be processed"
            $("#packOutput").text(packError);
            console.log("Error @ packItem: ",err.message);
        }
    },

    sellItem: async (event) =>{
        event.preventDefault();
        try{
            var prodPrice = $("#productPrice").val();
            App.productPrice = prodPrice;
            var price = web3.toWei(prodPrice, "ether");
            const instance = await App.contracts.SupplyChain.deployed();
            await instance.sellItem(App.upc, price, {from: App.metamaskAccountID});

            let forSaleOutput = "Item is now for sale"
            $("#forSaleOutput").text(forSaleOutput);
            console.log('sellItem: ', forSaleOutput);

        }catch(err){
            let forSaleError = "Sell Item could not be marked for sale, transaction error";
            $("#forSaleOutput").text(forSaleError);
        console.log("Error @ sellItem: ", err.message);
        }
    },

    buyItem: async (event) =>{
        event.preventDefault();
        try{
            let upc = $("#buyItemUPC").val();

            const instance = await App.contracts.SupplyChain.deployed()
            var price = await instance.getProductPrice(upc, {from: App.metamaskAccountID});
            console.log("@ buyItem price = ", price);
            await instance.buyItem(upc, {from: App.metamaskAccountID, value: price});
        }catch(err){

        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei(3, "ether");
            return instance.buyItem(App.upc, {from: App.metamaskAccountID, value: walletValue});
        }).then(function(result) {
            buyOutput = `
                The item was has been bought.
                Tx: ${result['logs'][0]['transactionHash']}
            `;

            $("#buyOutput").text(buyOutput);
            console.log('buyItem',result);
        }).catch(function(err) {
            buyError = `
                The buy transaction could not be completed.
                An error occurred - see console.log for details
            `
            $("#buyOutput").text(buyError);
            console.log(err.message);
        });
    },

    shipItem: async (event) =>{
        event.preventDefault();
        try{
            const instance = await App.contracts.SupplyChain.deployed()
            await instance.shipItem(App.upc, {from: App.metamaskAccountID});
            let shipOutput = "Item has been marked as shipped";
            $("#shipOutput").text(shipOutput);
            console.log('shipItem', shipOutput);
        }catch(err){
            let shipError = "The item could not be marked as shipped"
            $("#shipOutput").text(shipError);
            console.log("Error @ shipItem: ", err.message);
        }
    },

    receiveItem: async (event) =>{
        event.preventDefault();
        try{
            const instance = await App.contracts.SupplyChain.deployed()
            await instance.receiveItem(App.upc, {from: App.metamaskAccountID});
            receiveOutput = "Item has been received by retailer"
            $("#receiveOutput").text(receiveOutput);
            console.log('receiveItem: ', receiveOutput);
        }catch(err){
            receiveError = "Item has not been received"
            $("#receiveOutput").text(receiveError);
            console.log("Error @ recieveItem: ", err.message);
        }
    },

    purchaseItem: async (event) =>{
        event.preventDefault();
        try{
            var upc = $("#purchaseItemUPC").val();
            const instance = await App.contracts.SupplyChain.deployed()
            var price = await instance.getProductPrice(upc, {from: App.metamaskAccountID});
            console.log("@ purchaseItem price = ", price);
            await instance.purchaseItem(upc, {from: App.metamaskAccountID, value: price});
        }catch(err){
            let purchaseError = "Item could not be purchased, transaction failed"
            $("#purchaseOutput").text(purchaseError);
            console.log("Error @ purchaseItem: ", err.message);
        }
    },

    fetchItemBufferOne: async (event) =>{
        event.preventDefault();
        App.upc = $('#upc').val();
        console.log('upc:',App.upc);
        try{
            const instance = await App.contracts.SupplyChain.deployed()
            var res = await instance.fetchItemBufferOne.call(App.upc);

            let output = `
                SKU: ${res[0]}
                UPC: ${res[1]}
                Owner ID: ${res[2]}
                Vigneron ID: ${res[3]}
                Vineyard Name: ${res[4]}
                Vineyard Information: ${res[5]}
                Vineyard Latitude: ${res[6]}
                Vineyard Longitude: ${res[7]}
            `
          $("#fetchData").removeClass('hidden');
          $("#fetchData").text(output);
        }catch(err){
            let fetchError = "Could not fetch data";
            $("#fetchData").removeClass('hidden');
            $("#fetchDataText").text(fetchError);
            console.log("Error @ fetchItemBufferOne: ", err.message);
        }
        
    },

    fetchItemBufferTwo: async (event) =>{
        event.preventDefault();
        App.upc = $('#upc').val();
        try{
            const instance = await App.contracts.SupplyChain.deployed()
            var res = await instance.fetchItemBufferTwo.call(App.upc);

            var output = `
                SKU: ${res[0]}
                UPC: ${res[1]}
                Product ID: ${res[2]}
                Product Age: ${res[3]}
                Product Notes: ${res[4]}
                Product Price: ${res[5]}
                Item State: ${res[6]}
                Distributor ID: ${res[7]}
                Retailer ID: ${res[8]}
                Consumer ID: ${res[9]}
            `;
            $("#fetchData").removeClass('hidden');
            $("#fetchDataText").text(output);
            console.log('fetchItemBufferTwo: success');
        }catch(err){
            let fetchError2 = "Could not fetch data";
            $("#fetchData").text(fetchError2);
            console.log("Error @ fetchItemBufferTwo: ",err.message);
        }
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#transactionHistory").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });
        
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
