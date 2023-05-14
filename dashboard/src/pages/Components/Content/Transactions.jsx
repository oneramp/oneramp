import { APIURL } from "@/apiUrl"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from "react"

export default function Transactions() {
  const { isLoading, data, error } = useQuery(["transactions"], () =>
    axios
      .get(`${APIURL}/store/tx/${localStorage.getItem("activeStore")}`)
      .then((res) => res.data)
      .catch((err) => err.message)
  )

  const transactions = [
    { id: 1, date: "2023-05-13", amount: "$50", status: "Success" },
    { id: 2, date: "2023-05-12", amount: "$75", status: "Success" },
    { id: 3, date: "2023-05-11", amount: "$100", status: "Failed" },
    // Add more transactions as needed
  ]

  console.log(data, localStorage.getItem("activeStore"), error)

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            txHash
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Fiat
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Asset
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data?.map((transaction) => (
          <tr key={transaction.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {transaction.txHash.substring(0, 4) +
                "..." +
                transaction.txHash.substring(transaction.txHash.length - 4)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {transaction.amount}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {transaction.amount}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {transaction.amount}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              cUSD
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 ">
              {transaction.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
