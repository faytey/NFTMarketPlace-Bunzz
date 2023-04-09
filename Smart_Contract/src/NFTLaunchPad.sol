// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "Smart_Contract/lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

contract LaunchPad {

    uint listingFee = 0.0006 ether;
    uint totalLaunchPads = 1;

    event LaunchPadCreated(address _nft, address _seller, uint _amtforsale);
    event LaunchPadStarted(uint _id, address _nft, address _seller);


    struct launchpad {
        uint id;
        address nft;
        uint amtRaised;
        address seller;
        uint price;
        uint startTime;
        uint endTime;
        uint duration;
        uint totalNftsForSale;
        uint[] listOfNftsForSale;
    }


    mapping (uint => launchpad) launchpads;


    function createLaunchPad(address _nft, uint _price, uint _amtforsale) public returns (uint _id){
        require(msg.value > listingFee, "Amount is below listing fee");
        require(_nft != address(0), "Can't list address zero");
        require(_amtforsale != 0, "Can't list zero nfts for sale");

        launchpad storage _launchpad = launchpads[_id];

        _launchpad.id = totalLaunchPads;
        _launchpad.nft = _nft;
        _launchpad.price = _price;
        _launchpad.seller = msg.sender;
        _launchpad.totalNftsForSale = _amtforsale;



        emit LaunchPadCreated(_nft, msg.sender, _amtforsale);

        IERC721(_nft).transferFrom(msg.sender, address(this), tokenId);

        totalLaunchPads = totalLaunchPads + 1;
    }




    function startLaunchPad(uint _id, uint _duration) public {
        launchpad storage _launchpad = launchpads[_id];
        require(_duration != 0, "Duration can't be zero");
        require (msg.sender == _launchpad.seller, "Only seller can start Launchpad");
        require(_launchpad.duration == 0, "Launchpad already started");


        _launchpad.duration = _duration;
        _launchpad.startTime = block.timestamp;
        _launchpad.endTime = block.timestamp + duration;

        emit LaunchPadStarted(_id, _launchpad.nft, msg.sender);
    }
}
