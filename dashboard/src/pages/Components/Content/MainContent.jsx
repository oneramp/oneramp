import AppKeys from "./AppKeys"
import Home from "./Home"

const MainContent = ({ activeTab, setActive }) => {
  switch (activeTab) {
    case "home":
      return <Home />
    // case "transactions":
    //   return <TransactionSummary />
    case "apiKeys":
      return <AppKeys />
    default:
      return null
  }
}

export default MainContent
