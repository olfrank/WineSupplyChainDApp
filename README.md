# WineSupplyChainDApp


![wine](images/welcome.png?raw=true)
Contract Address:
`0x6379DB319DB5E832A8ccA01b3f1A534020c0F17c`
Etherscan link:
https://rinkeby.etherscan.io/address/0x6379DB319DB5E832A8ccA01b3f1A534020c0F17c 
This contract was deployed to the Rinkeby test network. 
Transaction Hash: `0x081dce2b9f367aaf296dc00464a4dc08da0d987d383ce8b6b5a0cafdb213758b` 
----

About
-----

Project: `Ethereum supply chain DApp to authenticate the supply and tracking of wine from vigneron to consumer`

Dependencies:
- lite-server: ^2.6.1  => A lightweight development only node server that serves a web app.
- truffle-assertions: ^0.9.2  => Additional assertions that can be used to test Ethereum smart contracts inside Truffle tests.
- dotenv: ^14.1.0 => Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

Requirements
------------
* Node
* Node Package Manager (npm)
* Truffle

Program Versions:
------------
- Truffle v5.4.28 (core: 5.4.28)
- Solidity - 0.8.11 (solc-js)
- Node v14.16.0
- Web3.js v1.5.3



Install, Test & Run
-------------
1. `npm install`
2. `truffle develop`
3. `compile`
4. `migrate` (if already migrated run `migrate --reset`)
5. `test`

To run the frontend on your local host run: `npm run dev`

The frontend has been deployed using Fleek which is a website hosting service on IPFS, a decentralised server free from censorship and centralised gatekeepers. Truly trustless and permissionless. 
The website link is: https://shiny-truth-6645.on.fleek.co/ 

Udacity Supporting courses:
* Blockchain Architecture

`WineSupplyChain` is a decentralized application used to track wine through the different stages of its supply chain; from vigneron to consumer. This application tracks the cultivation (viticulture), fermenting (vinification) and barrel ageing process (élevage) before it is packed and shipped to the retailer for consumer purchase. Information like the location of the vineyard (latitude & latitude coordinates), the age of the wine, and the flavour/aromatics are all publicly available for transparency during the various supply chain stages.

WORKFLOW:
-------------
1. You first land on the hero section as you open the web app. Scrolling down to 'Wine Details', you can simply add the universal product code (UPC) of the product you would like to track and then press either Fetch Data 1 or 2. Pressing the 'Fetch Data 1' button will return information about the source of the product, i.e. the vineyard and vigneron details. 'Fetch Data 2' on the other hand will return information regarding the product, i.e. age, taste, price and the addresses of the different actors involved at the time of request. 

2. Different actors involved in the supply chain are restricted to their respective duties (for example, a farmer cannot mark the item as received, that is down to the retailer), and the UPC must be declared/initialised in 'Wine Details'. An example of this process is as follows: once the vigneron has finished cultivating the grapes for winemaking, he will proceed to mark that item as 'Viticultured', triggering an event visible in the Transaction History section at the bottom of the app. The next stage after viticulture is vinification, another vigneron only function/event, and so on. 

3. The flow of the supply chain is best visualised in the State UML Diagra which is linked below. 

4. Once a product is recieved by the retailer, the consumer is able to purchase their authentic wine. 






UML Diagrams
------------
* [Activity](images/ActivityDiagramWine.png)
* [Sequence](images/SequenceDiagramWine.png)
* [State](images/StateDiagramWine.png)
* [Data Model (Class)](images/DataModelDiagramWine.png)


Code Organization
-----------------
```console
contracts/
├── Migrations.sol
├── wineAccessControl
│   ├── ConsumerRole.sol
│   ├── DistributorRole.sol
│   ├── RetailerRole.sol
│   ├── Roles.sol
│   └── VigneronRole.sol
├── wineBase
│   └── SupplyChain.sol
└── wineCore
    └── Ownable.sol

images/
├── ActivityDiagram.png
├── DataModel.png
├── SequenceDiagram.png
├── StateDiagram.png

migrations/
├── 1_initial_migrations.js
├── 2_deploy_contracts.js

src/
├── app.js
├── truffle-contract.js

test/
├── ConsumerRoleTest.js
├── DistributorRoleTest.js
├── OwnableTest.js
├── RetailerRoleTest.js
├── SupplyChainTest.js
└── VigneronRoleTest.js
```
Contracts
-------------
Core contract (Ownable.sol): This contract controls ownership and transfer of ownership.
Implements: 
    * Ownable – Defines the owner of the contracts

Base contract (SupplyChain.sol): This contract holds all common structs, events and base variables.
Implements functions that track:
* Product ID
* Product UPC 
* Origin Information
* Origin Actor (Farmer ID, Farmer Name, Farmer Location etc)
* Misc. organisation information (e.g., Farmer Info)
* Longitude and Latitude of Origin Coordinates (e.g., Farmer’s long/lat)
* Product Notes
* Product Price

Access Control (WineAccessControl.sol): This contract controls the access for each actor in the supply chain. Each actors role is distinct with no overlap in their access abilities. 
