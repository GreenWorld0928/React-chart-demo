"use client";

import Chart from "./Chart";
import inputData from "./inputData.json"

export default function Home() {
  const firstWeekData = inputData.dailyGlucoseProfiles.slice(0, 7)
  const secondWeekData = inputData.dailyGlucoseProfiles.slice(7)
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Chart key="1" id="1" dailyGlucoseProfiles={firstWeekData} />
      <Chart key="2" id="2" dailyGlucoseProfiles={secondWeekData} />
    </div>
  );
}
