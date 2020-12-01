import { request } from "../../request/index.js"
Page({
    data: {
        tabs: [
            {
                id: 0,
                value: '综合',
                isActive: true
            },
            {
                id: 0,
                value: '销量',
                isActive: false
            },
            {
                id: 0,
                value: '价格',
                isActive: false
            },
        ],
        goodsList: []
    },
    //接口要的参数
    Queryparams: {
        query: "",
        cid: '',
        pagenum: 1,
        pagesize: 10
    },
    //总页数
    totalPage: 1,
    onLoad: function (options) {
        // console.log(options)
        this.Queryparams.cid = options.cid;
        this.getCatesList()
    },
    // 标题点击事件 从子组件传递过来
    handleTabsItemChange (e) {
        // 1 获取被点击的标题索引
        const { index } = e.detail;
        // 2 修改源数组
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        // 3 赋值到data中
        this.setData({
            tabs
        })
    },
    //获取商品列表
    getCatesList () {
        request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search', })
            .then(result => {
                console.log(result)
                //获取 总条数
                // const total = result.data.message.total;
                // 计算总页数
                // this.totalpage = Math.ceil(total / this.Queryparams.pagesize);
                this.totalpage = 3;
                console.log(this.totalpage);
                this.setData({
                    // goodsList: result.data.message.goods
                    //旧数组 拼接
                    goodsList: [...this.data.goodsList, ...result.data.message.goods]
                });
                //关闭下拉等待效果  如果没有下拉 这个关闭也不影响
                wx.stopPullDownRefresh();
            })
    },


    //页面上拉触底事件
    onReachBottom () {
        // 判断还有没有下一页
        if (this.Queryparams.pagenum >= this.totalpage) {
            wx.showToast({
                title: '没有下一条',
            })
        } else {
            this.Queryparams.pagenum++
            this.getCatesList()
        }
    },
    //页面下拉刷新
    //1 在.json文件中配置
    //2 重置 数据 数组
    //3 重置页数 为1
    //4 重新发送请求
    //5 数据请求回来 手动关闭页面等待效果（在请求那写）
    onPullDownRefresh () {
        //2 重置数组（因为之前拼接过，所以d得重置）
        this.setData({
            goodsList: [],
        })
        //3 重置页码
        this.Queryparams.pagenum = 1;
        //4 重新发送请求
        this.getCatesList()
    }

})