const Router = require('koa-router')
const axios = require('axios')
const _ = require('lodash')
const { Success, NotFound } = require('../../../../core/http-exception')
const router = new Router({
    prefix: '/v1/test/pk'
})
const URL = "https://api.api861861.com/pks/getPksHistoryList.do?lotCode=10037"
router.get('/list', async (ctx, next) => {

    const res = await axios.get(URL)
    let data = res.data.result.data
    throw new Success('查询成功', 0, data)

})
router.get('/nine', async (ctx, next) => {
    const res = await axios.get(URL)
    let data = res.data.result.data
    let analyzeData = []
    let cloneData = _.cloneDeep(data).slice(0, 30)
    console.log(cloneData)
    //暂时取30条作为分析对象
    for (let i = 0; i < 6; i++) {
        analyzeData.push(data[i])
    }
    // console.log(getAllLineEndNumber(analyzeData))
    // let rs = getLineNumber(analyzeData, 0)

    let rsArray = []
    for (let j = 0; j < 10; j++) {
        let _rs = getLineNumber(analyzeData, j, cloneData)
        _rs.pos = j
        rsArray.push(_rs)
    }
    // let _rs = getLineNumber(analyzeData, 0, cloneData)
    // rsArray.push(_rs)
    /**
     * 需要对前30条进行分析 对每个取出的号码 进行筛选 看那个号码上面是否与30条
     * 数据重合
     */

    throw new Success('查询成功', 0, rsArray)
})
const getLineNumber = (data, line, moldeArray) => {

    let lineArray = []
    let currentLine = null
    let killCode = null
    for (let i = 0; i < data.length; i++) {
        let codeArray = data[i].preDrawCode.split(',')
        let currentCode = codeArray[line]
        lineArray.push(currentCode)
    }
    let c = data[data.length - 2].preDrawCode.split(",")[line]
    let endArray = getAllLineEndNumber(data)
    for (let j = 0; j < endArray.length; j++) {
        if (c == parseInt(endArray[j])) {

            currentLine = j
        }
    }
    killCode = getRowNumber(data, data.length - 2)[currentLine]
    let count = _analyzeData(moldeArray, killCode, currentLine, line)
    return {
        killCode,
        count
    }
}
const getAllLineEndNumber = (data) => {
    return data[data.length - 1].preDrawCode.split(",")
}
const getRowNumber = (data, row) => {
    return data[row].preDrawCode.split(",")
}
const _analyzeData = (data, code, currentLine, downCodeLine) => {

    let count = 0
    console.log(downCodeLine)
    //首先拿到下位的数字
    let downCode = data[0].preDrawCode.split(",")[downCodeLine]
    console.log(data.length)
    console.log(downCode)
    for (let i = 1; i < data.length; i++) {
        //获取每行数据的下位数字的列位置
        let pos = data[i].preDrawCode.split(",").indexOf(downCode)
        //拿到上一行的所在位置的数字
        console.log(data[i - 1].preDrawCode.split(","))
        console.log(pos)
        let preRowCode = data[i - 1].preDrawCode.split(",")[pos]
        console.log(code, preRowCode)
        if (code === preRowCode) {
            count++
        }
    }
    return count
}
module.exports = router