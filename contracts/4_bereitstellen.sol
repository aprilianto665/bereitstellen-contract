// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.30;

contract Bereitstellen {
    string public color;
    address private deployer;

    event ColorChanged(address by, string color);

    constructor() {
        deployer = msg.sender;
        color = "white";
    }

    modifier onlyDeployer() {
        require(msg.sender == deployer, "Can only be called by deployer");
        _;
    }

    function setColor(string memory _yourNewColor) public onlyDeployer {
        color = _yourNewColor;
        emit ColorChanged(msg.sender, _yourNewColor);
    }
}
