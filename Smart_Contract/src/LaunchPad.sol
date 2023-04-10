//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

import "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

contract LaunchPad {
    address public owner;
    uint256 id;
    uint256 index;

    struct PadDetails{
        string name;
        IERC20 TokenA;
        IERC20 TokenB;
        uint256 startTime;
        uint256 endTime;
        uint256 tokenBQuantity;
        uint256 tokenANeeded;
        uint256 tokenABalance;
        address[] subscribers;
        mapping(address => uint) amount;
        uint256 numberOfSubscribers;
        bool exists;
    }

    struct CreatorDetail{
        address creator;
        uint256 id_;
        string nameOfPad;
    }

    mapping(uint256 => PadDetails) public padId;
    mapping(uint256 => CreatorDetail) public creator;
    mapping(address => bool) public subscriberIndex;

    constructor(address _owner){
        owner = _owner;
        id = 0;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function createLaunchPad(string memory _name, IERC20 _tokenA, IERC20 _tokenB,uint256 _startTime, uint256 _seconds, uint256 _totalPool, uint256 _tokenAAmountNeeded) external payable returns(uint256 _id){
        uint256 fee = 0.01 ether;
        require(msg.value == fee, "Amount must be 0.01ETH");
        require(_tokenB.balanceOf(msg.sender) >= _totalPool, "Insufficient token balance");
        _tokenB.transferFrom(msg.sender, address(this), _totalPool);
        id++;
        PadDetails storage pad = padId[id];
        uint256 startTimeInSeconds = _startTime;
        uint256 endTimeInSeconds = _seconds;
        pad.name = _name;
        pad.TokenA = _tokenA;
        pad.TokenB = _tokenB;
        pad.startTime = block.timestamp + startTimeInSeconds;
        pad.endTime = pad.startTime + endTimeInSeconds;
        pad.tokenBQuantity = _totalPool;
        pad.tokenANeeded = _tokenAAmountNeeded;
        pad.tokenABalance = 0;
        pad.exists = true;
        CreatorDetail storage info = creator[id];
        info.creator = msg.sender;
        info.nameOfPad = pad.name;
        _id= id;
        info.id_ = _id;
    }

    function deposit(uint256 _id, uint256 _amount) external returns(bool success){
        require(padId[_id].exists == true, "This Campaign does not exist");
        require(block.timestamp < padId[_id].endTime, "Campaign ended");
        require(padId[_id].startTime < block.timestamp, "Campaign not started yet");
        require(padId[_id].tokenABalance < padId[_id].tokenBQuantity, "Maximum Amount Reached");
        uint256 balance = padId[_id].tokenBQuantity - padId[_id].tokenABalance;
        require(_amount <= balance, 'You can only deposit a lower amount');
        IERC20 tokenA = padId[_id].TokenA;
        require(tokenA.balanceOf(msg.sender) >= _amount, "Insufficient funds");
        tokenA.transferFrom(msg.sender, address(this), _amount);
        padId[_id].subscribers.push(msg.sender);
        subscriberIndex[msg.sender] = true;
        padId[_id].numberOfSubscribers++;
        padId[_id].amount[msg.sender] += _amount;
        padId[_id].tokenABalance += _amount;
        success = true;
    }

    function transferTokenA(uint256 _id, uint256 _amount) public returns(bool success){
        require(padId[_id].exists == true, "Token does not exist");
        require(padId[_id].endTime < block.timestamp, "campaign not yet ended");
        require(_amount <= padId[_id].tokenABalance, "Not enough tokens");
        require(msg.sender == creator[_id].creator, "You are not the admin");
        padId[_id].TokenA.transfer(msg.sender, _amount);
        success = true;
    }
    function transferNFT(uint256 _id, address nftContract, address recipient, uint256 tokenId) public returns(bool success){
        require(padId[_id].exists == true, "LaunchPad does not exist");
        require(subscriberIndex[msg.sender] == true, "You don't belong here");
        require(padId[_id].endTime < block.timestamp, "campaign not yet ended");

        IERC721 nft = IERC721(nftContract);
        nft.safeTransferFrom(address(this), msg.sender, tokenId);
        success = true;
    }
    function transferLeftoverTokens(IERC20 _tokenContract) public returns(bool success){
        require(msg.sender == owner, "Not Owner");
        uint256 amount = _tokenContract.balanceOf(address(this));
        require(amount > 0, "This Token is not available in this contract ");
        _tokenContract.transferFrom(owner,address(this), amount );
        success = true;
    }

    function withdrawEth() external payable {
        require(msg.sender == owner, "Not Owner");
        payable(owner).transfer(address(this).balance);
    }

   // to make the contract send out ether... to be done by only the admin
function sendOutEther(address payable inputAddress, uint amount) external onlyOwner{
    (bool success,) = inputAddress.call{value:amount}("");
    require(success, "the transaction has failed");
}

//To withdraw USDT or other tokens deposited
   function transferToken(address _tokenContractAddress, address _receivingAddress, uint256 _tokenAmount) public onlyOwner {
        // IERC20(_tokenContractAddress).transfer(_receivingAddress, _tokenAmount * 10 ** decimals());
   }


}