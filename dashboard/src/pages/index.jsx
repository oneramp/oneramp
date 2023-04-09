import styles from "@/styles/Home.module.css"
import Layout from "./Layout"
import { withAuth } from "@/utils/withAuth"
import { useEffect, useState } from "react"
import MainContent from "./Components/Content/MainContent"
import { useQuery } from "@tanstack/react-query"
import { APIURL } from "@/apiUrl"
import axios from "axios"
import LoadingPage from "./Components/LoadingPage"
import ErrorPage from "./Components/ErrorPage"
import { useRouter } from "next/router"
import { useUser } from "@auth0/nextjs-auth0/client"

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("home")

  const { user, error: authUserError, isLoading: authUserLoading } = useUser()

  const router = useRouter()

  const { isLoading, error, data } = useQuery(["userStores", user?.sub], () =>
    axios
      .get(`${APIURL}/stores/${user.sub}`)
      .then((res) => res.data)
      .catch((err) => err.message)
  )

  useEffect(() => {
    if (
      !authUserLoading &&
      !authUserError &&
      !isLoading &&
      !error &&
      data.length <= 0
    ) {
      router.push("/stores/new")
    }

    // if (!localStorage.getItem("activeStore")) {
    //   router.push("/stores")
    // }

    if (!localStorage.getItem("activeStore") && data?.length >= 1) {
      router.push("/stores/new")
    }
  }, [isLoading, error, data, router, authUserLoading, authUserError, data])

  if (isLoading || authUserLoading) return <LoadingPage />

  if (error || authUserError) return <ErrorPage />

  return (
    <Layout user={user} setActiveTab={setActiveTab} activeTab={activeTab}>
      <main className="p-10">
        <MainContent activeTab={activeTab} />
      </main>
    </Layout>
  )
}

export default withAuth(HomePage)
