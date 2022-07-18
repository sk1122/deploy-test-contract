#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const TestERC20_json_1 = __importDefault(require("../artifacts/contracts/ERC20.sol/TestERC20.json"));
const TestERC721_json_1 = __importDefault(require("../artifacts/contracts/ERC721.sol/TestERC721.json"));
const TestERC1155_json_1 = __importDefault(require("../artifacts/contracts/ERC1155.sol/TestERC1155.json"));
const contracts = {
    "erc20": "TestERC20",
    "erc721": "TestERC721",
    "erc1155": "TestERC1155"
};
const contractBytes = {
    "erc20": TestERC20_json_1.default,
    "erc721": TestERC721_json_1.default,
    "erc1155": TestERC1155_json_1.default
};
const deployContract = (contract_name, provider_url, private_key, extra_data) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(provider_url);
    let signer = new ethers_1.ethers.Wallet(private_key);
    signer = signer.connect(provider);
    var contractData = contractBytes[contract_name];
    let Contract = new ethers_1.ethers.ContractFactory(contractData.abi, contractData.bytecode, signer);
    Contract = Contract.connect(signer);
    var contract;
    if (contract_name === 'erc20')
        contract = yield Contract.deploy(ethers_1.BigNumber.from(extra_data));
    else if (contract_name === 'erc1155')
        contract = yield Contract.deploy(extra_data);
    else
        contract = yield Contract.deploy();
    console.log("Contract Address -> " + contract.address);
    yield contract.deployed();
    console.log("Contract successfully deployed at -> " + contract.address);
});
const args = process.argv;
var data = {};
for (let i = 0; i < args.length; i++) {
    if (args[i] === '--provider' || args[i] === '-P')
        data['provider'] = args[i + 1];
    else if (args[i] === '--priv-key' || args[i] === '-PK')
        data['private'] = args[i + 1];
    else if (args[i] === '--args' || args[i] === '-A')
        data['args'] = args[i + 1];
}
deployContract(args[2], data.provider, data.private, data.args).then(a => console.log(a)).catch(e => console.log(e));
