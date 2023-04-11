import MensajeFactory from '../service/drink.service.js'

const MensajeService = new MensajeFactory()

export const getAllMensajes = async (req, res) => {
  res.send(await MensajeService.getAllMensajes())
}

export const getMensajeById = async (req, res) => {
  const { id } = req.params
  res.send(await MensajeService.getMensajeById(id))
}

export const postMensaje = async (req, res) => {
  res.send(await MensajeService.createMensaje(req.body))
}