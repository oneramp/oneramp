import Lottie from "lottie-react"
import error from "../../../public/error.json"

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Lottie animationData={error} width={20} height={20} loop={true} />
    </div>
  )
}

export default ErrorPage
