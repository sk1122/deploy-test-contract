#!/usr/bin/env node

import { ethers, BigNumber } from 'ethers'
import ERC20 from "../artifacts/contracts/ERC20.sol/TestERC20.json"
import ERC721 from "../artifacts/contracts/ERC721.sol/TestERC721.json"
import ERC1155 from "../artifacts/contracts/ERC1155.sol/TestERC1155.json"

type contractname = "erc20" | "erc721" | "erc1155"

const contracts: any = {
	"erc20": "TestERC20",
	"erc721": "TestERC721",
	"erc1155": "TestERC1155"
}

const contractBytes: any = {
	"erc20": ERC20,
	"erc721": ERC721,
	"erc1155": ERC1155
}

const deployContract = async (contract_name: contractname, provider_url: string, private_key: string, extra_data: any) => {
	const provider = new ethers.providers.JsonRpcProvider(provider_url);
	let signer = new ethers.Wallet(private_key)
	signer = signer.connect(provider)

	var contractData = contractBytes[contract_name]

	let Contract = new ethers.ContractFactory(contractData.abi, contractData.bytecode, signer)
	Contract = Contract.connect(signer)
	
	var contract: ethers.Contract
	if(contract_name === 'erc20') contract = await Contract.deploy(BigNumber.from(extra_data))
	else if(contract_name === 'erc1155') contract = await Contract.deploy(extra_data)
	else contract = await Contract.deploy()

	console.log("Contract Address -> " + contract.address)

	await contract.deployed()

	console.log("Contract successfully deployed at -> " + contract.address)
}

const args = process.argv
var data: any = {}

for(let i = 0; i < args.length; i++) {
	if(args[i] === '--provider' || args[i] === '-P') data['provider'] = args[i+1]
	else if(args[i] === '--priv-key' || args[i] === '-PK') data['private'] = args[i+1]
	else if(args[i] === '--args' || args[i] === '-A') data['args'] = args[i+1]
}


deployContract(args[2] as contractname, data.provider, data.private, data.args).then(a => console.log(a)).catch(e => console.log(e))
