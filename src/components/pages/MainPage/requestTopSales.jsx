const requestTopSales = async () => {
  const response = await fetch('http://localhost:7070/api/top-sales');
  return await response.json();
}

export default requestTopSales
