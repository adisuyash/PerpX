import "../index.css";
import MetaMaskConnector from "../components/MetaMaskConnector.jsx";

function Home() {
  return (
    <main>
      <h1>PerpX</h1>
      <p>Trade Perps on EDU Chain</p>
      <MetaMaskConnector />
    </main>
  );
}

export default Home;
