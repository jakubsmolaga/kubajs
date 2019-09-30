module.exports = async offer => {
  let result = await kuba.Offer.addOne(offer)
  console.log(result)
  return result
}