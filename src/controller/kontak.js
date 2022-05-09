import { kontak } from '#model'
import { Op } from 'sequelize'

export const getSearch = async (req, res) => {
  console.log(req.params.id)
  try {
    const data = await kontak.findAndCountAll({
      where: {
        [Op.or]: {
          nohp: {
            [Op.like]: `${req.params.id}%`
          },
          nama: {
            [Op.like]: `${req.params.id}%`
          }
        }
      },
      limit: 3,
      offset: 0
    })
    res.status(200).json({ message: data.rows.length ? 'Data Ditemukan' : 'Data Tidak Ditemukan', ...data })
  } catch (err) {
    res.status(500).json({
      error: {
        message: err.message
      }
    })
  }
}
