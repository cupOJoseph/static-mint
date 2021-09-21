# Static Minting

Some simple web3 code to call a "mint" function on a smart contract from a completely static front end with no server at all. Uses infura, web3 modal, web3.js, some other stuff.

## Working with
Add your token address and infura keys in the js file. paste all of this into a static html file.

ABI can be also pasted directly into a script tag as `const CONTRACT_ABI = [...]`


### Web3 wallets and HTTPS hosting limitations

Because of limitations how wallet operate within a web browser
and web security, you should not run this example, or any Web3modal code,
out of your file system or insecure HTTP protocol
(even using localhost).

The APIs of different wallet providers may fail in funny and obscure way. MetaMask does not even show up if you load it over `file://` protocol.

The easiest way to get local HTTPS development
is to use [https-localhost](https://github.com/daquinoaldo/https-localhost).

Assuming you have a working Node environment set up on a UNIX system you can do:

```sh
npm i -g --only=prod https-localhost
sudo serve ~/myproj
```

... in the folder of index.html file.

Then you can visit https://localhost to open the example.
