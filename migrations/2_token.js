// ============ Contracts ============

// Token
// deployed first
const PINImplementation = artifacts.require("PINDelegate");
const PINProxy = artifacts.require("PINDelegator");

// ============ Main Migration ============

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployToken(deployer, network),
  ]);
};

module.exports = migration;

// ============ Deploy Functions ============


async function deployToken(deployer, network) {
  await deployer.deploy(PINImplementation);
  if (network != "mainnet") {
    await deployer.deploy(PINProxy,
      "PIN",
      "PIN",
      18,
      "375000000000000000000000", // print extra few mil for user
      PINImplementation.address,
      "0x"
    );
  } else {
    await deployer.deploy(PINProxy,
      "PIN",
      "PIN",
      18,
      "375000000000000000000000",
      PINImplementation.address,
      "0x"
    );
  }

}
