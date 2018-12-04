let exchangeRates = {}

const getExchangeRates = () => {
  if (Object.keys(exchangeRates).length > 1) {
    return
  }
  fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP,PLN,EUR')
    .then((res) => res.json())
    .then((json) => {
      exchangeRates = json.rates
      exchangeRates.USD = 1
    })
}

const numberFormater = (number, us = false, currency) => {
  let newNumber = number
  getExchangeRates()
  if (currency && currency !== 'USD') {
    newNumber = number * exchangeRates[currency]
  }

  if (Math.abs(newNumber) / 1000000000 > 1) {
    newNumber = `${(
      Math.abs(newNumber) / 1000000000
    ).toFixed(2)} ${us ? 'bln' : 'mld'}`
  } else if (Math.abs(newNumber) / 1000000 > 1) {
    newNumber = `${(
      Math.abs(newNumber) / 1000000
    ).toFixed(2)} mln`
  } else {
    newNumber = newNumber.toFixed(2)
  }

  return newNumber
}

export default numberFormater
