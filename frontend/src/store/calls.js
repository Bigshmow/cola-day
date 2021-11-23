let index = 0;

export default function gen(text = "REDUX") {
  return `${text}-${index++}`;
}

export function requestActions(text = "REQUEST") {
  return {
    MAIN: gen(`${text}-MAIN`),
    START: gen(`${text}-START`),
    SUCCESS: gen(`${text}-SUCCESS`),
    FAILURE: gen(`${text}-FAILURE`)
  };
}
