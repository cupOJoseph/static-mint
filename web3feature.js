import CONTRACT_ABI from "./Contract.json" assert { type: "json" };

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let web3, web3Modal, userAddress;

function init() {
  console.log("Initializing example");
  console.log("WalletConnectProvider is", WalletConnectProvider);

  // Check that the web page is run in https (MetaMask won't be available)
  if(location.protocol !== 'https:') {
    document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
    return;
  }

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "XXXXX",
      }
    },
  };

  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions, // required
    disableInjectedProvider: false,
  });
}

async function onConnect() {
  let provider;

  console.log("opening web3modal", web3Modal);

  try {
    provider = await web3Modal.connect();
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  console.log('connected');
  document.querySelector("#initial").style.display = "none";
  document.querySelector("#mint").style.display = "block";

  web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  userAddress = accounts[0];
}

async function onMint() {
  const numOfMints = 1;
  const contract = new web3.eth.Contract(CONTRACT_ABI, "0x123ABC");

  console.log("minting...");

  try {
    await contract.methods.mint(numOfMints).send({from: userAddress, value: 40000000000000000});
  } catch(e) {
    console.log(e);
  }
}

window.addEventListener('load', async () => {
  init();
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
  document.querySelector("#btn-mint").addEventListener("click", onMint);
});
