import { useUser } from "@auth0/nextjs-auth0/client"

export default function useGetUser() {
  const { user } = useUser()

  return user
}
