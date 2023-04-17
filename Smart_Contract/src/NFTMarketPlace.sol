// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "../lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";
import "../lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    // soliity creates a getter function that returns the listingPrice
    uint256 public constant listingPrice = 0.00067 ether;

    address payable owner;

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) public marketItems;

    /////////////////EVENT////////////////////////
    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event MarketItemSold(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() {
        owner = payable(msg.sender);
    }


    modifier onlyOwner {
        require (msg.sender == owner, "Only owner can call this function");
        _;
    }

    // @dev create listing for ERC721 Assets
    // @params _nftcontract
    // @params _tokenId
    // @price _price
    // function ListItemForSale(
    //     address _nftcontract,
    //     uint256 _tokenId,
    //     uint256 _price
    // ) public payable nonReentrant {
    //     require(_price > 0, "amount must be greater than zero");
    //     require(msg.value == listingPrice, "not listing price");
    //     _itemIds.increment();
    //     uint256 itemIds = _itemIds.current();
    //     MarketItem storage _m = marketItems[itemIds];
    //     _m.itemId = itemIds;
    //     _m.nftContract = _nftcontract;
    //     _m.tokenId = _tokenId;
    //     _m.seller = payable(msg.sender);
    //     _m.owner = payable(address(0));
    //     _m.price = _price;
    //     _m.sold = false;

    //     IERC721(_nftcontract).transferFrom(msg.sender, address(this), _tokenId);

    //     emit MarketItemCreated(
    //         itemIds,
    //         _nftcontract,
    //         _tokenId,
    //         msg.sender,
    //         address(0),
    //         _price,
    //         false
    //     );
    // }





    function ListItemForSale(
        address _nftcontract,
        uint256 _tokenId,
        uint256 _price
    ) public payable nonReentrant {
        require(_price > 0, "amount must be greater than zero");
        require(msg.value == listingPrice, "not listing price");
        _itemIds.increment();
        uint256 itemIds = _itemIds.current();
        MarketItem memory _m = marketItems[itemIds];
        {_m.itemId = itemIds;
        _m.nftContract = _nftcontract;
        _m.tokenId = _tokenId;
        _m.seller = payable(msg.sender);
        _m.owner = payable(address(0));
        _m.price = _price;
        _m.sold = false;
        marketItems[itemIds] = _m;}

        IERC721(_nftcontract).transferFrom(msg.sender, address(this), _tokenId);

        emit MarketItemCreated(
            itemIds,
            _nftcontract,
            _tokenId,
            msg.sender,
            address(0),
            _price,
            false
        );
    }

    // function buyAsset(address _nftcontract, uint256 itemId)
    //     public
    //     payable
    //     nonReentrant
    // {
    //     uint256 price = marketItems[itemId].price;
    //     uint256 tokenIds = marketItems[itemId].tokenId;
    //     address seller = marketItems[itemId].seller;
    //     require(msg.value == price, "amount not asking price");
    //     require(seller != msg.sender, "cannot buy asset listed");
    //     marketItems[itemId].seller.transfer(msg.value);
    //     IERC721(_nftcontract).transferFrom(address(this), msg.sender, tokenIds);
    //     marketItems[itemId].owner = payable(msg.sender);
    //     marketItems[itemId].sold = true;
    //     _itemsSold.increment();
    //     payable(owner).transfer(listingPrice);
    //     emit MarketItemSold(
    //         itemId,
    //         _nftcontract,
    //         tokenIds,
    //         seller,
    //         owner,
    //         price,
    //         true
    //     );
    // }



    function buyAsset(uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = marketItems[itemId].price;
        uint256 tokenIds = marketItems[itemId].tokenId;
        address seller = marketItems[itemId].seller;
        address _nftcontract = marketItems[itemId].nftContract;
        require(msg.value == price, "amount not asking price");
        require(seller != msg.sender, "cannot buy asset listed");
        marketItems[itemId].owner = payable(msg.sender);
        marketItems[itemId].sold = true;
        marketItems[itemId].seller.transfer(msg.value);
        IERC721(_nftcontract).transferFrom(address(this), msg.sender, tokenIds);
        _itemsSold.increment();
        payable(owner).transfer(listingPrice);
        emit MarketItemSold(
            itemId,
            _nftcontract,
            tokenIds,
            seller,
            owner,
            price,
            true
        );
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemsCount = (_itemIds.current()) -
            (_itemsSold.current());
        uint256 currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](unsoldItemsCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (marketItems[i + 1].owner == address(0)) {
                uint256 currentId = marketItems[i + 1].itemId;
                MarketItem storage currentItem = marketItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNfts() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (marketItems[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (marketItems[i + 1].owner == msg.sender) {
                uint256 currentId = marketItems[i + 1].itemId;
                MarketItem storage currentItem = marketItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (marketItems[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (marketItems[i + 1].seller == msg.sender) {
                uint256 currentId = marketItems[i + 1].itemId;
                MarketItem storage currentItem = marketItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    
    function withdrawFee() external onlyOwner returns(bool success){
        (success, ) = payable(owner).call{value: address(this).balance}("");
    }
}