import AllActivityChart from "../Charts/AllActivityChart"

const Home = () => {
  return (
    <div className="flex flex-col flex-1">
      <h1 className="text-2xl font-medium">Overview</h1>

      <h5 className="text-base font-light">Total Activity</h5>

      <AllActivityChart />
    </div>
  )
}

export default Home
