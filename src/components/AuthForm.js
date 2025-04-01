import { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referral, setReferral] = useState('');
  const { login } = useWeb3();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <input 
        type="email" 
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-3 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-3 w-full"
      />
      <input
        type="text"
        placeholder="Referral Code (Optional)"
        onChange={(e) => setReferral(e.target.value)}
        className="border p-2 mb-3 w-full"
      />
      <button 
        onClick={() => login(email, password, referral)}
        className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700"
      >
        Sign In / Register
      </button>
    </div>
  );
          }
