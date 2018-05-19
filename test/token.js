var TraceToToken = artifacts.require("../contracts/TraceToToken.sol");
var utils = require("../test/utils.js");

var BigNumber = require('bignumber.js');
contract('TraceToToken', function(accounts) {

  const totalTokenAmount = new BigNumber('1e22');

  it("should put 1000000000 TraceToToken in the owner account", async () => {
    const admin = accounts[0];
    const transferStartTime = 1526447343;
    const exchangeIEOAddress = accounts[1];
    const tokenSaleReceipientA = accounts[2];
    let instance = await TraceToToken.new(admin, totalTokenAmount, transferStartTime, exchangeIEOAddress);
    let balance = await instance.balanceOf.call(accounts[0]);
    assert.equal(balance.valueOf(), totalTokenAmount);
  })

  it("should send coin correctly when lock is active", async () => {

	const admin = accounts[0];
	//use a time that is 30 mins ahead of now
	const transferStartTime = new Date();
    transferStartTime.setMinutes(transferStartTime.getMinutes() + 30);	
    const exchangeIEOAddress = accounts[1];
    const tokenSaleRecipientA = accounts[2];
    const tokenSaleRecipientB = accounts[3];
    const amountToSend =  new BigNumber('1e18');
    // console.log('StartTime::::', Math.floor(transferStartTime/1000));
    let instance = await TraceToToken.new(admin, totalTokenAmount, Math.floor(transferStartTime/1000), exchangeIEOAddress);

    let balanceExchange = await instance.balanceOf.call(accounts[1]);
    assert.equal(balanceExchange.valueOf(), 0);
    
    let transaction1 = await instance.transfer( exchangeIEOAddress, amountToSend );
    balanceExchange = await instance.balanceOf.call(accounts[1]);
    let balanceOwner = await instance.balanceOf.call(accounts[0]);

    assert.equal(balanceExchange.valueOf(), amountToSend);
    assert.equal(balanceOwner.valueOf(), totalTokenAmount - amountToSend);

    let transaction2 = await instance.transfer(tokenSaleRecipientA, amountToSend );
    let balanceRecipientA = await instance.balanceOf.call(accounts[2]);
    assert.equal(balanceRecipientA.valueOf(), amountToSend);
    // console.log(balanceRecipientA.valueOf());

    let transaction3 = await utils.expectThrow(instance.transfer(tokenSaleRecipientB, amountToSend, {from: tokenSaleRecipientA} ));

    let transaction4 = await instance.transfer(tokenSaleRecipientB, amountToSend, {from: exchangeIEOAddress} );
    let balanceRecipientB = await instance.balanceOf.call(accounts[3]);
    assert.equal(balanceRecipientB.valueOf(), amountToSend);
  });

  it("should send coin correctly when lock is inactive", async () => {

    const admin = accounts[0];

    //use a time that is in the past
    const transferStartTime = 1526447343;  
    const exchangeIEOAddress = accounts[1];
    const tokenSaleRecipientA = accounts[2];
    const tokenSaleRecipientB = accounts[3];
    const amountToSend =  new BigNumber('1e18');
    let instance = await TraceToToken.new(admin, totalTokenAmount, transferStartTime, exchangeIEOAddress);

    let balanceExchange = await instance.balanceOf.call(accounts[1]);
    assert.equal(balanceExchange.valueOf(), 0);
    
    let transaction1 = await instance.transfer( exchangeIEOAddress, amountToSend );
    balanceExchange = await instance.balanceOf.call(accounts[1]);
    let balanceOwner = await instance.balanceOf.call(accounts[0]);

    assert.equal(balanceExchange.valueOf(), amountToSend);
    assert.equal(balanceOwner.valueOf(), totalTokenAmount - amountToSend);

    let transaction2 = await instance.transfer(tokenSaleRecipientA, amountToSend );
    let balanceRecipientA = await instance.balanceOf.call(accounts[2]);
    assert.equal(balanceRecipientA.valueOf(), amountToSend);
    // console.log(balanceRecipientA.valueOf());

    let transaction3 = await instance.transfer(tokenSaleRecipientB, amountToSend, {from: tokenSaleRecipientA} );
    let balanceRecipientB = await instance.balanceOf.call(accounts[3]);
    assert.equal(balanceRecipientB.valueOf(), amountToSend);

    let transaction4 = await instance.transfer(tokenSaleRecipientA, amountToSend, {from: exchangeIEOAddress} );
    balanceRecipientA = await instance.balanceOf.call(accounts[2]);
    assert.equal(balanceRecipientA.valueOf(), amountToSend);
  });
});