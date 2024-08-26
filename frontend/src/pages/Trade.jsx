import "../index.css";
import Navbar from "../components/Navbar";
import BuyAndSell from "../components/TradeSections/BuyandSell.jsx";
import Orderbook from "../components/TradeSections/Orderbook.jsx";
import TradingView from "../components/TradeSections/TradingView.jsx";

function Trade() {
  return (
    <main style={{ paddingTop: '0' }}>
      <Navbar />
      <section className="trade-section">
        <div className={`flex`}>
          <TradingView />
          <Orderbook />
          <BuyAndSell />
        </div>
      </section>
    </main>
  );
}

export default Trade;
