import { kontak } from '#model'
import { Op } from 'sequelize'

export const getSearch = async (req, res) => {
  console.log(req.params.id)
  try {
    const data = await kontak.findAll({
      where: {
        nohp: {
          [Op.like]: `${req.params.id}%`
        }
      }
    })
    res.status(200).json({
      message: data.length ? 'data didapatkan' : 'data kosong',
      data
    })
  } catch (err) {
    res.status(500).json({
      error: {
        message: err.message
      }
    })
  }
}
