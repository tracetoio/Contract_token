# Token Sale Contract

We create a generic MintableToken with additional parameters for exchange address, to enable IEO of the token.

# Roadmap
1. We deploy the TraceToToken and mint the tokens. Required parameters are:  admin, totalTokenAmount, transferStartTime, exchangeIEOAddress
2. admin is the administrator of the token, which will be handled by the traceto.io team
3. For Deployment we have to supply a date on which the tokens become transferable between token holders.
4. This lock is not applicable to the exchange IEO account and the admin account.


Big thanks to [openzeppelin](https://openzeppelin.org/) for their code base, the auditors and everyone who helped peer review.
