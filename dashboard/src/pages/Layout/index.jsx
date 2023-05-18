import Head from "next/head"
import Sidebar from "../Components/Sidebar"
import Navbar from "../Components/Navbar"
import { useUser } from "@auth0/nextjs-auth0/client"

const Layout = ({ children, setActiveTab, activeTab }) => {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <>
      <Head>
        <title>Dashboard | Oneramp </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar picture={user?.picture} />
      <div className="relative flex h-screen">
        {/* Left Sidebar */}
        <div className="flex w-1/6 h-full bg-white" />
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

        {/* Main Content */}
        <div className="w-5/6 mt-16 overflow-auto">{children}</div>
      </div>
    </>
  )
}

export default Layout
