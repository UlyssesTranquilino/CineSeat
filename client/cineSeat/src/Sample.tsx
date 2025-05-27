import { useContext, useState, useMemo } from "react";
import { itemPortal } from "./ItemContext";

const Sample = () => {
  const items = useContext(itemPortal);

  const [number, setNumber] = useState(2);

  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number]);

  const handleClick = useMemo(() => {
    return slowFunction(number);
  }, [items]);

  return (
    <div className="h-100">
      {/* HELLO SAMPLE {items.food} */}
      <button
        className="cursor-pointer mb-10"
        onClick={() => setNumber(doubleNumber)}
      >
        CLICK ME
      </button>
      <h1>NUMBER: {number}</h1>
    </div>
  );
};

export default Sample;

function slowFunction(num) {
  console.log("slowFunction called");
  for (let i = 0; i < 10000000; i++) {}
  return num * 2;
}
