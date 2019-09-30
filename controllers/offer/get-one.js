module.exports = async (req, res) => {
  let { id } = req.params
  let offer = await kuba.utils.offer.getOne(id)
  return res.json(offer)
}