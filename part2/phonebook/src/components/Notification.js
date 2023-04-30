const Notification = ({ message: { text, type } }) => {
  if (!!text) return <div className={type}>{text}</div>;
  else return null;
};

export default Notification;
