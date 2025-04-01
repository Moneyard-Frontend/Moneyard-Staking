export default function DepositForm() {
  const networks = {
    TRC20: 'TJREgZTuTnvRrw5Fme4DDd6hSwCEwxQV3f',
    BEP20: '0x2837db956aba84eb2670d00aeea5c0d8a9e20a01'
  };

  const [selectedNetwork, setNetwork] = useState('TRC20');

  return (
    <div className="bg-white p-4 rounded shadow">
      <select 
        onChange={(e) => setNetwork(e.target.value)}
        className="border p-2 mb-3"
      >
        <option value="TRC20">Tron (TRC20)</option>
        <option value="BEP20">BNB Smart Chain (BEP20)</option>
      </select>
      <div className="bg-gray-100 p-3 rounded break-all">
        {networks[selectedNetwork]}
      </div>
      <button className="bg-blue-600 text-white p-2 mt-3 rounded hover:bg-blue-700">
        Copy Address
      </button>
    </div>
  );
}
