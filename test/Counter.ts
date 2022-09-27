import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter contract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployCounterFixture() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy("Antonin", 5);

    await counter.deployed();

    return { counter };
  }

  describe("Deployment", function () {
    it("Should set the right initial name", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      expect(await counter.getName()).to.equal("Antonin");
    });

    it("Should set the right initial count", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      expect(await counter.getCount()).to.equal(5);
    });
  });

  describe("Counting", function () {
    it("Increment", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      await counter.increment();

      expect(await counter.getCount()).to.equal(6);
    });

    it("Decrement", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      await counter.decrement();

      expect(await counter.getCount()).to.equal(4);
    });
  });
});
