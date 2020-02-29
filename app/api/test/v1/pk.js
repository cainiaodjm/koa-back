const Router = require('koa-router')
const axios = require('axios')
const _ = require('lodash')
const {
    Success,
    NotFound
} = require('../../../../core/http-exception')
const router = new Router({
    prefix: '/v1/test/pk'
})
const URL = "https://api.api861861.com/pks/getPksHistoryList.do?lotCode=10037"
router.get('/list', async (ctx, next) => {

    const res = await axios.get(URL)
    let data = res.data.result.data
    throw new Success('查询成功', 0, data)

})
router.get('/nine_list', async (ctx, next) => {
    const res = await axios.get(URL)
    let data = res.data.result.data
    let analyzeData = []
    let cloneData = _.cloneDeep(data).slice(0, 30)
    for (let i = 0; i < cloneData.length; i++) {
        //取出每行一号位的数字
        let number = cloneData[i].preDrawCode.split(",")[0]
        analyzeData.push(number)
    }
    let rs = returnTenArray(analyzeData)
    //进行结果排序 排序之后再按照上位去分析
    let code = cloneData[0].preDrawCode.split(",")[0]
    
    throw new Success('查询成功', 0, rs)

})
const returnTenArray = (data) => {
    let _data = {
        "01": 0,
        "02": 0,
        "03": 0,
        "04": 0,
        "05": 0,
        "06": 0,
        "07": 0,
        "08": 0,
        "09": 0,
        "10": 0
    }
    let keyArray = Object.keys(_data)
    for(let i=0;i<data.length;i++){
        for(let j=0;j<keyArray.length;j++){
            console.log(data[i],keyArray[j])
            if(data[i] === keyArray[j]){
                _data[keyArray[j]]++
            }
        }
    }
    return _data
}
router.get('/nine', async (ctx, next) => {
    const res = await axios.get(URL)
    let data = res.data.result.data
    let analyzeData = []
    let cloneData = _.cloneDeep(data).slice(0, 30)
    //暂时取30条作为分析对象
    for (let i = 0; i < 6; i++) {
        analyzeData.push(data[i])
    }
    // console.log(getAllLineEndNumber(analyzeData))
    // let rs = getLineNumber(analyzeData, 0)

    let rsArray = []
    let rule = 2
    // for (let j = 0; j < 10; j++) {
    //     let _rs = getLineNumber(data, j, cloneData, rule)
    //     _rs.pos = j
    //     rsArray.push(_rs)
    // }
    let _rs = getLineNumber(data, 0, cloneData, rule)
    _rs.pos = 0
    rsArray.push(_rs)
    /**
     * 需要对前30条进行分析 对每个取出的号码 进行筛选 看那个号码上面是否与30条
     * 数据重合
     */

    throw new Success('查询成功', 0, rsArray)
})
const getLineNumber = (data, line, moldeArray, rule) => {
    let _data = _.cloneDeep(data).slice(0, rule + 4)
    console.log(_data.length)
    let lineArray = []
    let currentLine = null
    let killCode = null
    for (let i = 0; i < _data.length; i++) {
        let codeArray = _data[i].preDrawCode.split(',')
        let currentCode = codeArray[line]
        lineArray.push(currentCode)
    }
    let c = _data[_data.length - rule].preDrawCode.split(",")[line]
    let endArray = getAllLineEndNumber(data)
    for (let j = 0; j < endArray.length; j++) {
        if (c == parseInt(endArray[j])) {

            currentLine = j
        }
    }
    killCode = getRowNumber(_data, _data.length - rule)[currentLine]
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