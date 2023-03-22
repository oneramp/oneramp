const { ethers } = require("hardhat")
const { expect } = require("chai")

describe("OffRampContract", function () {
  let offRampContract, owner, depositor, withdrawer, token, token2

  before(async function () {
    const OffRampContract = await ethers.getContractFactory("OffRampContract")
    offRampContract = await OffRampContract.deploy()
    await offRampContract.deployed()

    const ERC20TokenMock = await ethers.getContractFactory("ERC20TokenMock")
    const ERC20TokenMock2 = await ethers.getContractFactory("ERC20TokenMock2")
    token = await ERC20TokenMock.deploy()
    token2 = await ERC20TokenMock2.deploy()
    await token.deployed()
    await token2.deployed()
    ;[owner, depositor, withdrawer] = await ethers.getSigners()
    await token
      .connect(owner)
      .transfer(depositor.address, ethers.utils.parseUnits("1000", 18))
    await offRampContract.addAllowedToken(token.address)
  })

  it("should allow the owner to add allowed tokens", async function () {
    await offRampContract.connect(owner).addAllowedToken(token2.address)
    const isTokenAllowed = await offRampContract.tokenIsAllowed(token2.address)
    expect(isTokenAllowed).to.equal(true)
  })

  it("should not allow non-owner to add allowed tokens", async function () {
    await expect(
      offRampContract.connect(depositor).addAllowedToken(token.address)
    ).to.be.revertedWith("Ownable: caller is not the owner")
  })

  it("should allow a user to deposit an allowed token", async function () {
    const depositAmount = ethers.utils.parseUnits("100", 18)
    await token
      .connect(depositor)
      .approve(offRampContract.address, depositAmount)
    await offRampContract
      .connect(depositor)
      .depositToken(token.address, depositAmount)

    const contractTokenBalance = await offRampContract.contractTokenBalances(
      token.address
    )
    expect(contractTokenBalance).to.equal(depositAmount)
  })

  it("should not allow a user to deposit a disallowed token", async function () {
    const depositAmount = ethers.utils.parseUnits("10", 18)
    const disallowedTokenAddress = "0x0000000000000000000000000000000000000001"

    await expect(
      offRampContract.depositToken(disallowedTokenAddress, depositAmount)
    ).to.be.revertedWith("token currently allowed")
  })

  it("should allow the owner to withdraw tokens", async function () {
    const depositAmount = ethers.utils.parseUnits("100", 18)
    await token
      .connect(depositor)
      .approve(offRampContract.address, depositAmount)
    await offRampContract
      .connect(depositor)
      .depositToken(token.address, depositAmount)
    const initialWithdrawerBalance = await token.balanceOf(withdrawer.address)

    await offRampContract
      .connect(owner)
      .withdrawToken(withdrawer.address, token.address, depositAmount)

    const finalWithdrawerBalance = await token.balanceOf(withdrawer.address)
    expect(finalWithdrawerBalance).to.equal(
      initialWithdrawerBalance.add(depositAmount)
    )
  })

  it("should not allow non-owner to withdraw tokens", async function () {
    const depositAmount = ethers.utils.parseUnits("100", 18)
    await expect(
      offRampContract
        .connect(depositor)
        .withdrawToken(withdrawer.address, token.address, depositAmount)
    ).to.be.revertedWith("Ownable: caller is not the owner")
  })

  it("should not allow the owner to withdraw a disallowed token", async function () {
    const disallowedTokenAddress = "0x0000000000000000000000000000000000000001"
    const depositAmount = ethers.utils.parseUnits("100", 18)
    await expect(
      offRampContract
        .connect(owner)
        .withdrawToken(
          withdrawer.address,
          disallowedTokenAddress,
          depositAmount
        )
    ).to.be.revertedWith("token currently allowed")
  })
})
