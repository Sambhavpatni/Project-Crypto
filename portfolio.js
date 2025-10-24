// Example data for the portfolio (could be fetched from a database in a real application)
const assets = [
    { name: 'bitcoin', amount: 2.5 },
    { name: 'ethereum', amount: 10 },
  ];
  
  // Function to fetch real-time cryptocurrency data from CoinGecko API
  async function fetchCryptoData() {
    const assetIds = assets.map(asset => asset.name).join(',');
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${assetIds}&vs_currencies=usd`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      assets.forEach(asset => {
        asset.currentValue = data[asset.name].usd;
      });
  
      updatePortfolio();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Function to update the portfolio dynamically
  function updatePortfolio() {
    const totalValueElement = document.getElementById('total-value');
    const change24hElement = document.getElementById('24h-change');
    const growthElement = document.getElementById('growth');
    const assetsListElement = document.getElementById('assets-list');
  
    let totalValue = 0;
    assets.forEach(asset => {
      totalValue += asset.currentValue * asset.amount;
    });
  
    totalValueElement.textContent = `$${totalValue.toFixed(2)}`;
    change24hElement.textContent = `+0.00%`; // This would be dynamic in a real application
    growthElement.textContent = `+0.00%`; // This would also be dynamic
  
    // Populate asset table with current values
    assetsListElement.innerHTML = assets.map(asset => `
      <tr>
        <td>${capitalizeFirstLetter(asset.name)}</td>
        <td>${asset.amount}</td>
        <td>$${(asset.currentValue * asset.amount).toFixed(2)}</td>
        <td>${(asset.currentValue * asset.amount - (asset.amount * 2500)).toFixed(2)}</td> <!-- Dummy Profit/Loss calculation -->
        <td><button class="buy-sell-btn">Buy/Sell</button></td>
      </tr>
    `).join('');
  }
  
  // Capitalize the first letter of a string
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  // Fetch the cryptocurrency data and update the portfolio
  window.onload = fetchCryptoData;
  