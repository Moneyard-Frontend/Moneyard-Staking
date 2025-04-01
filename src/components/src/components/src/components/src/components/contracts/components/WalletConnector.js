import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useWeb3 } from '../contexts/Web3Context';

export default function WalletConnector() {
  const { setUser, setBalance } = useWeb3();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError('');
      
      if (!window.ethereum) {
        throw new Error('Install MetaMask!');
      }

      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const accounts = await web3.eth.getAccounts();
      const network = await web3.eth.net.getNetworkType();

      if (network !== 'mainnet') {
        throw new Error('Switch to Mainnet');
      }

      setUser({
        wallet: accounts[0],
        network: network
      });

      // Initialize contract
      const contract = new web3.eth.Contract(
        YourContractABI, // Import your contract ABI
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
      );

      // Get initial balance
      const balance = await contract.methods.getBalance(accounts[0]).call();
      setBalance(Web3.utils.fromWei(balance, 'ether'));

    } catch (err) {
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
      </button>

      <div className="mt-3 text-sm text-blue-800">
        <p>Supported Networks: Mainnet</p>
        <p>Minimum Deposit: 15 USDT</p>
      </div>
    </div>
  );
        }
