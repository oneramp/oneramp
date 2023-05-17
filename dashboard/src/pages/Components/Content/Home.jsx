import { useQuery } from "@tanstack/react-query"
import AllActivityChart from "../Charts/AllActivityChart"
import axios from "axios"
import { APIURL } from "@/apiUrl"

const Home = () => {
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

  return (
    <div className="flex flex-col flex-1">
      <h1 className="text-2xl font-medium">Overview</h1>

      <div className="flex flex-col my-4">
        <h5 className="my-2 text-xs font-light">Total revenue moved</h5>

        {!allLoading && !errAllActivity && (
          <h1 className="text-2xl">UGX {allActivity?.data.total}</h1>
        )}

        <h5 className="text-xs font-light">
          All deposit and withdraw activity
        </h5>
      </div>

      <AllActivityChart />
    </div>
  )
}

export default Home
