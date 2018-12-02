const numberFormater = (number, us = false) => {
  let newNumber = number

  if (Math.abs(newNumber) / 1000000000 > 1) {
    newNumber = `${(
      Math.abs(newNumber) / 1000000000
    ).toFixed(2)} ${us ? 'bln' : 'mld'}`
  } else if (Math.abs(newNumber) / 1000000 > 1) {
    newNumber = `${(
      Math.abs(newNumber) / 1000000
    ).toFixed(2)} mln`
  }

  return newNumber
}

export { numberFormater }
