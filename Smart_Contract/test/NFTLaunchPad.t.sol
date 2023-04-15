// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Test.sol";
import "../src/NFTLaunchPad.sol";

contract NFTLaunchPadTest is Test {
    LaunchPadFactory public factory;
    LaunchPad public launchpad;


    function setUp() public {
        factory = new LaunchPadFactory(address(this));
 
    }

    function testWhitelistAddress() public {
        factory.whitelistAddress(address(this));
    }

    function testFailCreateLaunchPadWithoutFee() public {
        testWhitelistAddress();
        factory.createLaunchPad("Ogbeni", "OGN", "https://localhost.com/");
    }

    function testCreateLaunchPad() public {
        testWhitelistAddress();
        address newlaunchpad = factory.createLaunchPad{value: 0.001 ether}("Ogbeni", "OGN", "https://localhost.com/");
        launchpad = LaunchPad(payable(newlaunchpad));
    }

    function testStartLaunchPad() public {
        testCreateLaunchPad();
        launchpad.startLaunchPad(5 minutes, 0.0001 ether, 0.002 ether);
    }


    function testFailStartLaunchPad() public {
        testCreateLaunchPad();
        vm.prank(address(0x01));
        launchpad.startLaunchPad(5 minutes, 0.0001 ether, 100 ether);
    }

    function testFailDepositETH() public {
        testStartLaunchPad();
        launchpad.depositETH{value: 0.001 ether}(1);
    }

    function testDepositETH() public {
        testStartLaunchPad();
        vm.warp(block.timestamp + 1 minutes);
        launchpad.depositETH{value: 0.0003 ether}(3);
        vm.deal(address(0x03), 100 ether);
        vm.prank(address(0x03));
        launchpad.depositETH{value: 0.0003 ether}(3);
    }

    function testFailDepositETHBuyMoreThanAvailable() public {
        testStartLaunchPad();
        vm.warp(block.timestamp + 1 minutes);
        launchpad.depositETH{value: 0.051 ether}(51);
    }

    function testFailDepositETHIncorrectValue() public {
        testStartLaunchPad();
        vm.warp(block.timestamp + 1 minutes);
        launchpad.depositETH{value: 0.00001 ether}(1);
    }

    function testFailWithdrawNFTLaunchPadNotEnded() public {
        testDepositETH();
        launchpad.withdrawNFT();
    }

    function testFailWithdrawNFTDidntSuscribe() public {
        testDepositETH();
        vm.prank(address(0x02));
        vm.warp(block.timestamp + 5 minutes);
        launchpad.withdrawNFT();
    }


    function testWithdrawNFT() public {
        testDepositETH();
        vm.warp(block.timestamp + 5 minutes);
        launchpad.withdrawNFT();
        vm.prank(address(0x03));
        launchpad.withdrawNFT();

    }


    // TODO: Work on this test
    function testTransferLeftoverNFT() public {
        testWithdrawNFT();
        launchpad.transferLeftoverNFT(address(this));
    }


    function testTransferLeftoverNFTBeforeWithdraw() public {
        testDepositETH();
        vm.warp(block.timestamp + 5 minutes);
        launchpad.transferLeftoverNFT(address(this));
        launchpad.withdrawNFT();
        vm.prank(address(0x03));
        launchpad.withdrawNFT();
    }


    // TODO: write test for withdraw token


    function testWithdrawETH() public {
        testDepositETH();
        launchpad.withdrawETH(payable(address(this)), address(launchpad).balance);
    }

    function testTokenURI() public {
        testWithdrawNFT();
        launchpad.tokenURI(5);
    }


    receive() external payable{}

}
