import { Router } from "express"
import { getQuote } from "../apiControllers/offRamp"

const router = Router()

router.get("/quote", getQuote)
// router.get('/offramp', offRamp)

export default router
