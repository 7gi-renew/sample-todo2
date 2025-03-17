import { useState } from "react";

import "./App.css";

function App() {
  const [records, setRecords] = useState([]);

  const [studyContent, setStudyContent] = useState("");
  const [studyTime, setStudyTime] = useState("");

  const [error, setError] = useState("");

  const [sumTime, setSumTime] = useState(0);

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
      // studyContentとstudyTimeはそれぞれデータ取得用の変数
      const newData = { title: studyContent, time: studyTime };
      const newRecords = [...records, newData];

      const newTime = newRecords.map((record) => {
        return record.time;
      });

      const newSum = newTime.reduce((current, next) => {
        return current + next;
      });

      setSumTime(newSum);

      setError("");
      setStudyContent("");
      setStudyTime("");
    }
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
        <div className="information-area">
          <p>入力されている内容：{studyContent}</p>
          <p>入力されている時間：{studyTime}時間</p>
          <button className="register" onClick={registerStudy}>
            登録
          </button>
        </div>
        {error}

        <div className="record-area">
          {records.map((record) => {
            return (
              <div key={index}>
                <p>{`${record.title} ${record.time}時間`}</p>
              </div>
            );
          })}
        </div>
        <div className="record-area">
          <p>{`合計時間：${sumTime} / 1000h`}</p>
        </div>
      </div>
    </>
  );
}

export default App;
