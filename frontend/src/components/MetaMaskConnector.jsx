import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MetaMaskConnector() {
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleAccountsChanged = (accounts) => {
            if (accounts.length > 0) {
                setAccount(accounts[0]);
            } else {
                setAccount(null);
            }
        };

        const handleChainChanged = () => {
            // Optionally handle chain changes
            // Avoid reloading the page for a better user experience
        };

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);

            // Check initial account state
            window.ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged);

            // Clean up event listeners on component unmount
            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            };
        }
    }, []);

    const connectMetaMask = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
        } catch (error) {
            console.error('User denied account access', error);
        }
    };

    const disconnectMetaMask = () => {
        setAccount(null);
        // Optionally, you might want to handle additional disconnection logic here
        // Note: MetaMask doesn't provide a direct way to disconnect, so this is a state management approach
    };

    const startTrading = () => {
        navigate('/trade'); // Navigate to /trade when "Start Trading" is clicked
    };

    return (
        <div>
            {account ? (
                <div>
                    <div>Connected account: {account}</div>
                    <button onClick={startTrading}>Start Trading</button>
                    <button onClick={disconnectMetaMask}>Disconnect</button>
                </div>
            ) : (
                <button onClick={connectMetaMask}>Connect Wallet</button>
            )}
        </div>
    );
}

export default MetaMaskConnector;