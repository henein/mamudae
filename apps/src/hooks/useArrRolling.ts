import { useState, useEffect, useRef } from "react";
import dummy from "../../dummy/dummy.json";

export default function useArrRolling() {
  const [idx, setIdx] = useState(0);
  let countRef = useRef(0);
  let countArrRef = useRef([...dummy.announcetxt]);

  useEffect(() => {
    setInterval(() => {
      countRef.current += 1;
      setIdx(countRef.current % countArrRef.current.length);

      let spliceItem = countArrRef.current.splice(0, 1);
      countArrRef.current.splice(4, 0, spliceItem[0]);
    }, 3000);
  }, []);

  return countArrRef.current;
}
