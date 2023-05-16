import { Converter } from "easy-currencies"

export const currencyConvertor = async (
  amount: number,
  currencyFrom: string,
  currencyTo: string
) => {
  try {
    if (Number(amount) <= 0) {
      return Number(amount)
    }

    const converter = new Converter()
    const value = await converter.convert(amount, currencyFrom, currencyTo)
    return value.toString()
  } catch (error: any) {
    console.log(error.response)
  }
}
