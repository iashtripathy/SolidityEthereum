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
let lottery;
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
    //lottery is our contract in the blockchain
    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode}) 
    .send({ from:accounts[0], gas:'1000000'})
    //accounts[0] now becomes the address who deployed the contract
    //.deploy just creates an object
    //.send triggers the communication from web3 to the network
});

describe('Lottery test',()=>{
    it('Deploys a contract',()=>{
        console.log(lottery.methods);
        console.log("Manager address:\n"+ accounts[0]);
        //lottery.options.address is the place where our contract exists
        //the below line tells whether the contract is deployed successfully to the blockchain or not
        assert.ok(lottery.options.address);
    });
    it('Not allowing manager to enter to pool',async ()=>{
        //methods object contain all functions of our contract
        /*call is used for only calling a function
        for sending a transaction we have to use send({}) and inside send pass
        the object which contains who wants to send the transaction
        and how much gas has to be spend
        */
       const manager = await lottery.methods.manager().call();
       console.log(manager);
       try{
        await lottery.methods.enter().send({
            from:accounts[0],
            value:web3.utils.toWei('1.00','ether')
        });
        assert(false);
       }
       catch(err){
           assert(err);
       }
    });
    it('Allows one account to enter',async ()=>{
        //sending a transaction to the network 
        /*
        If the below line is unsuccessful then an error is automatically thrown
        When we send a transaction to the function we usually dont assign the result to
        any variable because we getback the transaction receipt.
        and we can think of that the transaction ocurred successfully
        */
       //console.log("Above above players");
        await lottery.methods.enter().send({ 
            from: accounts[1],
            value:Web3.utils.toWei('0.02','ether')
            //value indicates amount accounts[0] wants to send to enter into the pool
        });
        //console.log("After sending transaction");
        const players = await lottery.methods.getPlayers().call(/* {
            from:accounts[0]
        } */);
        //console.log("After collectiing player");
        assert.equal(accounts[1],players[0]);
        //console.log("After checking accounts[0]===players[0]");
        assert.equal(1,players.length);
    });
    it('Allows multiple accounts to enter',async ()=>{
        await lottery.methods.enter().send({ 
            from: accounts[1],
            value:web3.utils.toWei('0.02','ether')
            //value indicates amount the person wants to send to enter into the pool
        });
        await lottery.methods.enter().send({ 
            from: accounts[2],
            value:web3.utils.toWei('0.03','ether')
            //value indicates amount the person wants to send to enter into the pool
        });
        await lottery.methods.enter().send({ 
            from: accounts[3],
            value:web3.utils.toWei('0.04','ether')
            //value indicates amount the person wants to send to enter into the pool
        });
        const players = await lottery.methods.getPlayers().call(/* {
            from:accounts[0]
        } */);
        assert.equal(accounts[1],players[0]);
        assert.equal(accounts[2],players[1]);
        assert.equal(accounts[3],players[2]);
        assert.equal(3,players.length);
    });
    it('Not allowing accounts who send < 0.01 ether',async ()=>{
        try{
            await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei('0.001','ether')
            });
            //the below statement definitely makes this false
            assert(false);
        }
        catch(err){
            //console.log(err);
            assert(err);
        }

    });
    it('Not allowing accounts other than manager to call pickWinner',async ()=>{
        try{
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
            //the below statement definitely makes this false
            assert(false);
        }
        catch(err){
            assert(err);
        }
    });
    it('Sends money to winner and resets the players array and contact Balance',async ()=>{
        
        await lottery.methods.enter().send({
            from:accounts[1],
            value:web3.utils.toWei('2','ether')
        });

        const initialAmount = await web3.eth.getBalance(accounts[1]);

        
        console.log(web3.utils.fromWei(initialAmount,'ether'));
        
        //in the below line from indicates from which account call is made
        //transaction fee for the below transaction is cut from managers account ie:accounts[0]
        await lottery.methods.pickWinner().send({
            from:accounts[0]
        });
                
        const finalAmount = await web3.eth.getBalance(accounts[1]);
        console.log(web3.utils.fromWei(finalAmount,'ether'));
        assert((web3.utils.fromWei(finalAmount,'ether') - web3.utils.fromWei(initialAmount,'ether')) == 2);
        
        //checking whether players array is emptied after choosing winnier or not
        const players = await lottery.methods.getPlayers().call();
        assert(players.length == 0);
        
        //checking whether contractBalance is set to 0 after all amount being transfered to winners accounts
        //lottery.options.address is the address where our contract is stored
        const contractBalance = await web3.eth.getBalance(lottery.options.address);
        assert(web3.utils.fromWei(contractBalance,'ether') ==0 );
    });

});