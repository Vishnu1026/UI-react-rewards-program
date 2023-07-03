import React, { useState, useEffect } from "react";
import transactions from "./mockData";
//The below import is used when we make the api call using backend.
//import axios from 'axios'; 
import "./App.css";

function App() {

/*  The below Code is used when we make the api call using backend.
const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.example.com/transactions'); // Replace with your API endpoint
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  */
  const [showTransactions, setShowTransactions] = useState(false);
  const [amount, setAmount] = useState("");
  const [points, setPoints] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [customerRewardPoints, setCustomerRewardPoints] = useState({});

  const calculateRewardPoints = (amount) => {
    let points = 0;

    if (amount > 100) {
      points += (amount - 100) * 2;
      points += 50; // Additional points for the first $50
    } else if (amount > 50) {
      points += amount - 50;
    }

    return points;
  };

  const handleCalculatePoints = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount)) {
      setPoints(calculateRewardPoints(parsedAmount));
      setShowMessage(parsedAmount < 50);
    }
  };

  const handleToggleTransactions = () => {
    setShowTransactions(!showTransactions);
  };

  useEffect(() => {
    // Calculate the total reward points for each customer
    const calculateTotalRewardPoints = () => {
      const customerPoints = {};

      transactions.forEach((transaction) => {
        const customerId = transaction.customerId;
        const amount = parseFloat(transaction.amount);
        const points = calculateRewardPoints(amount);

        if (customerPoints[customerId]) {
          customerPoints[customerId] += points;
        } else {
          customerPoints[customerId] = points;
        }
      });
      console.log("customerPoints", customerPoints);
      setCustomerRewardPoints(customerPoints);
    };

    calculateTotalRewardPoints();
  }, []);

  return (
    <div
      className={`container ${
        showTransactions ? "auto-height" : "full-height"
      }`}
    >
      <div className="rewards-container">
        <h1 className="title">Rewards Program</h1>
        <div className="input-container">
          <h3>Rewards Point Calculator</h3>
          <input
            type="text"
            placeholder="Enter Amount Spent($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleCalculatePoints}>Calculate Points</button>
          {showMessage && (
            <>
              <p className="reward-points">
                Reward Points: 0
                <p className="message">Amount should be greater than $50</p>
              </p>
            </>
          )}
          {points > 0 && (
            <p className="reward-points">Reward Points: {points}</p>
          )}
        </div>
        <div className="toggle-container">
          <button onClick={handleToggleTransactions}>
            {showTransactions ? "Hide Transactions" : "Show Transactions"}
          </button>
        </div>
        {showTransactions &&
          transactions.map((transaction) => (
            <div className="transaction" key={transaction.id}>
              <p className="customer-id">
                Customer ID: {transaction.customerId}, Month:{" "}
                {transaction.month}
              </p>
              <p className="amount">Amount: ${transaction.amount}</p>
              <p className="reward-points">
                Reward Points: {calculateRewardPoints(transaction.amount)}
              </p>
            </div>
          ))}
        {showTransactions && (
          <div className="total-reward-points">
            <h3>Total Reward Points:</h3>
            {Object.entries(customerRewardPoints).map(
              ([customerId, points]) => (
                <p key={customerId}>
                  Customer ID: {customerId}, Total Points: {points}
                </p>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
