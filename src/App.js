import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import datas from "./data.js";

function App() {

  const [rates, setRates] = useState([]);
  const [list, setList] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);

  useEffect(() => {
    axios
      .get(
        //there is an error about link. My request has been blocked by CORS policy:
        // No 'Access-Control-Allow-Origin' header is present on the requested resource.
        // Then I take all data from the link and fixed it in data.js
        "https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=2022-01-26&startDate=2022-01-26"
      )
      .then((data) => setRates(data))
      .catch((err) => console.log("err", err));

    setFilteredDatas(
      datas.filter((fl) => {
        return String(fl.conract)[0] === "P" && String(fl.conract)[1] === "H";
      })
    );

    filteredDatas.forEach((element) => {
      if (!list.includes(element.conract)) {
        setList([...list, element.conract]);
      }
    });
  }, [filteredDatas]);

  return (
    <div className="App">
      <table className="table table-striped table-hover m-3 shadow  ">
        <thead>
          <tr>
            <th>Tarih</th>
            <th>Toplam İşlem Miktarı</th>
            <th>Toplam İşlem Tutarı</th>
            <th>Ağırlık Ortalama Fiyatı</th>
          </tr>
        </thead>

        <tbody>
          {list.map((myList) => {
            //normally I used useState below. But react give me "too many render error"
            let selected = filteredDatas.filter((fl) => {
              return fl.conract === myList;
            });
            let topValue = 0;
            let topCount = 0;

            selected.forEach((element) => {
              topValue = topValue + (element.price * element.quantity) / 10;
              topCount = topCount + element.quantity / 10;
            });

            let rate = topValue / topCount;

            let day = myList.slice(2,4)
            let month = myList.slice(4,6)
            let year = myList.slice(6,8)
            let hour = myList.slice(8,10)

            return (
              <tr key={myList}>
                <td>{day + "." + month +"." + year +" " + hour + ":00" }</td>
                <td>{topValue.toLocaleString()}</td>
                <td>{topCount.toLocaleString()} ₺ </td>
                <td>{rate.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>{" "}
    </div>
  );
}

export default App;
