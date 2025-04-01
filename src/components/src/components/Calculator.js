export default function Calculator({ balance }) {
  const [amount, setAmount] = useState(15);
  
  const calculateEarnings = () => {
    const base = Math.max(amount, 15);
    return base + (base * 0.2); // 20% commission
  };

  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="text-green-700 mb-4">Earnings Calculator</h3>
      <input
        type="number"
        min="15"
        value={amount}
        onChange={(e) => setAmount(Math.max(e.target.value, 15))}
        className="border p-2 mb-3"
      />
      <div className="text-green-600">
        Daily Earnings: ${(calculateEarnings() / 30).toFixed(2)}
      </div>
    </div>
  );
}
