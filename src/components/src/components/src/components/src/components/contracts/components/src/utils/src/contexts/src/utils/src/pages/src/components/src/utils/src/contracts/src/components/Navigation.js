import Link from 'next/link';
import { useWeb3 } from '../contexts/Web3Context';
import WalletConnector from './WalletConnector';

export default function Navigation() {
  const { user } = useWeb3();
  
  return (
    <nav className="bg-staking-dark text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Money Staking</Link>
        
        <div className="flex items-center gap-6">
          {user && (
            <>
              <Link href="/dashboard" className="hover:text-trust-blue">Dashboard</Link>
              <Link href="/transactions" className="hover:text-trust-blue">History</Link>
            </>
          )}
          <WalletConnector />
        </div>
      </div>
    </nav>
  );
}
