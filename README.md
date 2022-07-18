# deploy-test-contract
deploy test erc20, erc721, erc1155 contracts in a single npx command

## ERC20
```
npx deploy-contracts erc20 --provider provider_url --private private_key --args (premint)
```

## ERC721
```
npx deploy-contracts erc721 --provider provider_url --private private_key
```

## ERC1155
```
npx deploy-contracts erc1155 --provider provider_url --private private_key --args base_uri
```
