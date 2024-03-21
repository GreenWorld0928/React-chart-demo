"use client";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Label,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import inputData from './inputData.json';
import { Righteous } from "next/font/google";
export default function Home() {

  interface DataItem {
    time?: number;
    dataLine?: number;
    overflowMaxArea?: number;
    overflowMinArea?: number;
    percentileMin?: number;
    percentileMax?: number;
    percentileRange?: number;
    zeroline?: number;
    percentileMinArea?: number;
  }

  const WEEK_DAY: object = {
    1: "Monday",
    3: "Tuesday",
    5: "Wednesday",
    7: "Thursday",
    9: "Friday",
    11: "Saturday",
    13: "Sunday",
  }
  const subtractIfDefined = (a: number | undefined, b: number | undefined): number | undefined => {
    return (a !== undefined && b !== undefined) ? a - b : undefined;
  };
  const data = inputData.agpProfileGraph.values;
  const Newdata: DataItem[] = data.map((item, idx) => ({
    time: idx * 14 / (data.length - 1),
    dataLine: item.percentile95,
    overflowMaxArea: item.percentile95 > 150 ? item.percentile95 - 150 : 0,
    overflowMinArea: item.percentile95 < 130 ? item.percentile95 : 130,
    percentileMinArea: item.percentile95 < 130 ? 130 - item.percentile95 : 0,
    percentileMin: 130,
    percentileMax: 20,
    percentileRange: item.percentile95,
    zeroline: 0,
  }));

  return (
    <div>
      {/* <span className="y-axis-label items-center">mg/dL</span> */}
      <div className="flex flex-col justify-center items-center h-screen">
        <ResponsiveContainer width="90%" height={250}>
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
              ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
              tickFormatter={(time) => WEEK_DAY[time] ? WEEK_DAY[time] : ""}
              domain={['dataMin', 'dataMin']}
              orientation="top"
              style={{ fontSize: 12, fontWeight: "bold" }}
            />
            <YAxis yAxisId="y1" ticks={[70, 180]} style={{ fontSize: 13, fontWeight: "bold" }} />
            <YAxis yAxisId="y2" orientation="right" ticks={[70, 180]} style={{ fontSize: 13, fontWeight: "bold" }} />
            <Line
              yAxisId="y2"
              type="monotone"
              dataKey="zeroline"
              stroke="#000000"
              dot={false}
              strokeWidth={2}
            />
            <Area
              yAxisId="y1"
              type="monotone"
              stackId="1"
              dataKey="overflowMinArea"
              stroke="#ffffff"
              fill="white"
            />
            <Area
              yAxisId="y1"
              type="monotone"
              stackId="1"
              dataKey="percentileMinArea"
              stroke="#b3e6e0"
              fill="#ff0000"
            />
            <Area
              yAxisId="y1"
              type="monotone"
              stackId="1"
              dataKey="percentileMax"
              stroke="#ffffff"
              fill="#b3e6e0"
            />
            <Area
              yAxisId="y1"
              type="monotone"
              stackId="1"
              dataKey="overflowMaxArea"
              stroke="#b3e6e0"
              fill="#0000ff"
            />
            <Line
              yAxisId="y1"
              type="monotone"
              dataKey="percentileRange"
              stroke="#26736a"
              dot={false}
              strokeWidth={2}
            />
            <Line
              yAxisId="y2"
              type="monotone"
              dataKey="percentileRange"
              stroke="#26736a"
              dot={false}
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="90%" height={250}>
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
              ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
              tickFormatter={(time) => ""}
              domain={['dataMin', 'dataMin']}
              orientation="top"
              style={{ fontSize: 12, fontWeight: "bold" }}
            />
            <YAxis yAxisId="y1" ticks={[70, 180]} style={{ fontSize: 13, fontWeight: "bold" }} />
            <YAxis yAxisId="y2" orientation="right" ticks={[70, 180]} style={{ fontSize: 13, fontWeight: "bold" }} />
            <Line
              yAxisId="y2"
              type="monotone"
              dataKey="zeroline"
              stroke="#000000"
              dot={false}
              strokeWidth={2}
            />
            <Area
              yAxisId="y1"
              type="monotone"
              stackId="1"
              dataKey="percentileMin"
              stroke="#ffffff"
              fill="#ffffff"
            />
            <Area
              yAxisId="y1"
              type="monotone"
              stackId="1"
              dataKey="percentileMax"
              stroke="#ffffff"
              fill="#b3e6e0"
            />

            <Line
              yAxisId="y1"
              type="monotone"
              dataKey="percentileRange"
              stroke="#26736a"
              dot={false}
              strokeWidth={2}
            />
            <Line
              yAxisId="y2"
              type="monotone"
              dataKey="percentileRange"
              stroke="#26736a"
              dot={false}
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
