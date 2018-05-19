var T2T = artifacts.require("./TraceToToken.sol");

module.exports = function(deployer) {
	var totalTokenAmount = web3.toWei( 10**9 , "ether");
	var exchangeIEOAddress = "0x6Be1247c5D8b1A2eB4093b0301E34E420F8180cd";
	var admin = "0x6d550B8B3806a1bE74d12616D2E64aB7548d6D48";

	Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
	var transferStartTime = new Date('Sat, 8 Mar 2018 07:00:00 GMT').getUnixTime();

	deployer.deploy(T2T, admin, totalTokenAmount, transferStartTime, exchangeIEOAddress );
};