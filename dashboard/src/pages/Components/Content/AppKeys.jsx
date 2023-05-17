'use client'
import { APIURL } from "@/apiUrl"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRef, useState, useEffect } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

const AppKeys = () => {
  const [showSecret, setShowSecret] = useState(false)
  
  const [ localStorageId, setLocalStorageId ] = useState(null)
  
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      setLocalStorageId(localStorage.getItem("activeStore"))
    }
  }, [])

  const {
    isLoading,
    error,
    data: store,
  } = useQuery(["store", localStorageId], () =>
    axios
      .get(`${APIURL}/store/${localStorageId}`)
      .then((res) => res.data)
      .catch((err) => err.message)
  )

  const {
    isLoading: loadingKeys,
    error: errorKeys,
    data: storeKeys,
  } = useQuery(["creds", localStorageId], () =>
    axios
      .get(`${APIURL}/creds/${localStorageId}`)
      .then((res) => res.data)
      .catch((err) => err.message)
  )

  const [copied, setCopied] = useState(false)

  const publicKeyRef = useRef(null)
  const secretKeyRef = useRef(null)

  const toggleReveal = () => setShowSecret(!showSecret)

  const copyText = (type) => {
    switch (type) {
      case "PublicKey":
        const publicKeyText = publicKeyRef.current.innerText
        navigator.clipboard
          .writeText(publicKeyText)
          .then(() => {
            setCopied(true)
            setTimeout(() => {
              setCopied(false)
            }, 2000)
          })
          .catch((error) => {
            console.error("Failed to copy text: ", error)
          })
        break
      case "SecretKey":
        const textToCopy = secretKeyRef.current.innerText
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            setCopied(true)
            setTimeout(() => {
              setCopied(false)
            }, 2000)
          })
          .catch((error) => {
            console.error("Failed to copy text: ", error)
          })
        break
      default:
        return
    }
  }

  if (loadingKeys || isLoading) return <h2>Loading...</h2>
  if (error || errorKeys) return <h2>error</h2>

  return (
    <div className="flex flex-col flex-1">
      <h1 className="text-2xl">API KEYS for {store.storeName} </h1>

      <div className="flex flex-col w-full my-8">
        <div className="flex flex-col">
          <label htmlFor="publicKey">Public key</label>
          <div className="flex flex-row items-center justify-between w-full h-12 pl-4 mt-2 rounded-md outline-none cursor-text bg-neutral-100">
            {storeKeys && <span ref={publicKeyRef}>{storeKeys.clientId}</span>}
            <button
              onClick={() => copyText("PublicKey")}
              className="h-full px-4 text-sm text-white rounded-r bg-neutral-700"
            >
              COPY
            </button>
          </div>
        </div>

        <div className="flex flex-col w-full my-8">
          <div
            onClick={toggleReveal}
            className="flex flex-row items-center cursor-pointer"
          >
            <label htmlFor="secretKey">Secret key</label>
            {!showSecret ? (
              <AiFillEye className="mx-4" />
            ) : (
              <AiFillEyeInvisible className="mx-4" />
            )}
          </div>
          <div className="flex flex-row items-center justify-between w-full h-12 pl-4 mt-2 rounded-md outline-none cursor-text bg-neutral-100">
            {showSecret ? (
              storeKeys && <span ref={secretKeyRef}>{storeKeys.secret}</span>
            ) : (
              <span>*******************************</span>
            )}

            <button
              disabled={!showSecret}
              onClick={() => copyText("SecretKey")}
              className="h-full px-4 text-sm text-white rounded-r bg-neutral-700"
            >
              COPY
            </button>
          </div>
        </div>
      </div>
      {copied && (
        <h3 className="absolute p-3 text-center bg-green-200 rounded-md shadow-sm right-14">
          Copied!
        </h3>
      )}
    </div>
  )
}

export default AppKeys
