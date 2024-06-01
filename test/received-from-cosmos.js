const TonWeb = require("tonweb");
const { Address, BN } = require("tonweb").utils;
const {
  addr1,
  addr2,
  init,
  deploy,
  mint,
  burn,
  transfer,
  transferToCosmos,
  receivedFromCosmos,
  log_balance,
} = require("../interface/interface");

async function test() {
  const { contract, addr_contract, keyPair } = await init();
  await receivedFromCosmos(contract, keyPair, {
    receiver: new Address(addr1),
    amount: 10,
  });
  await log_balance(contract);
}

test();
