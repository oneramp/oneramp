const OneRamp = require("..")

const oneRamp = new OneRamp("my-client-id", "my-secret-key")
// const oneRamp = new OneRamp("")

const response = oneRamp.deposit()

console.log(response)
