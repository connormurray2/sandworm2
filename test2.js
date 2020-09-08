import bsv from 'bsv'
console.log('here')
//const Forge = require('txforge')
//const Cast = require('txforge')
//const P2RPH = require('txforge/casts')
import rpuzzle from 'rpuzzle'
//const KeyPair = require('bsv/keypair')
console.log(bsv.PrivKey)

var fundPubKey = '17R9pts2DZdQdn4VFpFLowzVB4Udr5Rhsv'
var childPubKey = '1KmoAaTvkR5heFeYaaRGUapEmcj9J1J7g2'
var childPrivKey = new bsv.PrivKey()
child2PrivKey = childPrivKey.fromWif('L3T4Z4PQihtZzworxHN2yAUn1BYdkHPT8zeQSuHe8R3CtynLgkxv')
var fundPrivKey = bsv.PrivKey.fromWif('L3PxNBfhfzG9jxBUbdcAgMp3AH51rXxcZbpHiENh1ZeB9ooPWEzx')
var rootPubKey = '128zP65TS2F1yk7CiCD3SWbLWtZyYGUXo9'
var rootPrivKey = bsv.PrivKey.fromWif('L596WuJc8QwKX6J1KrFUKPBp17XzUzgmyke1EAg8Uyh2hDL1DN84')
var kValue = rpuzzle.KValue.fromPrivateKey(rootPrivKey)
console.log(kValue)
var rValue = rpuzzle.RValue.fromKValue(kValue)
console.log(rValue)
var feeb = 1

console.log(fundPrivKey.toAddress())
//var keyPair = bsv.KeyPair.fromPrivKey(rootPrivKey)
const keyPair = KeyPair.fromRandom()
console.log(keyPair)

console.log(keyPair)
const utxo = {
  txid: '219abc549eb0cb9942afe533d27c36f8cc56939faf8516bb1324828d6933a4df', // UTXO transaction ID
  vout: 1,// UTXO Output Index (also accepts 'outputIndex' or 'txOutNum'
  satoshis: 585674, //UTXO amount (also accepts 'amount'
  script: '76a91446621aebcbfff07577982fdeb09b586a84832cad88ac'// Hex-encoded UTXO script
}

//var fundUTXO = new bsv.Transaction.UnspentOutput({
//    "address": "17R9pts2DZdQdn4VFpFLowzVB4Udr5Rhsv",
//    "txid": "219abc549eb0cb9942afe533d27c36f8cc56939faf8516bb1324828d6933a4df",
//    "vout": 1,
//    "amount": 0.00585512,
//    "satoshis": 5855512,
//    "value": 585512,
//    "scriptPubKey": "76a91446621aebcbfff07577982fdeb09b586a84832cad88ac",
//    "script": "76a91446621aebcbfff07577982fdeb09b586a84832cad88ac",
//    "outputIndex": 1
//})

//var rootTx = createRootNode(fundUTXO, rootPubKey, fundPubKey, fundPrivKey)
rootTxId = '219abc549eb0cb9942afe533d27c36f8cc56939faf8516bb1324828d6933a4df'
//createChildNode(rootTxId, rootPrivKey, childPubKey)
//createRPuzzle(kValue, RValue)

function createRPuzzle(kValue, RValue, fundPubKey, keyPair) {
  const forge1 = new Forge({
    inputs: utxo,
    outputs: [
      Cast.lockingScript(P2RPH, { satoshis: 1000, RValue})
    ],
    changeTo: fundPubKey
  })
  forge1
    .build()
    .sign({keyPair})

}

function createChildNode(rootTx, parentPrivKey, childPubKey) {
  var childString = 'This is my child node'
  var script = bsv.SCript.buildSafeDataOut(['meta'], childKey, rootTx, childString)
  var transaction = new bsv.Transaction().
    from([fundUTXO]).
    addOutput(bsv.Transaction.Output({
      satoshis: 0,
      script: bsv.Script(oprScript)
    })).
    change(fundPubKey)
  console.log(script.toASM())
}

function createRootNode(fundUTXO, rootPubKey, fundPubKey, fundPrivKey) {
  var rootString = "This is my root node"
  var oprScript = bsv.Script.buildSafeDataOut(['meta', rootPubKey, 'NULL', rootString])
  var transaction = new bsv.Transaction().
    from([fundUTXO]).
    addOutput(bsv.Transaction.Output({
      satoshis: 0,
      script: bsv.Script(oprScript)
    })).
    change(fundPubKey)
  var hash = transaction.serialize(true)
  var fees = Math.ceil(hash.length/2*feeb)
  transaction.fee(fees)
  transaction.sign(fundPrivKey)
  transaction.serialize()
  console.log(transaction)
  return hash
}

