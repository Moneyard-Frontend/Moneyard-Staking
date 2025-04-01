import { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';

const Web3Context = createContext();

export function Web3Provider({ children }) {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      
      setUser({
        address: accounts[0],
        network: await web3.eth.net.getNetworkType()
      });

      // Initialize contract
      const contract = new web3.eth.Contract(
        StakingContractABI,
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
      );
      setContract(contract);
    }
  };

  const refreshBalance = async () => {
    if(user && contract) {
      const bal = await contract.methods.getBalance(user.address).call();
      setBalance(Web3.utils.fromWei(bal, 'ether'));
    }
  };

  return (
    <Web3Context.Provider value={{ user, balance, connectWallet, refreshBalance }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context);
