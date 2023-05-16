import AllActivityChart from "../Charts/AllActivityChart"

import AllActivityChart from "../Charts/AllActivityChart"

const Home = () => {
  return (
    <div className="flex flex-col flex-1">
      <h1 className="text-2xl font-medium">Overview</h1>

      <div className="flex flex-col my-4">
        <h5 className="my-2 text-xs font-light">Total Revenue</h5>

        <h1 className="text-2xl">UGX 500000</h1>
      </div>

      <AllActivityChart />
    </div>
  )
}

export default Home
