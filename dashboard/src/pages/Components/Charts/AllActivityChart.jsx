import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

const AllActivityChart = () => {
  const deposits = [
    { day: "1 Mar", deposits: 500 },
    { day: "2 Mar", deposits: 0 },
    { day: "3 ", deposits: 600 },
    { day: "8 ", deposits: 380 },
    { day: "9 ", deposits: 520 },
    { day: "13 ", deposits: 580 },
    { day: "14 ", deposits: 420 },
    { day: "15 ", deposits: 510 },
    { day: "20 ", deposits: 380 },
    { day: "24 ", deposits: 400 },
    { day: "28 ", deposits: 410 },
    { day: "29 Mar", deposits: 510 },
  ]

  const withdrawals = [
    { day: "1 Mar", withdrawals: 200 },
    { day: "2 Mar", withdrawals: 150 },
    { day: "3 ", withdrawals: 250 },
    { day: "8 ", withdrawals: 200 },
    { day: "9 ", withdrawals: 300 },
    { day: "13 ", withdrawals: 230 },
    { day: "14 ", withdrawals: 160 },
    { day: "15 ", withdrawals: 310 },
    { day: "20 ", withdrawals: 170 },
    { day: "24 ", withdrawals: 150 },
    { day: "28 ", withdrawals: 150 },
    { day: "29 Mar", withdrawals: 280 },
  ]

  const data = [
    { day: "1 Mar", deposits: 500, withdrawals: 200 },
    { day: "2 Mar", deposits: 0, withdrawals: 150 },
    { day: "3 Mar", deposits: 600, withdrawals: 250 },
    { day: "8 Mar", deposits: 380, withdrawals: 200 },
    { day: "9 Mar", deposits: 520, withdrawals: 300 },
    { day: "13 Mar", deposits: 580, withdrawals: 230 },
    { day: "14 Mar", deposits: 420, withdrawals: 160 },
    { day: "15 Mar", deposits: 510, withdrawals: 310 },
    { day: "20 Mar", deposits: 380, withdrawals: 170 },
    { day: "24 Mar", deposits: 400, withdrawals: 150 },
    { day: "28 Mar", deposits: 410, withdrawals: 150 },
    { day: "29 Mar", deposits: 510, withdrawals: 280 },
  ]

  return (
    <div className="w-full my-8 overflow-x-hidden">
      <LineChart
        width={window.innerWidth}
        height={400}
        data={data}
        // margin={{ top: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid vertical={true} stroke="#e3e8f0" strokeDasharray="5 5" />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#718096" }}
        />
        {/* <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#718096" }}
          tickFormatter={(value) => `$${value / 1000}k`}
        /> */}
        <Tooltip
          contentStyle={{
            border: "none",
            borderRadius: "8px",
            background: "#1c2331",
            color: "#f8fafc",
          }}
        />
        <Line
          type="monotone"
          dataKey="deposits"
          stroke="#6366f1"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 5, strokeWidth: 2, fill: "#6366f1" }}
        />
        <Line
          type="monotone"
          dataKey="withdrawals"
          stroke="#f87171"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 5, strokeWidth: 2, fill: "#f87171" }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: "10px",
            paddingBottom: "25px",
            paddingRight: "350px",
          }}
          iconType="circle"
          iconSize={10}
          align="center"
          verticalAlign="bottom"
          formatter={(value) => {
            return value === "deposits" ? "Deposits" : "Withdrawals"
          }}
        />
      </LineChart>

      <div className="flex flex-row w-full my-3 border-t-[0.8px] border-neutral-200">
        <div className="flex flex-1 border-r-[0.8px] border-neutral-200 p-4">
          <div className="flex flex-col">
            <h1 className="text-sm ">Total deposits</h1>
            <h1 className="text-3xl">0</h1>
            <h1 className="text-sm font-light text-neutral-500">
              Deposit activity in the last days
            </h1>

            <div className="flex flex-1 w-full h-full my-4">
              <LineChart
                width={500}
                height={200}
                data={deposits}
                // margin={{ top: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#e3e8f0"
                  strokeDasharray="5 5"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#718096" }}
                />
                <Tooltip
                  contentStyle={{
                    border: "none",
                    borderRadius: "8px",
                    background: "#1c2331",
                    color: "#f8fafc",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="deposits"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 2, fill: "#6366f1" }}
                />
                <Line
                  type="monotone"
                  dataKey="withdrawals"
                  stroke="#f87171"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 2, fill: "#f87171" }}
                />
              </LineChart>
            </div>
          </div>
        </div>

        <div className="flex flex-1 p-4 border-neutral-200">
          <div className="flex flex-col">
            <h1 className="text-sm ">Total withdrawals</h1>
            <h1 className="text-3xl">0</h1>
            <h1 className="text-sm font-light text-neutral-500">
              Withdraw activity in the last days
            </h1>
            <div className="flex flex-1 w-full h-full my-4">
              <LineChart width={500} height={200} data={withdrawals}>
                <CartesianGrid
                  vertical={false}
                  stroke="#e3e8f0"
                  strokeDasharray="5 5"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#718096" }}
                />
                <Tooltip
                  contentStyle={{
                    border: "none",
                    borderRadius: "8px",
                    background: "#1c2331",
                    color: "#f8fafc",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="deposits"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 2, fill: "#6366f1" }}
                />
                <Line
                  type="monotone"
                  dataKey="withdrawals"
                  stroke="#f87171"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 2, fill: "#f87171" }}
                />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllActivityChart
