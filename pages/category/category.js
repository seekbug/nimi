import { request } from "../../request/index.js"
Page({
    data: {
        //商品分类数据
        left_categorylist: [],
        right_categorylist: [],
        //左侧菜单点击
        currentIndex: 0,
        //点击左边菜单时设置右边滚动条的距离为0
        scrollTop: 0
    },

    onLoad: function (options) {
        console.log(options)


        //调用商品分类数据方法
        // this.getCateGoryList();    //不本地缓存直接这个就行

        //1、获取本地存储数据
        const categorylist = wx.getStorageSync("cates");
        //2、如果不存在，则发送请求
        if (!categorylist) {
            this.getCateGoryList();

        } else {
            //有旧的数据 定义过期时间 10s 改成 5分钟
            if (Date.now() - categorylist > 1000 * 50) {
                this.getCateGoryList();

            } else {
                //用旧的数据
                this.categorylist = categorylist.data
                //重新渲染页面
                let left_categorylist = this.categorylist.map(v => v.cat_name);
                let right_categorylist = this.categorylist[0].children;
                this.setData({
                    left_categorylist,
                    right_categorylist,
                    //重新设置顶部距离为0
                    scrollTop: 0
                })
            }
        }

    },
    //左侧菜单的点击事件
    handleclick (e) {
        // console.log(e);
        const { index } = e.currentTarget.dataset;
        let right_categorylist = this.categorylist[index].children;
        this.setData({
            currentIndex: index,
            right_categorylist
        })
    },
    //获取商品分类数据
    categorylist: [],
    getCateGoryList () {
        request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories', })
            .then(result => {
                this.categorylist = result.data.message
                //存入数据
                wx.setStorageSync('cates', { time: Date.now(), data: this.categorylist });

                let left_categorylist = this.categorylist.map(v => v.cat_name);
                // let right_categorylist = this.categorylist.map(v => v.children);
                let right_categorylist = this.categorylist[0].children;

                this.setData({
                    left_categorylist,
                    right_categorylist
                })
            })
    },
})