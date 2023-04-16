// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Test.sol";
import "../src/NFTMarketPlace.sol";
import "../src/TestNFT.sol";

contract NFTMarketPlaceTest is Test {
    NFTMarketplace public marketplace;
    TestNFT public testnft;


    function setUp() public {
        marketplace = new NFTMarketplace();
        testnft = new TestNFT();
    }

    function testListItem() public {
        testnft.mint();
        testnft.approve(address(marketplace), 0);
        marketplace.ListItemForSale{value: 0.00067 ether}(address(testnft), 0, 1 ether);
    }

    function testGetMarketItem() public {
        testListItem();
        marketplace.marketItems(1);
    }


    function testBuyAsset() public {
        testListItem();
        vm.startPrank(address(0x01));
        vm.deal(address(0x01), 1000 ether);
        marketplace.buyAsset{value: 1 ether}(1);
        vm.stopPrank();
    }
        
    function testFetchItemListed() public {
        testListItem();
        marketplace.fetchItemListed();
    }
        
    function testFetchMyNfts() public {
        testListItem();
        marketplace.fetchMyNfts();
    }
        
    function testFetchMarketItems() public {
        testListItem();
        marketplace.fetchMarketItems();
    }

    function testWithdrawFee() public {
        testListItem();
        marketplace.withdrawFee();
    }
        

    receive() external payable{}

}
