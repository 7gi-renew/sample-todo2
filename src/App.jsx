import { useEffect, useState, useContext } from "react";
import "./App.css";
import { getAllData, setNewData, deleteNewData } from "./utils/SupabaseFunction";
import { Information } from "./components/Information";
import { RecordArea } from "./components/RecordArea";

import styled from "styled-components";

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
        <h1 data-testid="title">学習記録一覧</h1>
        <div className="form-area">
          <p>学習内容</p>
          <input type="text" data-testid="name-form" value={studyContent} onChange={changeStudyContent} />
        </div>
        <div className="form-area">
          <p>学習時間</p>
          <input type="number" data-testid="time-form" value={studyTime} onChange={changeStudyTime} />
        </div>

        {loading && <p>Now Loading...</p>}
        {/* {loading || <Information content={studyContent} time={studyTime} onClick={registerStudy}></Information>} */}
        {loading || error}
        {loading || (
          <div className="information-area">
            <p>入力されている内容：{studyContent}</p>
            <p>入力されている時間：{studyTime}時間</p>
            <button className="register" data-testid="register" onClick={registerStudy}>
              登録
            </button>
          </div>
        )}

        {loading || (
          <div>
            <div data-testid="itemParent" className="record-area">
              {records.map((record, index) => {
                return (
                  <SDiv key={record.id}>
                    <p>{`${record.title} ${record.time}時間`}</p>
                    <SButton onClick={() => itemDelete(index)}>削除</SButton>
                  </SDiv>
                );
              })}
            </div>
            <div className="record-area">
              <p>{`合計時間：${sumTime} / 1000h`}</p>
            </div>
          </div>
        )}
        {/* {loading || <RecordArea records={records} sumTime={sumTime} itemDelete={itemDelete} />} */}
      </div>
    </>
  );
}

const SDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const SButton = styled.button`
  padding: 7px 10px;
  font-size: 14px;
`;

export default App;
