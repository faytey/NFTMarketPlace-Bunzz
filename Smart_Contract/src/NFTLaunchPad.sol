// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract LaunchPadFactory {

    address owner;
    uint totalLaunchPads = 1;
    uint listingFee = 0.0006 ether;
    mapping(address => bool) whitelistedAddresses;
    mapping(uint => PadDetails) LaunchPads;

    struct PadDetails {
        string name;
        address creator;
        uint timeCreated;
        address padAddress;
    }

    event LaunchPadCreated(address _launchpad, address _seller);

    constructor() public {
        //DAO Address
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function whitelistAddress(address _address) public onlyOwner {
        require(_address != address(0), "Can't whitelist address zero");
        whitelistedAddresses[_address] = true;
    }

    function createLaunchPad(string memory _name, string memory symbol) external payable returns(address _launchpad){
        require(whitelistedAddresses[msg.sender], "Only whitelisted addresses can create a launchpad");
        require(msg.value >= listingFee, "Fee not up to listing fee");
        LaunchPad _newlaunchpad = new LaunchPad(_name, symbol, msg.sender);
        _launchpad = address(_newlaunchpad);
        PadDetails storage _PD = LaunchPads[totalLaunchPads];
        _PD.name = _name;
        _PD.creator = msg.sender;
        _PD.timeCreated = block.timestamp;
        _PD.padAddress = _launchpad;
        totalLaunchPads++;
        emit LaunchPadCreated(_launchpad, msg.sender);
    }
}

contract LaunchPad is ERC721 {
    address public owner;
    uint duration;
    uint totalNftsForSale;
    uint amtRaised;
    uint price;
    uint256 startTime;
    uint256 endTime;
    uint256 totalAmountNeeded;
    uint mintedTokenId;
    address[] subscribers;
    mapping(address => uint) NFTperAddr;
    uint256 numberOfSubscribers;
    uint256 totalNFTCommitment;
  
    mapping(address => uint) public subscriberIndex;  // Get the index of a suscriber

    ///////////////  EVENTS ////////////////////
    event LaunchPadStarted(uint _startTime);
    event LaunchPadEnded(uint _endTime);

    constructor(string memory _name,string memory _symbol, address _owner) ERC721(_name, _symbol) {
        owner = _owner;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }


    function startLaunchPad(uint256 _duration, uint _nftprice, uint256 _totalAmountNeeded, uint _totalNftsforSale) external onlyOwner {
        

        require(_totalNftsforSale != 0, "Can't list zero nfts for sale");
        require(_duration != 0, "Duration can't be zero");
        require(duration == 0, "Launchpad already started");


        price = _nftprice;
        duration = _duration;
        startTime = block.timestamp;
        endTime = block.timestamp + duration;
        totalNftsForSale = _totalNftsforSale;
        totalAmountNeeded = _totalAmountNeeded;


        emit LaunchPadStarted(block.timestamp);


    }

    function depositETH(uint256 _amtofNFT) external payable returns(bool success){

        require(block.timestamp < endTime, "Campaign ended");
        require(block.timestamp > startTime, "Campaign not started yet");
        require(_amtofNFT < totalNftsForSale, "You can't buy more NFTs than is up for sale");
        require(amtRaised < totalAmountNeeded, "Maximum Amount Reached");
        require(totalNFTCommitment < totalNftsForSale, "All NFTs have been booked");
        require(msg.value == _amtofNFT * price, "Send appropriate value for NFT");
        NFTperAddr[msg.sender] += _amtofNFT;
        amtRaised += msg.value;
        subscribers.push(msg.sender);
        subscriberIndex[msg.sender] = numberOfSubscribers;
        numberOfSubscribers++;
        totalNFTCommitment += _amtofNFT;
        success = true;
    }

    function depositToken(address _token, uint256 _amtofNFT) public returns(bool success){
        // TODO
        // require(padId[_id].exists == true, "Token does not exist");
        // require(padId[_id].endTime < block.timestamp, "campaign not yet ended");
        // require(_amount <= padId[_id].tokenABalance, "Not enough tokens");
        // require(msg.sender == creator[_id].creator, "You are not the admin");
        // padId[_id].TokenA.transfer(msg.sender, _amount);
        // success = true;
    }

    function withdrawNFT() public returns(bool success){

        uint _amtofNFT = NFTperAddr[msg.sender];
        require(block.timestamp > endTime, "campaign not yet ended");
        require(_amtofNFT > 0, "You did not suscribe");

        for (uint i = 1; i <= _amtofNFT; i++) {
            _mint(msg.sender, mintedTokenId);
            mintedTokenId++;
        }

        success = true;
    }

    function transferLeftoverNFT(address recipient) external onlyOwner returns(bool success){
        require(block.timestamp > endTime, "LaunchPad has not ended");
        require(totalNFTCommitment < totalNftsForSale, "All NFTs has been minted");

        for (totalNFTCommitment; totalNFTCommitment < totalNftsForSale; totalNFTCommitment) {
            _mint(recipient, mintedTokenId);
            mintedTokenId++;
        }
        success = true;
    }

    // function transferLeftoverTokens(IERC20 _tokenContract) public returns(bool success){
    //     require(msg.sender == owner, "Not Owner");
    //     uint256 amount = _tokenContract.balanceOf(address(this));
    //     require(amount > 0, "This Token is not available in this contract ");
    //     _tokenContract.transferFrom(owner,address(this), amount );
    //     success = true;
    // }

    // function withdrawEth() external payable {
    //     require(msg.sender == owner, "Not Owner");
    //     payable(owner).transfer(address(this).balance);
    // }

   // To enable the contract send out ether... to be done by only the launchpad owner
    function withdrawETH(address payable inputAddress, uint amount) external onlyOwner{
        require(inputAddress != address(0), "Can't send ether to address zero");
        require(amount <= address(this).balance, "Amount not available for withdrawal");
        (bool success,) = inputAddress.call{value:amount}("");
        require(success, "This transaction has failed");
    }

    //To withdraw USDT or other tokens deposited
   function withdrawToken(address _tokenContractAddress, address _receivingAddress, uint256 _tokenAmount) public onlyOwner {
        require(_receivingAddress != address(0), "Can't send tokens to address zero");
        // TODO
        // IERC20(_tokenContractAddress).transfer(_receivingAddress, _tokenAmount * 10 ** decimals());
   }

}
