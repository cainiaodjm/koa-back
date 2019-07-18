const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const { NotFound, AuthFaild } = require('../../core/http-exception')
class Flow extends Model {
  static async reduceFavNumsByTypeIdAndType(type_id, type) {
    let flow = await Flow.findOne({
      where: {
        type_id: type_id,
        type: type
      }
    })
    if (!flow) {
      throw new NotFound('资源未找到')
    }
    let favNums = flow.fav_nums - 1
    await flow.update({
      fav_nums: favNums
    }, {
        where: {
          type_id: type_id,
          type: type
        }
      })
    return flow.id

  }
  static async list(start, count) {
    let flows = await Flow.findAll({
      offset: start,
      limit: count,
      order: [
        ['index', 'DESC']
      ]
    })
    const { Art } = require('./art')
    const res = await Art.getList(flows)

    return res
  }
  static async addFavNumsByTypeIdAndType(type_id, type) {
    let flow = await Flow.findOne({
      where: {
        type_id: type_id,
        type: type
      }
    })
    if (!flow) {
      throw new NotFound('资源未找到')
    }
    let favNums = flow.fav_nums + 1
    await flow.update({
      fav_nums: favNums
    }, {
        where: {
          type_id: type_id,
          type: type
        }
      })

    return flow.id
  }
  static async addFlow(title, content, type, image, musicUrl, pubdate) {
    /**
     * 1.先找出最新的一期的index
     * 2.根据类型 插入到对应的表中
     */
    const flow = await Flow.findOne({
      order: [
        ['index', 'DESC']
      ]
    })
    const index = flow.index
    const newIndex = index + 1
    if (type === 100) {
      //插入到电影表中
      const { Movie } = require('./classic')
      return sequelize.transaction(async (t) => {
        const newMoive = await Movie.create({
          title,
          content,
          pubdate,
          type,
          image,
          index: newIndex
        }, {
            transaction: t
          })
        const art_id = newMoive.id
        //插入到Flow表中
        const newFlow = await Flow.create({
          index: newIndex,
          type,
          art_id
        },{
          transaction:t
        })
        return newFlow

      })


      // return newFlow
    } else if (type === 200) {
      const { Music } = require('./classic')
      const newMusic = await Music.create({
        title,
        content,
        pubdate,
        type,
        image,
        url: musicUrl,
        index: newIndex
      })
      const art_id = newMusic.id
      //插入到Flow表中
      const newFlow = await Flow.create({
        index: newIndex,
        type,
        art_id
      })
      return newFlow
    } else {
      const { Sentence } = require('./classic')
      const newSentence = await Sentence.create({
        title,
        content,
        pubdate,
        type,
        image,
        index: newIndex
      })
      const art_id = newSentence.id
      const newFlow = await Flow.create({
        index: newIndex,
        type,
        art_id
      })
      return newFlow

    }

  }
}
Flow.init({
  index: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER,
}, {
    sequelize,
    tableName: 'tb_flow',
  })
module.exports = { Flow }