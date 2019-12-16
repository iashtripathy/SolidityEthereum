pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    constructor () public {
        manager = msg.sender;
    } 
    //dynamic array
    //public because i dont have any problem if other persons want to see who entered 
    address[] public players;
    
    //payable because it has to receive ethers for someone to enter the pool
    function enter () public payable {
        /*
        min amount should be grater than 0.1 ether to enter pool and 
        the manager cannot enter the pool
        */
        require(msg.value >= .01 ether && msg.sender!=manager);
        
        players.push(msg.sender);
    }
    
    function random() private view returns(uint256){
        return uint(keccak256(block.difficulty,now,players));
    }
    
    function pickWinner() public onlyManagerCanCall{
    
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        //once winner is selected empty the array and make the length as 0
        players = new address[](0);
    }
    
    /*
    With modifier what solidity compiler does is:
    on whichever function that modifier is called the 
    solidity compiler takes everything inside that function and
    substitutes with _; in the modifier function.
    Here whatever is written inside onlyManagerCanCall is replaced inside the modifier function with _; 
    */
    modifier onlyManagerCanCall(){
        //require because only the manager is allowed to pick the winner
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns(address[]){
        return players;
    }
}