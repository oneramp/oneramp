import styles from "@/styles/Home.module.css"
import Layout from "./Layout"
import { withAuth } from "@/utils/withAuth"
import { useState } from "react"
import MainContent from "./Components/Content/MainContent"

const HomePage = ({ user }) => {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <Layout user={user} setActiveTab={setActiveTab} activeTab={activeTab}>
      <main className="p-10">
        <MainContent activeTab={activeTab} />
      </main>
    </Layout>
  )
}

export default withAuth(HomePage)
