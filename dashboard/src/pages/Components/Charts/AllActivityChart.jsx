import { APIURL } from "@/apiUrl"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

const AllActivityChart = () => {
  const {
    isLoading,
    data: txDeposits,
    error,
  } = useQuery(["deposits"], () =>
    axios
      .get(`${APIURL}/deposit/${localStorage.getItem("activeStore")}`)
      .then((res) => res.data)
      .catch((err) => err.message)
  )

  const {
    isLoading: withdrawalsLoading,
    data: txWithdraws,
    error: txWithdrawError,
  } = useQuery(["withdraw"], () =>
    axios
      .get(`${APIURL}/withdraw/${localStorage.getItem("activeStore")}`)
      .then((res) => res.data)
      .catch((err) => err.message)
  )

  const {
    isLoading: allLoading,
    data: allActivity,
    error: errAllActivity,
  } = useQuery(["activity"], () =>
    axios
      .get(`${APIURL}/activity/${localStorage.getItem("activeStore")}`)
      .then((res) => res.data)
      .catch((err) => err.message)
  )

  if (isLoading || withdrawalsLoading || allLoading) return <p>Loading...</p>

  if (error || txWithdrawError || errAllActivity)
    return <h3>{error ? error : txWithdrawError}</h3>

  return (
    <div className="w-full my-8 overflow-x-hidden">
      <div className="flex flex-row w-full my-3 border-t-[0.8px] border-neutral-200">
        <div className="flex flex-1 border-r-[0.8px] border-neutral-200 py-4">
          <div className="flex flex-col">
            <h1 className="text-sm ">Total deposits</h1>
            <h1 className="text-3xl">{allActivity?.data.deposits}</h1>
            <h1 className="text-sm font-light text-neutral-500">
              Deposit activity in the last few days
            </h1>

            <div className="flex flex-1 w-full h-full my-4">
              <LineChart
                width={500}
                height={200}
                data={txDeposits.data}
                // margin={{ top: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#e3e8f0"
                  strokeDasharray="5 5"
                />
                <XAxis
                  dataKey="date"
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
                  dataKey="amount"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 2, fill: "#6366f1" }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "10px" }}
                  iconType="circle"
                  iconSize={10}
                  align="left"
                  verticalAlign="bottom"
                  formatter={(value) => {
                    return value === "amount" ? "Deposits" : "Withdrawals"
                  }}
                />
              </LineChart>
            </div>
          </div>
        </div>

        <div className="flex flex-1 p-4 border-neutral-200">
          <div className="flex flex-col">
            <h1 className="text-sm ">Total withdrawals</h1>
            <h1 className="text-3xl">{allActivity?.data.withdraws}</h1>
            <h1 className="text-sm font-light text-neutral-500">
              Withdraw activity in the last few days
            </h1>
            <div className="flex flex-1 w-full h-full my-4">
              <LineChart width={500} height={200} data={txWithdraws?.data}>
                <CartesianGrid
                  vertical={false}
                  stroke="#e3e8f0"
                  strokeDasharray="5 5"
                />
                <XAxis
                  dataKey="date"
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
                  dataKey="withdrawAmount"
                  stroke="#F77171"
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
                  wrapperStyle={{ paddingTop: "10px" }}
                  iconType="circle"
                  iconSize={10}
                  align="left"
                  verticalAlign="bottom"
                  formatter={(value) => {
                    return value === "withdrawAmount" && "Withdrawals"
                  }}
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
