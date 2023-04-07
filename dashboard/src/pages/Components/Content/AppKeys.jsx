import { useRef, useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

const AppKeys = () => {
  const [showSecret, setShowSecret] = useState(false)

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

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="text-2xl">API KEYS</h1>

      <div className="flex flex-col w-1/2 my-8">
        <div className="flex flex-col">
          <label htmlFor="publicKey">Public key</label>
          <div className="flex flex-row items-center justify-between cursor-text h-12 pl-4 outline-none w-full mt-2 rounded-md bg-neutral-100">
            <span ref={publicKeyRef}>
              FLWPUBK_TEST-ywefjhsdajdgkajhdkahdjkahsdj-OFF
            </span>
            <button
              onClick={() => copyText("PublicKey")}
              className="bg-neutral-700 h-full px-4 rounded-r text-white text-sm"
            >
              COPY
            </button>
          </div>
        </div>

        <div className="flex my-8 flex-col">
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
          <div className="flex flex-row items-center justify-between cursor-text h-12 pl-4 outline-none w-full mt-2 rounded-md bg-neutral-100">
            {showSecret ? (
              <span ref={secretKeyRef}>ywefjhsdajdgkajhdkahdjkahsdj-OFF</span>
            ) : (
              <span>*******************************</span>
            )}

            <button
              disabled={!showSecret}
              onClick={() => copyText("SecretKey")}
              className="bg-neutral-700 h-full px-4 rounded-r text-white text-sm"
            >
              COPY
            </button>
          </div>
        </div>
      </div>
      {copied && (
        <h3 className="bg-green-200 p-3 rounded-md text-center absolute right-14 shadow-sm">
          Copied!
        </h3>
      )}
    </div>
  )
}

export default AppKeys
