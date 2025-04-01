import { getWeb3 } from './web3';
import StakingContractABI from '../contracts/StakingContractABI.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const depositFunds = async (amount, referralCode) => {
  const web3 = getWeb3();
  const contract = new web3.eth.Contract(
    StakingContractABI,
    CONTRACT_ADDRESS
  );

  return await contract.methods
    .deposit(
      web3.utils.toWei(amount.toString(), 'ether'),
      referralCode
    )
    .send({ from: window.ethereum.selectedAddress });
};

export const checkBalance = async (address) => {
  const contract = new web3.eth.Contract(
    StakingContractABI,
    CONTRACT_ADDRESS
  );
  return await contract.methods.getBalance(address).call();
};
