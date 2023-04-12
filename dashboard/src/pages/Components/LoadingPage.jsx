import Lottie from "lottie-react"
import loading from "../../../public/loading.json"

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Lottie animationData={loading} loop={true} />
    </div>
  )
}

export default LoadingPage
