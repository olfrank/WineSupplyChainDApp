# WineSupplyChainDApp
-----
![wine](images/hero.png?raw=true)
Contract Address:
https://rinkeby.etherscan.io/address/0x6379DB319DB5E832A8ccA01b3f1A534020c0F17c 
This contract was deployed to the Rinkeby test network. 
----

About
-----

Project: `Ethereum supply chain DApp to authenticate the supply and tracking of wine from vigneron to consumer`

Dependencies:
- lite-server: ^2.6.1  => A lightweight development only node server that serves a web app.
- truffle-assertions: ^0.9.2  => Additional assertions that can be used to test Ethereum smart contracts inside Truffle tests.
- dotenv: ^14.1.0 => Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

Program Versions:
- Truffle v5.4.28 (core: 5.4.28)
- Solidity - 0.8.11 (solc-js)
- Node v14.16.0
- Web3.js v1.5.3

Udacity Supporting courses:
* Blockchain Architecture

`WineSupplyChain` is a decentralized application used to track wine through the different stages of its supply chain; from vigneron to consumer. This application tracks the cultivation (viticulture), fermenting (vinification) and barrel ageing process (élevage) before it is packed and shipped to the retailer for consumer purchase. Information like the location of the vineyard (latitude & latitude coordinates), the age of the wine, and the flavour/aromatics are all publicly available for transparency during the various supply chain stages.

UML Diagrams
------------
* [Activity](images/ActivityDiagram.jpeg)
* [Sequence](images/SequenceDiagram.jpeg)
* [State](images/StateDiagram.jpeg)
* [Data Model (Class)](images/DataModelDiagram.jpeg)


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
Core contract (Ownable.sol): This contract controls ownership and transfer of ownership.
Implements: 
    * Ownable – Defines the owner of the contracts
    * Secondary – Allows ownership of contract to be transferred 

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

Access Control (WineAccessControl.sol): This contract controls the access for each actor in the supply chain. Each actors role is distinct with no overlap in their acces abilities. 
