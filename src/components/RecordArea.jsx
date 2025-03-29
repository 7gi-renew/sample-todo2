import styled from "styled-components";

export const RecordArea = ({ records, sumTime, itemDelete }) => {
  return (
    <div>
      <div className="record-area">
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
  );
};

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
