import { mahasiswa, jurusan } from '#model'
import { Op, fn, col } from 'sequelize'
export const getAll = async (req, res) => {
  try {
    const data = await mahasiswa.findAll({
      attributes: { exclude: 'kd_jurusan' },
      include: [
        {
          model: jurusan,
          attributes: ['kd_jurusan', 'nama_jurusan']
        }
      ]
      // where: {
      //   [Op.or]: {
      //     nama: 'alwan',
      //     kd_jurusan: 'tkj',
      //     angkatan: { [Op.between]: [2010, 2014] }
      //   }
      //   // kd_jurusan: {
      //   //   [Op.or]: ['TKJ', 'RPL'],
      //   // },
      //   // angkatan: {
      //   //   [Op.between]: [2010, 2020]
      //   // }
      // },
      // order: [
      //   ['angkatan', 'desc']
      //   // [fn('max', col('angkatan')), 'desc']
      // ]
      // limit: 2
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

export const getPagenation = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10
  const offset = parseInt(req.query.offset) || 0
  try {
    const data = await mahasiswa.findAndCountAll({
      attributes: { exclude: 'kd_jurusan' },
      include: [
        {
          model: jurusan,
          attributes: ['kd_jurusan', 'nama_jurusan']
        }
      ],
      limit,
      offset
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

export const getOne = async (req, res) => {
  try {
    const data = await mahasiswa.findOne({
      where: {
        nim: req.params.key
      }
    })
    res.status(200).json({
      message: data ? 'data didapatkan' : 'data kosong',
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

export const getSearch = async (req, res) => {
  try {
    const data = await mahasiswa.findAll({
      where: {
        nama: {
          [Op.like]: `%${req.query.keyword}%`
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
export const create = async (req, res) => {
  try {
    const data = await mahasiswa.create(req.body)
    res.status(201).json({
      message: 'data berhasil ditambahkan',
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

export const update = async (req, res) => {
  try {
    const data = await mahasiswa.update(req.body, {
      where: {
        nim: req.params.key
      }
    })
    res.status(200).json({
      message: data[0] ? 'data berhasil diubah' : 'data tidak ada yang diubah',
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

export const deleteOne = async (req, res) => {
  try {
    const data = await mahasiswa.destroy({
      where: {
        nim: req.params.key
      }
    })
    res.status(200).json({
      message: data ? 'data berhasil dihapus' : 'data yang dihapus tidak ada',
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
