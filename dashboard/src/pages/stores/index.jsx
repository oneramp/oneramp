import { APIURL } from "@/apiUrl"
import { useUser } from "@auth0/nextjs-auth0/client"
import axios from "axios"
import LoadingPage from "../Components/LoadingPage"
import ErrorPage from "../Components/ErrorPage"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useRouter } from "next/router"

function Stores() {
  const { user, error: authUserError, isLoading: authUserLoading } = useUser()

  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const activateStore = (store) => {
    setLoading(true)
    localStorage.setItem("activeStore", store._id)
    setLoading(false)
    router.push("/")
  }

  const { isLoading, error, data } = useQuery(["userStores", "userId"], () =>
    axios
      .get(`${APIURL}/stores/${user.sub}`)
      .then((res) => res.data)
      .catch((err) => err.message)
  )

  if (loading || isLoading || authUserLoading) return <LoadingPage />

  if (error || authUserError) return <ErrorPage />

  return (
    <div className="flex flex-col w-full h-screen bg-neutral-100">
      <nav className="flex flex-row items-center w-full h-16 px-5 ">
        <img src="/oneramp.svg" alt="Logo" className="w-24 h-full mr-2" />
      </nav>

      <div className="flex items-center justify-center flex-1 ">
        <div className="w-1/3 my-4 bg-white rounded-md shadow-sm ">
          {/* Shop cards */}

          {data.map((store) => (
            <div key={store._id} onClick={() => activateStore(store)} href="/">
              <div className="flex border-b-[0.5px] p-4 hover:bg-neutral-50 cursor-pointer flex-row items-center w-full">
                <div className="w-12 h-12 mr-4 rounded-full bg-neutral-800"></div>
                <div className="flex flex-col">
                  <h1 className="text-lg">{store.storeName}</h1>
                  <p className="text-xs font-light text-neutral-500">
                    {store._id}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Stores
