export const getTransactions = () => {
  const data = localStorage.getItem("transactions");
  return data ? JSON.parse(data) : [];
};

export const saveTransactions = (transactions) => {
  const transactions = getTransactions(transactions);
  transactions.push(transactions);
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

export const deleteTransactions = (id) => {
    const transactions = getTransactions().filter((t)=>t.id !==id);
    localStorage.setItem('transactions',JSON.stringify(transactions))
}
