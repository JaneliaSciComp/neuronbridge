export function dataVersionFile() {
  return process.env.REACT_APP_LEVEL.match(/^prod/) ? "current.txt" : "next.txt";
}

export function alt() {
  return true;
}
