import { useState, useEffect } from 'react';

function Navbar() {
    const [account, setAccount] = useState(null);

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
        };

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);

            window.ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged);

            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            };
        }
    }, []);

    const disconnectMetaMask = () => {
        setAccount(null);
    };

    return (
        <nav style={navbarStyles}>
            <div style={titleContainerStyles}>
                <h1 style={titleStyles}>
                    <a href="/" style={titleLinkStyles}>PerpX</a>
                </h1>
            </div>
            <div style={navButtonsStyles}>
                {account && (
                    <button
                        style={disconnectButtonStyles}
                        onMouseOver={(e) => e.target.style.backgroundColor = disconnectButtonHoverStyles.backgroundColor}
                        onMouseOut={(e) => e.target.style.backgroundColor = disconnectButtonStyles.backgroundColor}
                        onClick={disconnectMetaMask}
                    >
                        Disconnect
                    </button>
                )}
            </div>
        </nav>
    );
}

const navbarStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#242424',
    borderBottom: '1px solid rgba(255, 255, 255, 0.87)',
    padding: '1rem',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
};

const titleContainerStyles = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
};

const titleStyles = {
    fontSize: '2em',
    lineHeight: 1.2,
    margin: 0,
};

const titleLinkStyles = {
    textDecoration: 'none',
    color: 'inherit',
    fontWeight: 600,
};

const navButtonsStyles = {
    display: 'flex',
    alignItems: 'center',
};

const disconnectButtonStyles = {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '1.5rem',
};

const disconnectButtonHoverStyles = {
    backgroundColor: '#d32f2f',
};

export default Navbar;