var T2T = artifacts.require("./TraceToToken.sol");

module.exports = function(deployer) {
	var totalTokenAmount = web3.toWei( 10**9 , "ether");
	var exchangeIEOAddress = "";
	var admin = "";

	Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
	var transferStartTime = new Date('Sat, 8 Mar 2018 07:00:00 GMT').getUnixTime();

	deployer.deploy(T2T, admin, totalTokenAmount, transferStartTime, exchangeIEOAddress );
};