import AppKeys from "./AppKeys"
import Home from "./Home"
import Stores from "./Stores"

const MainContent = ({ activeTab, setActive }) => {
  switch (activeTab) {
    case "home":
      return <Home />
    case "stores":
      return <Stores />
    // case "transactions":
    //   return <TransactionSummary />
    case "apiKeys":
      return <AppKeys />
    default:
      return null
  }
}

export default MainContent
