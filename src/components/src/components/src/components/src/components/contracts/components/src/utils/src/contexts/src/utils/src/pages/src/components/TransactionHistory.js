import { useEffect, useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { fetchTransactionHistory } from '../utils/api';

export default function TransactionHistory() {
  const { user } = useWeb3();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if(user?.address) {
      fetchTransactionHistory(user.address).then(setTransactions);
    }
  }, [user]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-staking-dark text-lg font-bold mb-4">Recent Transactions</h3>
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-2">Type</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.hash} className="border-b">
              <td className="py-2">{tx.type}</td>
              <td className="py-2">{tx.amount} USDT</td>
              <td className="py-2">
                <span className="text-invest-green">Completed</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  }
