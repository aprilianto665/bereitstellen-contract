const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);

  console.log("Your wallet address:", deployer.address);
  console.log("Balance:", ethers.formatEther(balance), "ETH");

  const Bereitstellen = await ethers.getContractFactory("Bereitstellen");

  const deployTx = await Bereitstellen.getDeployTransaction();
  const gasEstimate = await ethers.provider.estimateGas(deployTx);
  const feeData = await ethers.provider.getFeeData();
  const estimatedCost = gasEstimate * feeData.gasPrice;

  console.log("Gas estimation for deployment:", gasEstimate.toString());
  console.log("Estimated cost:", ethers.formatEther(estimatedCost), "ETH\n");

  console.log("Deploying contract...");
  const contract = await Bereitstellen.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  const initialColor = await contract.color();

  console.log("Your deployed contract address:", contractAddress);
  console.log("Initial color:", initialColor);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error.message);
    if (error.reason) console.error("Reason:", error.reason);
    process.exit(1);
  });
