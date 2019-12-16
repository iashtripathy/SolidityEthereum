/*
It is a standard library that is build in to nodejs runtime. 
assert is used for making assertions about tests.
We might assert that some value is equal to another value.
*/
const assert = require('assert'); 

//ganache-cli serves as our local test network
const ganache = require('ganache-cli');

/*
Whenever we make use of Web3 we make use of constructor function
and we use the constructor function to make instances of web3 library. 
Here Web3 is a constructor function hence in capital letter
We can make multiple instances inside a project.Each instance purpose is to
connect to different ethereum networks.
*/
const Web3 = require('web3');

/*
creates an instance of Web3, ganache.provider() tells that instance of Web3 i.e:web3 to connect to local test network 
ganache that we are hosting in our machine.For connecting to another network
we replace ganache.provider() with some other thing.
*/
const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
beforeEach(async ()=>{
    /*
    web3 library has many different modules assigned to it and can
    be used for working with many cryptocurrencies.Here we are working with 
    ethereum module.Hence web3.eth
    Every function that we call with web3 is asynchronus in nature.
    It means a promise is returned with every call.
    */
    //Get list of all accounts
    accounts = await web3.eth.getAccounts();
    //Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments:['Hi there']})
    .send({ from:accounts[0], gas:'1000000'})
    //.deploy just creates an object
    //.send triggers the communication from web3 to the network
});

describe('Inbox test',()=>{
    it('Deploys a contract',()=>{
        console.log(inbox.methods);
        assert.ok(inbox.options.address);
    });
    it('Checking default message',async ()=>{
        //methods contain all public functions of our contract
        const message = await inbox.methods.message().call();
        assert.equal(message,'Hi there');
    });
    it('Can change the message',async ()=>{
        //sending a transaction to the network 
        /*
        If the below line is unsuccessful then an error is automatically thrown
        When we send a transaction to the function we usually dont assign the result to
        any variable because we getback the transaction receipt.
        and we can think of that the transaction ocurred successfully
        */
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message,'bye');
    });
});