const TonWeb = require("tonweb");
const TonWebMnemonic = require("tonweb-mnemonic");
const { Address, BN } = require("tonweb").utils;
const { Cell } = require("tonweb").boc;
const FTContract = require("./fungible-token");

const mnemonic = [
  "indicate",
  "device",
  "turtle",
  "win",
  "goddess",
  "eternal",
  "second",
  "thrive",
  "collect",
  "zero",
  "fossil",
  "east",
  "mom",
  "talk",
  "dad",
  "motion",
  "hospital",
  "october",
  "grow",
  "fade",
  "olive",
  "salute",
  "spirit",
  "remember",
];

const provider = new TonWeb.HttpProvider(
  "https://testnet.toncenter.com/api/v2/jsonRPC",
  { apiKey: "6512cc5abe9b47a0ae7b8999d8c7dd82e3f455ff4acd496282ae45539ef81081" }
);

const tonweb = new TonWeb(provider);

const addr1 = "0QCM680IOekq8Q4QNbTgshkigDbOy5_5DTX1i-OBzpcuQnmI"; // owner
const addr2 = "0QA6eKxdA7B73Ar37aUA2Mz1-uEvzq97dwVgTokWLSyzkfWK";
let addr_contract;

async function transfer(contract, keyPair, params) {
  const wallet = new tonweb.wallet.all.v3R1(provider, {
    publicKey: keyPair.publicKey,
    wc: 0,
  });
  const walletAddress = await wallet.getAddress();
  console.log(
    "wallet address =",
    walletAddress.toString(true, true, false, false)
  );

  const seqno = (await wallet.methods.seqno().call()) || 0;
  console.log("seqno =", seqno);

  console.log(
    await wallet.methods
      .transfer({
        secretKey: keyPair.secretKey,
        toAddress: (
          await contract.getAddress()
        ).toString(true, true, false, false),
        amount: TonWeb.utils.toNano("0.01"),
        seqno: seqno,
        payload: await contract.createTransferBody({
          receiver: params.receiver,
          amount: params.amount,
        }),
        sendMode: 64,
      })
      .send()
  );
}

async function transferToCosmos(contract, keyPair, params) {
  const wallet = new tonweb.wallet.all.v3R1(provider, {
    publicKey: keyPair.publicKey,
    wc: 0,
  });
  const walletAddress = await wallet.getAddress();
  console.log(
    "wallet address =",
    walletAddress.toString(true, true, false, false)
  );

  const seqno = (await wallet.methods.seqno().call()) || 0;
  console.log("seqno =", seqno);

  console.log(
    await wallet.methods
      .transfer({
        secretKey: keyPair.secretKey,
        toAddress: (
          await contract.getAddress()
        ).toString(true, true, false, false),
        amount: TonWeb.utils.toNano("0.01"),
        seqno: seqno,
        payload: await contract.createTransferToCosmosBody({
          amount: params.amount,
        }),
        sendMode: 64,
      })
      .send()
  );
}

async function receivedFromCosmos(contract, keyPair, params) {
  const wallet = new tonweb.wallet.all.v3R1(provider, {
    publicKey: keyPair.publicKey,
    wc: 0,
  });
  const walletAddress = await wallet.getAddress();
  console.log(
    "wallet address =",
    walletAddress.toString(true, true, false, false)
  );

  const seqno = (await wallet.methods.seqno().call()) || 0;
  console.log("seqno =", seqno);

  console.log(
    await wallet.methods
      .transfer({
        secretKey: keyPair.secretKey,
        toAddress: (
          await contract.getAddress()
        ).toString(true, true, false, false),
        amount: TonWeb.utils.toNano("0.01"),
        seqno: seqno,
        payload: await contract.createReceivedFromCosmosBody({
          receiver: params.receiver,
          amount: params.amount,
        }),
        sendMode: 64,
      })
      .send()
  );
}

