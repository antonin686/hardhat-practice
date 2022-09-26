import { ethers } from "hardhat";

async function main() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy("Antonin", 5);

  await counter.deployed();

  console.log(await counter.getName());
  console.log(await counter.getCount());
  await counter.increment();
  console.log(await counter.getCount());
  await counter.increment();
  console.log(await counter.getCount());
  await counter.decrement();
  console.log(await counter.getCount());
  await counter.setName("Abid");
  console.log(await counter.getName());
}

// Handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
