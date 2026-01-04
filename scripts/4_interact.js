const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const contractAddress = process.env.DEPLOYED_CONTRACT_ADDRESS;

  if (!contractAddress) {
    throw new Error("DEPLOYED_CONTRACT_ADDRESS not found in .env file");
  }

  const [deployer] = await ethers.getSigners();
  console.log("Your wallet address:", deployer.address);
  console.log("Contract address:", contractAddress);

  const Bereitstellen = await ethers.getContractFactory("Bereitstellen");
  const contract = Bereitstellen.attach(contractAddress);

  const currentColor = await contract.color();
  console.log("Current color:", currentColor);

  const newColor = "blue";
  console.log("\nChanging color to:", newColor);

  const gasEstimate = await contract.setColor.estimateGas(newColor);
  console.log("Gas estimation for setColor:", gasEstimate.toString());

  console.log("\nSending transaction...");
  const tx = await contract.setColor(newColor);
  console.log("Transaction hash:", tx.hash);

  console.log("Waiting for confirmation...");
  const receipt = await tx.wait();

  console.log("Block number:", receipt.blockNumber);
  console.log("Gas used:", receipt.gasUsed.toString());

  const updatedColor = await contract.color();
  console.log("Updated color:", updatedColor);

  const event = receipt.logs.find((log) => {
    try {
      return contract.interface.parseLog(log).name === "ColorChanged";
    } catch {
      return false;
    }
  });

  if (event) {
    const parsed = contract.interface.parseLog(event);
    console.log("\nEvent emitted:");
    console.log("- by:", parsed.args.by);
    console.log("- color:", parsed.args.color);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error.message);
    if (error.reason) console.error("Reason:", error.reason);
    process.exit(1);
  });
