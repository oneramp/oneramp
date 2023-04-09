import { APIURL } from "@/apiUrl"
import axios from "axios"

const useFetchStores = () => {
  const request = async () => {
    const result = await axios.get(`${APIURL}/stores/${userId}`)
  }
  return <div>useFetchStores</div>
}

export default useFetchStores
