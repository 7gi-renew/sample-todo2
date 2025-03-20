export const Information = ({ content, time, onClick }) => {
  return (
    <div className="information-area">
      <p>入力されている内容：{content}</p>
      <p>入力されている時間：{time}時間</p>
      <button className="register" onClick={onClick}>
        登録
      </button>
    </div>
  );
};
