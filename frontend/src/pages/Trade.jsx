import "../index.css";
import Navbar from "../components/Navbar";
import BuyAndSell from "../components/TradeSection/BuyandSell.jsx";
import Orderbook from "../components/TradeSection/Orderbook.jsx";
import TradeView from "../components/TradeSection/TradeView.jsx";

function Trade() {
  return (
    <main style={{ paddingTop: '0' }}>
      <Navbar />
      <section className="trade-section">
        <div className={`flex`}>
          <TradeView />
          <Orderbook />
          <BuyAndSell />
        </div>
      </section>
    </main>
  );
}

export default Trade;
