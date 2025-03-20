export const RecordArea = ({ records, sumTime }) => {
  return (
    <>
      <div className="record-area">
        {records.map((record) => {
          return (
            <div key={record.id}>
              <p>{`${record.title} ${record.time}時間`}</p>
            </div>
          );
        })}
      </div>
      <div className="record-area">
        <p>{`合計時間：${sumTime} / 1000h`}</p>
      </div>
    </>
  );
};
