"use client";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import inputData from './inputData.json';
import { useEffect } from "react";


export default function Home() {

  interface DataItem {
    day: number;
    time?: number;
    dataLine?: number;
    percentileMin?: number;
    percentileMax?: number;
    percentileRange: number;
  }

  const WEEK_DAY: { [key: number]: string } = {
    1: "Mon",
    3: "Tue",
    5: "Wed",
    7: "Thu",
    9: "Fri",
    11: "Sat",
    13: "Sun",
    15: "Mon",
    17: "Tue",
    19: "Wed",
    21: "Thu",
    23: "Fri",
    25: "Sat",
    27: "Sun",
  }
  const subtractIfDefined = (a: number | undefined, b: number | undefined): number | undefined => {
    return (a !== undefined && b !== undefined) ? a - b : undefined;
  };
  const data = inputData.dailyGlucoseProfiles;
  // const Newdata: DataItem[] = data.map((item, idx) => ({
  //   time: idx * 14 / (data.length - 1),
  //   dataLine: item.percentile95 ? item.percentile95 - 70 : undefined,
  //   percentileMin: 70,
  //   percentileMax: 110,
  //   percentileRange: item.percentile95 ? item.percentile95 - 70 : -1,
  // }));
  let Newdata = new Array();

  const startDay = new Date(data[0].date).getUTCDay();
  for (let i = 0; i < data.length; i++) {
    if (data[i].egvs && data[i].egvs.length > 0) {
      data[i].egvs.forEach(item => {
        let newObj: DataItem =
        {
          day: startDay + 2 * i,
          time: i * 2 + (new Date(item.time).getUTCHours()*60 + new Date(item.time).getUTCMinutes())/720 ,
          dataLine: item.magnitude ? item.magnitude - 70 : undefined,
          percentileMin: 70,
          percentileMax: 110,
          percentileRange: item.magnitude ? item.magnitude - 70 : -1,
        };
        Newdata.push(newObj);
      });
    }
  }

  useEffect(() => {
    console.log("AAAAAAAA:::", Newdata)

  }, [])

  const gradientOffset = (index: number) => {
    const dataMax = Math.max(...Newdata.map((i: DataItem) => i.percentileRange).filter((value) => value !== -1));
    const dataMin = Math.min(...Newdata.map((i: DataItem) => i.percentileRange).filter((value) => value !== -1));
    // const dataMax = 260.7
    // const dataMin = -55.75
    if (index === 0) return (dataMax - 110) / (dataMax - dataMin);
    if (index === 1) return (dataMax + 0.1) / (dataMax - dataMin);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart
          width={500}
          height={400}
          data={Newdata}
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            xAxisId="0"
            dataKey="time"
            type="number"
            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]}
            tickFormatter={(time) => WEEK_DAY[time+3] ? WEEK_DAY[time+3] : ""}
            domain={['dataMin', 'dataMin']}
            orientation="top"
            style={{ fontSize: 12, fontWeight: "bold" }}
          />
          <XAxis
            xAxisId="1"
            dataKey="time"
            type="number"
            ticks={[0]}
            tickFormatter={(time) => ""}
            domain={['dataMin', 'dataMin']}
            orientation="bottom"
            style={{ fontSize: 12, fontWeight: "bold" }}
          />
          <YAxis yAxisId="y1" ticks={[0, 110]} tickFormatter={(time) => time + 70} style={{ fontSize: 13, fontWeight: "bold" }} />
          <YAxis yAxisId="y2" orientation="right" ticks={[0, 110]} tickFormatter={(time) => time + 70} style={{ fontSize: 13, fontWeight: "bold" }} />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={gradientOffset(0)} stopColor="blue" stopOpacity={1} />
              <stop offset={gradientOffset(0)} stopColor="blue" stopOpacity={1} />
              <stop offset={gradientOffset(0)} stopColor="white" stopOpacity={1} />
              <stop offset={gradientOffset(1)} stopColor="white" stopOpacity={1} />
              <stop offset={gradientOffset(1)} stopColor="red" stopOpacity={1} />
              <stop offset={1} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          {/* <Line
              yAxisId="y1"
              type="monotone"
              dataKey={() => -70}
              stroke="#000000"
              dot={false}
              strokeWidth={1}
            /> */}
          <Area
            yAxisId="y1"
            type="monotone"
            stackId="2"
            dataKey="dataLine"
            stroke="#b3e6e0"
            fill="url(#splitColor)"
          />
          <Area
            yAxisId="y1"
            type="monotone"
            stackId="0"
            dataKey="percentileMax"
            stroke="#b3e6e0"
            fill="#b3e6e0"
          />
          <Line
            yAxisId="y1"
            type="monotone"
            dataKey="dataLine"
            stroke="#26736a"
            dot={false}
            strokeWidth={2}
          />
          <Line
            yAxisId="y2"
            type="monotone"
            dataKey="dataLine"
            stroke="#26736a"
            dot={false}
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>

  );
}
