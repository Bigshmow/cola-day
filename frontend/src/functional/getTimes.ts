export function getTimes(blocks: number = 9, start: number = 8) {
  const timesArr: string[] = [];
  for (let i = 0; i < blocks; i++) {
    let startHour =
      start + i <= 11
        ? (start + i).toString() + "am"
        : start + i === 12
        ? (start + i).toString() + "pm"
        : (start + i - 12).toString() + "pm";
    let endHour =
      start + i + 1 < 12
        ? (start + i + 1).toString() + "am"
        : start + i + 1 === 12
        ? (start + i + 1).toString() + "pm"
        : (start + i - 11).toString() + "pm";
    timesArr.push(startHour + " - " + endHour);
  }
  return timesArr;
}

export function getHours(blocks: number = 9, start: number = 8) {
  const timesArr: string[] = [];
  for (let i = 0; i < blocks; i++) {
    let startHour =
      start + i <= 11
        ? (start + i).toString() + "am"
        : start + i === 12
        ? (start + i).toString() + "pm"
        : (start + i - 12).toString() + "pm";
    timesArr.push(startHour);
  }
  return timesArr;
}
