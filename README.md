# WineSupplyChainDApp
-----

About
-----

Project: `Ethereum supply chain DApp to authenticate the supply and tracking of wine from vigneron to consumer`

From Udacity:
> Learn how to manage and audit blockchain product ownership as the product is transferred down the supply chain. 
Improve your notarization service with a smart contract to support transferring of ownership, product auditing, and supply chain management.

Supporting courses:
* Blockchain Architecture

`WineSupplyChain` is a decentralized application used to track wine through the different stages of its supply chain; from vigneron to consumer. This application tracks the cultivation (viticulture), fermenting (vinification) and barrel ageing process (élevage) before it is packed and shipped to the retailer for consumer purchase. Information like the location of the vineyard (latitude & latitude coordinates), the age of the wine, and the flavour/aromatics are all publicly available for transparency during the various supply chain stages.

UML Diagrams
------------
* [Activity]()
* [Sequence]()
* [State]()
* [Data Model (Class)]()


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

