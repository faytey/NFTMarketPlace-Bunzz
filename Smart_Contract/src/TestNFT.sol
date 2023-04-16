// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";


contract TestNFT is ERC721("Test", "TST") {
    uint256 tokenId;
    function mint() public {
        _mint(msg.sender, tokenId);
        tokenId++;
    }
}