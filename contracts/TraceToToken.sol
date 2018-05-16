pragma solidity 0.4.21;

import "./zeppelin/token/ERC20/MintableToken.sol";
import "./zeppelin/token/ERC20/BurnableToken.sol";


contract TraceToToken is MintableToken, BurnableToken {
    string  public  constant name = "traceto.io";
    string  public  constant symbol = "T2T";
    uint    public  constant decimals = 18;
    uint    public  allowTransferTime;

    address public  tracetoMultiSigContract;

    // The exchange addresses for the Initial Exchange Offer IEO.
    // Using two addresses instead of an array to keep it simple and more readable
    address public  exchangeIEO;

    modifier onlyWhenTransferEnabled() {
        if (now <= allowTransferTime) {
            require(
                msg.sender == tracetoMultiSigContract ||
                msg.sender == exchangeIEO
                );
        }
        _;
    }

    modifier validDestination( address to ) {
        require(to != address(0x0));
        require(to != address(this));
        _;
    }

    function TraceToToken(
        address admin,
        uint totalTokenSupply,
        uint transferStartTime,
        address exchangeForIEOAdrress
        ) {
        mint(admin, totalTokenSupply);

        // disable further minting is possible
        finishMinting();

        // allow transfer of T2T between all users
        allowTransferTime = transferStartTime;


        tracetoMultiSigContract = admin;
        exchangeIEO = exchangeForIEOAdrress;

        transferOwnership(admin);
    }

    function transfer(address _to, uint _value)
    public
    onlyWhenTransferEnabled
    validDestination(_to)
    returns (bool) {
        return super.transfer(_to, _value);
    }

    function transferFrom(address _from, address _to, uint _value)
    public
    onlyWhenTransferEnabled
    validDestination(_to)
    returns (bool) {
        return super.transferFrom(_from, _to, _value);
    }

    function emergencyERC20Drain( ERC20 token, uint amount )
    public
    onlyOwner
    {
        token.transfer(owner, amount);
    }
}
