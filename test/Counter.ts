import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", () => {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  const deployCounterFixture = async () => {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy("Antonin", 5);

    await counter.deployed();

    return { counter };
  };

  describe("Deployment", () => {
    it("Should set the initial name", async () => {
      const { counter } = await loadFixture(deployCounterFixture);

      expect(await counter.getName()).to.equal("Antonin");
    });

    it("Should set the initial count", async () => {
      const { counter } = await loadFixture(deployCounterFixture);

      expect(await counter.getCount()).to.equal(5);
    });
  });

  describe("Counting", () => {
    it("Should increment the count", async () => {
      const { counter } = await loadFixture(deployCounterFixture);
      await counter.increment();

      expect(await counter.getCount()).to.equal(6);
    });

    it("Should decrement the count", async () => {
      const { counter } = await loadFixture(deployCounterFixture);
      await counter.decrement();

      expect(await counter.getCount()).to.equal(4);
    });
  });

  describe("Naming", () => {
    it("Should set the new name", async () => {
      const { counter } = await loadFixture(deployCounterFixture);
      await counter.setName("Abid");

      expect(await counter.getName()).to.equal("Abid");
    });
  });
});
