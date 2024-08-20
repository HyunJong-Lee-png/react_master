import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { hourSelector, minuteAtom } from "../atom";

export default function TimeTrans() {
  const [minute, setMinute] = useRecoilState(minuteAtom);
  const [hour, setHour] = useRecoilState(hourSelector);

  return (
    <>
      <input placeholder="minute" value={minute} onChange={(e) => setMinute(e.target.value)} />
      <input placeholder="hour" value={hour} onChange={(e) => setHour(e.target.value)} />
    </>
  );
}