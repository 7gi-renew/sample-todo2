import { useEffect, useState, useContext } from "react";

import "./App.css";
import { getAllData, setNewData, deleteNewData } from "./utils/SupabaseFunction";
import { Information } from "./components/Information";
import { RecordArea } from "./components/RecordArea";

import firebase from "./utils/Firebase";

function App() {
  const [data, setData] = useState([]);

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);
  const [studyContent, setStudyContent] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [error, setError] = useState("");
  const [sumTime, setSumTime] = useState(0);

  const [idNum, setIdNum] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllData();
      setData(data);
      setRecords(data);

      const dataTime = data.map((d) => {
        return d.time;
      });

      const dataTimeSum = dataTime.reduce((val1, val2) => {
        return val1 + val2;
      });

      setSumTime(dataTimeSum);
      setLoading(false);
      setIdNum(data.length);
    };
    getData();
  }, []);

  const changeStudyContent = (e) => {
    setStudyContent(e.target.value);
  };

  const changeStudyTime = (e) => {
    const inputedTime = Number(e.target.value);
    setStudyTime(inputedTime);
  };

  const registerStudy = () => {
    if (studyContent === "" || studyTime === "") {
      setError("入力されていない項目があります");
    } else {
      const newData = { id: `${idNum}`, title: studyContent, time: studyTime };
      const newRecords = [...records, newData];

      const newTime = newRecords.map((record) => {
        return record.time;
      });

      const newSum = newTime.reduce((current, next) => {
        return current + next;
      });

      setRecords(newRecords);
      setSumTime(newSum);

      // 新規データの登録

      setNewData(studyContent, studyTime);

      setError("");
      setStudyContent("");
      setStudyTime("");
      setIdNum(idNum + 1);
    }
  };

  const itemDelete = (index) => {
    const newDataArrays = [...records];
    const deleteData = newDataArrays.splice(index, 1);

    setRecords(newDataArrays);

    const newTime = newDataArrays.map((record) => {
      return record.time;
    });
    const newSum = newTime.reduce((current, next) => {
      return current + next;
    });
    const deleteTitle = deleteData[0].title;
    const deleteTime = deleteData[0].time;

    setSumTime(newSum);
    deleteNewData(deleteTitle, deleteTime);
  };

  return (
    <>
      <div className="wrapper">
        <h1>学習記録一覧</h1>
        <div className="form-area">
          <p>学習内容</p>
          <input type="text" value={studyContent} onChange={changeStudyContent} />
        </div>
        <div className="form-area">
          <p>学習時間</p>
          <input type="number" value={studyTime} onChange={changeStudyTime} />
        </div>

        {loading && <p>Now Loading...</p>}
        {loading || <Information content={studyContent} time={studyTime} onClick={registerStudy}></Information>}
        {loading || error}
        {loading || <RecordArea records={records} sumTime={sumTime} itemDelete={itemDelete} />}
      </div>
    </>
  );
}

export default App;
