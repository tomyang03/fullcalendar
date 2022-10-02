import React, { useRef, useState } from "react";

// export default function App() {
//   const [toggle, setToggle] = React.useState(false);
//   const counter = React.useRef(0);
//   console.log(counter.current++);
//   return <button onClick={() => setToggle((toggle) => !toggle)}>Click</button>;
// }

export default function App() {
  const [toggle, setToggle] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  setCounter(counter++);

  return <button onClick={() => setToggle((toggle) => !toggle)}>Click</button>;
}
