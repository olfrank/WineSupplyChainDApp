var VigneronRole = artifacts.require("./VigneronRole.sol");
var Ownable = artifacts.require("./Ownable.sol");
var RetailerRole = artifacts.require("./RetailerRole.sol");
var ConsumerRole = artifacts.require("./ConsumerRole.sol");
var DistributorRole = artifacts.require("./DistributorRole.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = function(deployer){
    deployer.deploy(VigneronRole);
    deployer.deploy(Ownable);
    deployer.deploy(RetailerRole);
    deployer.deploy(ConsumerRole);
    deployer.deploy(DistributorRole);
    deployer.deploy(SupplyChain);
}