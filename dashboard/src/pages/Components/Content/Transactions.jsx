import { APIURL } from "@/apiUrl"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import React from "react"
import { AiFillEdit } from "react-icons/ai"

export default function Transactions() {
  const { isLoading, data, error } = useQuery(["transactions"], () =>
    axios
      .get(`${APIURL}/store/tx/${localStorage.getItem("activeStore")}`)
      .then((res) => res.data)
      .catch((err) => err.message)
  )

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const formattedDate = date.toLocaleString()
    return formattedDate
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            txHash
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Amount
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer">
            <div className="flex flex-row items-center">
              Fiat (UGX) <AiFillEdit />
            </div>
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Date
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Asset
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data?.map((transaction) => (
          <tr key={transaction.id}>
            <td className="px-6 py-4 text-sm text-blue-500 cursor-pointer whitespace-nowrap ">
              {transaction.txHash.substring(0, 4) +
                "..." +
                transaction.txHash.substring(transaction.txHash.length - 4)}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {transaction.amount.toLocaleString()}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {transaction.fiat.toLocaleString()}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {formatDate(transaction?.createdAt)}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              cUSD
            </td>
            <td className="px-6 py-4 text-sm text-green-500 whitespace-nowrap ">
              {transaction.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
