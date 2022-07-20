export const getSerializedBalance = (balance: string) => {
  const defaultBal = 0;

  if (!parseInt(balance)) return `₦${defaultBal.toFixed(2)}`;

  const convertedBalance = (parseInt(balance) / 100).toFixed(2);
  const formattedBalance = convertedBalance
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `₦${formattedBalance}`;
};
