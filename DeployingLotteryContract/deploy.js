const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface,bytecode } = require('./compile');

//truffle-hdwallet-provider allows us to connect to Rinkeby network
const provider = new HDWalletProvider(
    /*
    We have to provide metamask seed and rinkeby network connection link
    */
    'tilt member exercise junior symptom shallow weekend stage travel next dash squeeze',
    'https://rinkeby.infura.io/v3/c20e712f4015417081aa5cbed0f1add7'
);

const web3 = new Web3(provider);

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account',accounts[0]);
    //interface is the ABI
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data : '0x' + bytecode })
    .send({ gas : '1000000', from : accounts[0] });
    console.log('Contract deployed to',result.options.address);
    //after this the address in result.options.address is present in rinkeby network
}
deploy();
/*note await cannot be used outside a function hence  we have 
we have created a function deploy and inside it we write await
*/