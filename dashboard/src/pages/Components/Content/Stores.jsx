import { APIURL } from "@/apiUrl"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { AiOutlinePlus } from "react-icons/ai"
import LoadingPage from "../LoadingPage"
import ErrorPage from "../ErrorPage"
import { useState, useEffect } from "react"

const Stores = () => {
  const { user, error: authUserError, isLoading: authUserLoading } = useUser()
  
  const [ localStorageId, setLocalStorageId ] = useState(null) 

  const [activeStore, setActiveStore] = useState(null)
  
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {

      // Perform localStorage action
      setLocalStorageId(localStorage.getItem("activeStore"))
    }
  },[])

  const { isLoading, error, data } = useQuery(["userStores", user.sub], () =>
    axios
      .get(`${APIURL}/stores/${user.sub}`)
      .then((res) => res.data)
      .catch((err) => err.message)
  )

  if (isLoading || authUserLoading) return <LoadingPage />

  if (error || authUserError) return <ErrorPage />

  return (
    <div className="flex flex-col justify-between flex-1 w-full h-screen ">
      <div className="flex">
        <h1 className="text-5xl font-extrabold">Manage all your stores here</h1>
      </div>

      <div className="flex">
        <Link
          href="/stores/new"
          className="flex flex-row items-center p-4 px-5 my-5 text-sm bg-orange-400 rounded-md"
        >
          Add a new store
          <AiOutlinePlus className="ml-3" />
        </Link>
      </div>
      {/*  */}
      <div className="flex flex-row flex-wrap items-center flex-1">
        {/* Shop card.. */}
        {data.map((store) => (
          <div
            key={store._id}
            className="h-40  mr-5 flex flex-col items-center p-3 rounded-md border-[0.8px] shadow-sm cursor-pointer w-48"
          >
            <div className="flex flex-col justify-center flex-1">
              <h1 className="text-lg font-medium">{store.storeName}</h1>
              <p className="text-xs font-light text-neutral-400">{store._id}</p>
            </div>
            {localStorageId == store._id ? (
              <div className="flex items-center justify-center w-full py-2 text-sm text-red-500 rounded-md bg-neutral-50">
                Active
              </div>
            ) : (
              <button className="w-full py-2 text-sm text-blue-500 rounded-md bg-neutral-50">
                Open
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stores
