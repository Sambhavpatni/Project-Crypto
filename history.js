// Example trade data (in a real application, this would come from an API or a database)
const trades = [
    {
      date: '2025-04-30',
      asset: 'Bitcoin',
      action: 'Buy',
      amount: 1.2,
      price: 60000,
      fee: 50,
    },
    {
      date: '2025-04-28',
      asset: 'Ethereum',
      action: 'Sell',
      amount: 5,
      price: 2500,
      fee: 25,
    },
    {
      date: '2025-04-25',
      asset: 'Bitcoin',
      action: 'Sell',
      amount: 0.5,
      price: 58000,
      fee: 20,
    },
  ];
  
  // Function to display trade history in the table
  function updateTradeHistory() {
    const historyList = document.getElementById('history-list');
  
    // Loop through trades and display them
    historyList.innerHTML = trades.map(trade => `
      <tr>
        <td>${trade.date}</td>
        <td>${trade.asset}</td>
        <td>${trade.action}</td>
        <td>${trade.amount}</td>
        <td>$${trade.price.toFixed(2)}</td>
        <td>$${(trade.amount * trade.price).toFixed(2)}</td>
        <td>$${trade.fee.toFixed(2)}</td>
        <td><button class="details-btn">Details</button></td>
      </tr>
    `).join('');
  }
  
  // Function to filter trades based on form inputs
  function filterTrades(event) {
    event.preventDefault();
    
    const asset = document.getElementById('asset').value;
    const action = document.getElementById('action').value;
    const date = document.getElementById('date').value;
  
    let filteredTrades = trades;
  
    if (asset) {
      filteredTrades = filteredTrades.filter(trade => trade.asset === asset);
    }
  
    if (action) {
      filteredTrades = filteredTrades.filter(trade => trade.action === action);
    }
  
    if (date) {
      filteredTrades = filteredTrades.filter(trade => trade.date === date);
    }
  
    // Update the trade history table with the filtered trades
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = filteredTrades.map(trade => `
      <tr>
        <td>${trade.date}</td>
        <td>${trade.asset}</td>
        <td>${trade.action}</td>
        <td>${trade.amount}</td>
        <td>$${trade.price.toFixed(2)}</td>
        <td>$${(trade.amount * trade.price).toFixed(2)}</td>
        <td>$${trade.fee.toFixed(2)}</td>
        <td><button class="details-btn">Details</button></td>
      </tr>
    `).join('');
  }
  
  // Set up event listener for the filter form
  document.getElementById('filter-form').addEventListener('submit', filterTrades);
  
  // Load trade history when the page is loaded
  window.onload = updateTradeHistory;
  