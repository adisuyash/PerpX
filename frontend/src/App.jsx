import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Trade from './pages/Trade.jsx';
import Home from './pages/Home.jsx';

function App() {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
      }
    };

    const handleChainChanged = (chainId) => {
      setNetwork(chainId);
    };

    if (window.ethereum) {
      // Set up event listeners
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Check initial account state
      window.ethereum.request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch(error => console.error('Failed to fetch accounts', error));

      // Check initial network state
      window.ethereum.request({ method: 'eth_chainId' })
        .then(handleChainChanged)
        .catch(error => console.error('Failed to fetch chain ID', error));

      // Clean up event listeners on component unmount
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home account={account} network={network} />} />
          <Route path="/trade" element={<Trade account={account} network={network} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
