// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Script.sol";
import "../src/NFTLaunchPad.sol";
import "../src/NFTMarketPlace.sol";

contract DeployScript is Script {
    LaunchPadFactory launchpadFactory;
    LaunchPad launchpad;
    NFTMarketplace marketPlace;
    function setUp() public {}

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        launchpadFactory = new LaunchPadFactory(0xe97a4C739b738e57539566547c3757ecb1bA223a);
        launchpadFactory.whitelistAddress(0xe97a4C739b738e57539566547c3757ecb1bA223a);
        address _launchpad = launchpadFactory.createLaunchPad{value: 0.006 ether}("Benz", "BNZ","ipfs://Qmd9FE1XKkdpddUUG9nUkgQruVV2B8aE2cuCayS1QcWRTS");
        launchpad = LaunchPad(_launchpad);
        // marketPlace = new NFTMarketplace();

        vm.stopBroadcast();
    }
}