async function transferCall(contract, keyPair, params) {
  const wallet = new tonweb.wallet.all.v3R1(provider, {
    publicKey: keyPair.publicKey,
    wc: 0,
  });
  const walletAddress = await wallet.getAddress();
  console.log(
    "wallet address =",
    walletAddress.toString(true, true, false, false)
  );

  const seqno = (await wallet.methods.seqno().call()) || 0;
  console.log("seqno =", seqno);

  console.log(
    await wallet.methods
      .transfer({
        secretKey: keyPair.secretKey,
        toAddress: (
          await contract.getAddress()
        ).toString(true, true, false, false),
        amount: TonWeb.utils.toNano("0.01"),
        seqno: seqno,
        payload: await contract.createTransferCallBody({
          receiver: params.receiver,
          amount: params.amount,
          payload: params.payload,
        }),
        sendMode: 64,
      })
      .send()
  );
}

async function deploy(contract, keyPair) {
  const wallet = new tonweb.wallet.all.v3R1(provider, {
    publicKey: keyPair.publicKey,
    wc: 0,
  });
  const walletAddress = await wallet.getAddress();
  console.log(
    "wallet address =",
    walletAddress.toString(true, true, false, false)
  );

  const seqno = (await wallet.methods.seqno().call()) || 0;
  console.log("seqno =", seqno);

  console.log(
    await wallet.methods
      .transfer({
        secretKey: keyPair.secretKey,
        toAddress: (
          await contract.getAddress()
        ).toString(true, true, false, false),
        amount: TonWeb.utils.toNano("0.01"),
        seqno: seqno,
        payload: null, // body
        sendMode: 3,
        stateInit: (await contract.createStateInit()).stateInit,
      })
      .send()
  );
}

async function mint(contract, keyPair, params) {
  const wallet = new tonweb.wallet.all.v3R1(provider, {
    publicKey: keyPair.publicKey,
    wc: 0,
  });
  const walletAddress = await wallet.getAddress();
  console.log(
    "wallet address =",
    walletAddress.toString(true, true, false, false)
  );

  const seqno = (await wallet.methods.seqno().call()) || 0;
  console.log("seqno =", seqno);

  console.log(
    await wallet.methods
      .transfer({
        secretKey: keyPair.secretKey,
        toAddress: (
          await contract.getAddress()
        ).toString(true, true, false, false),
        amount: TonWeb.utils.toNano("0.01"),
        seqno: seqno,
        payload: await contract.createMintBody({
          account: params.account,
          amount: params.amount,
        }),
        sendMode: 3,
      })
      .send()
  );
}

async function burn(contract, keyPair, params) {
  const wallet = new tonweb.wallet.all.v3R1(provider, {
    publicKey: keyPair.publicKey,
    wc: 0,
  });
  const walletAddress = await wallet.getAddress();
  console.log(
    "wallet address =",
    walletAddress.toString(true, true, false, false)
  );

  const seqno = (await wallet.methods.seqno().call()) || 0;
  console.log("seqno =", seqno);

  console.log(
    await wallet.methods
      .transfer({
        secretKey: keyPair.secretKey,
        toAddress: (
          await contract.getAddress()
        ).toString(true, true, false, false),
        amount: TonWeb.utils.toNano("0.01"),
        seqno: seqno,
        payload: await contract.createBurnBody({
          account: params.account,
          amount: params.amount,
        }),
        sendMode: 3,
      })
      .send()
  );
}

async function init() {
  const keyPair = await TonWebMnemonic.mnemonicToKeyPair(mnemonic);
  const wallet = new tonweb.wallet.all.v3R1(provider, {
    publicKey: keyPair.publicKey,
    wc: 0,
  });

  const contract = new FTContract(provider, {
    name: "My Token",
    symbol: "NUAH",
    icon: "./icon.svg",
    spec: "v1.0.0",
    decimals: 9,
    totalSupply: TonWeb.utils.toNano("0"),
    ownerAddr: new BN(
      new Address(addr1).toString(false, true, false, false).split(":")[1],
      16
    ),
    salt: 1656344980470, // salt for unique address (timestamp, only for creation)
  });
  const contractAddress = await contract.getAddress();
  addr_contract = contractAddress.toString(true, true, false, false);

  console.log("contract address =", addr_contract);

  return { contract, addr_contract, keyPair };
}

async function log_balance(contract) {
  console.log(await contract.getBalanceOf(new Address(addr_contract)));
  console.log(await contract.getBalanceOf(new Address(addr1)));
  console.log(await contract.getBalanceOf(new Address(addr2)));
}

module.exports = {
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
};
