export const verify2FA = async (email, code) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-2fa`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, code })
  });
  return response.json();
};

export const fetchTransactionHistory = async (address) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tx/${address}`);
  return response.json();
};
