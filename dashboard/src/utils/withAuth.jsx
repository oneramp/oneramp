import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, error, isLoading } = useUser()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !user) {
        router.replace("/api/auth/login")
      }
    }, [isLoading, user, router])

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (error) {
      return <div>{error.message}</div>
    }

    return <WrappedComponent {...props} />
  }
}
