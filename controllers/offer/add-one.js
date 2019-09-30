module.exports = async (req, res) => {
  let offer = { id: 'asdf', name: 'qwer' }
  
  if (!kuba.Offer.isOk(offer)) return res.status(400).json('')

  let addedOffer = await kuba.Offer.addOne(offer)
  res.json(addedOffer)
}