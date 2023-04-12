import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link"
import { GrClose } from "react-icons/gr"
import ErrorPage from "../Components/ErrorPage"
import LoadingPage from "../Components/LoadingPage"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { APIURL } from "@/apiUrl"

const NewStore = () => {
  const { user, error, isLoading } = useUser()

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  const [success, setSuccess] = useState(false)

  const createNewStore = useMutation(
    (storeData) => axios.post(`${APIURL}/stores/`, storeData),
    {
      onSuccess: async (data) => {
        setSuccess(true)

        await localStorage.clear("activeStore")

        setName("")
        setCategory("")
        setDescription("")

        await localStorage.setItem("activeStore", data.data._id)

        setTimeout(() => {
          setSuccess(false)
        }, 2000)
      },
    }
  )

  const handleSubmit = () => {
    if (!name) {
      return alert("Store name is required")
    }

    try {
      const data = {
        userId: user.sub,
        storeName: name,
        category: category,
        description: description,
      }

      createNewStore.mutate(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  if (isLoading || createNewStore.isLoading) return <LoadingPage />

  if (error || createNewStore.error) return <ErrorPage />

  return (
    <div className="flex flex-col flex-1 w-full h-screen ">
      {/* Nav bar */}
      <nav className="flex flex-row items-center justify-between w-full h-16 px-4 shadow-sm">
        <Link href="/" className="flex flex-row items-center">
          <GrClose className="cursor-pointer" />
          <h1 className="mx-4 text-xl">Create a new store</h1>
        </Link>

        <button
          onClick={handleSubmit}
          className="p-2 px-6 text-white bg-black rounded-md"
        >
          Save
        </button>
      </nav>

      {success && (
        <h5 className="absolute p-3 text-green-500 bg-green-200 border-2 border-green-500 rounded-md top-24 left-1/2">
          Successfully created!
        </h5>
      )}

      {/* Store forms */}
      <div className="flex flex-col justify-center flex-1 px-12">
        {/* Store name form */}
        <div className="flex flex-col mb-5">
          <label htmlFor="storeName" className="text-sm">
            Store name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-1/3 border-[1px] rounded-md outline-black p-2 mt-2"
          />
        </div>

        {/*  */}
        <div className="flex flex-col mb-5">
          <label htmlFor="storeName" className="text-sm">
            Store category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-1/3 border-[1px] rounded-md outline-black p-2 mt-2"
          />
        </div>

        {/*  */}
        <div className="flex flex-col mb-5">
          <label htmlFor="storeName" className="text-sm">
            Store description
          </label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-1/3 border-[1px] rounded-md outline-black p-2 mt-2"
          />
        </div>
      </div>
    </div>
  )
}

export default NewStore
