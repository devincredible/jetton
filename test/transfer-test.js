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
  const { contract, keyPair } = await init();
  await transfer(contract, keyPair, {
    receiver: new Address(addr2),
    amount: TonWeb.utils.toNano("1"),
  });
  await log_balance(contract);
}

test();
