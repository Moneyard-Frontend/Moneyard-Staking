import { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import QRCode from 'qrcode.react';
import { verify2FACode } from '../utils/auth';

export default function WithdrawForm() {
  const { user, balance, checkBalance } = useWeb3();
  const [amount, setAmount] = useState('');
  const [twoFACode, setTwoFACode] = useState('');
  const [is2FASetup, setIs2FASetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  // Check 2FA setup status
  useEffect(() => {
    if (user?.is2FAEnabled) {
      setIs2FASetup(true);
    }
  }, [user]);

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate inputs
      if (amount < 1) {
        throw new Error('Minimum withdrawal: 1 USDT');
      }
      if (amount > balance) {
        throw new Error('Insufficient balance');
      }

      // Verify 2FA code
      const isValid = await verify2FACode(user.email, twoFACode);
      if (!isValid) {
        throw new Error('Invalid 2FA code');
      }

      // Smart contract interaction
      const contract = getContract();
      await contract.methods
        .withdraw(web3.utils.toWei(amount.toString(), 'ether'))
        .send({ from: user.wallet });

      await checkBalance();
      setAmount('');
      setTwoFACode('');
      alert('Withdrawal successful!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const setupGoogleAuth = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/2fa/setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });
      
      const data = await response.json();
      setQrUrl(data.qrCodeUrl);
      setIs2FASetup(true);
    } catch (err) {
      setError('Failed to setup 2FA');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-100">
      <h3 className="text-blue-600 text-lg font-semibold mb-4">Withdraw USDT</h3>
      
      {!is2FASetup ? (
        <div className="text-center">
          <button
            onClick={setupGoogleAuth}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Enable 2FA Security
          </button>
          {qrUrl && (
            <div className="mt-4">
              <p className="text-sm mb-2">Scan with Google Authenticator:</p>
              <QRCode value={qrUrl} className="mx-auto" />
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleWithdrawal}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Amount (USDT)</label>
              <input
                type="number"
                min="1"
                step="0.1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter withdrawal amount"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Google Authenticator Code</label>
              <input
                type="text"
                value={twoFACode}
                onChange={(e) => setTwoFACode(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="6-digit code"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Confirm Withdrawal'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
    }
