import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=2022-01-26&startDate=2022-01-26"
      )
      .then((data) => setRates(data))
      .catch((err) => console.log("err", err));
  }, []);

  console.log(rates);

  return <div className="App">gd</div>;
}

export default App;
