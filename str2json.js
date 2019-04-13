var str = "奴隶社会,非洲,古埃及文明,金字塔\n,亚洲,两河流域文明,汉谟拉比法典\n,,古印度,种姓制度\n,,,佛教的创立\n,欧洲,希腊,希腊城邦\n,,,雅典民主\n,,罗马,城邦\n,,,帝国的征服与扩展\n,,希腊罗马古典文化,建筑艺术\n,,,公历";
console.log(str)
function str2json(str) {
    /**根据字符串首部的逗号数量 判断层级，并格式化字符串 */
    function getLevelAndNewStr(str) {
        var len = /^,*/.exec(str)[0].length;
        return {
            level: len,
            rowStr: str.substring(len)
        }
    }

    /**创建节点 */
    function createNode(key) {
        var obj = {}
        obj[key] = []
        return obj
    }

    var arr = str.split("\n")

    /**确定 第一个节点 */
    var index = arr[0].indexOf(",")
    var label = arr[0].substring(0, index);
    arr[0] = arr[0].substring(index);
    var firstNode = createNode(label)
    // 存储最新的 不同层级的 父节点数组地址
    var nodeArrayAddressList = [firstNode[label]]

    for (var orginRowStr of arr) {
        // var {
        //     level,
        //     rowStr
        // } = getLevelAndNewStr(orginRowStr)
        var levelAndNewStr = getLevelAndNewStr(orginRowStr);
        var level = levelAndNewStr.level;
        var rowStr = levelAndNewStr.rowStr;

        var rowArray = rowStr.split(",");
        var index = 0;
        // 保存 父节点 数组 指针
        var parentArray = nodeArrayAddressList[level - 1]
        for (var name of rowArray) {
            var node = createNode(name)
            //赋值
            parentArray.push(node);
            // 更新 层级 父节点数组地址
            nodeArrayAddressList[level + index] = node[name];
            // 以当前节点数组指针 作为 下一轮循环的 父节点 数组 指针
            parentArray = node[name];
            index++;
        }
    }

    return firstNode
}

console.log(str2json(str))
