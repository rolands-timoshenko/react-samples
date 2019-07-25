export function logTime(text) {
  const date = new Date();
  const addZero = number => {
    return number < 10 ? `0${number}` : `${number}`;
  };
  const hours = addZero(date.getHours());
  const min = addZero(date.getMinutes());
  const sec = addZero(date.getSeconds());

  console.log(
    `%c ${text} - ${hours}:${min}:${sec}`,
    "background: #222; color: #bada55; padding: 5px"
  );
}
