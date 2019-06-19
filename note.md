在api的编写中 权限是最复杂 最难的一块
除了 要限制token之外 还分角色
在这个系统中 我们给每一个角色一个scope 用一个数字表示
在生成token时 将scope写入到token里
在每个API访问时 设置一个中间件 定义接口的scope 
两个scope进行比较 就空了api的控制


业务逻辑
业务分层


