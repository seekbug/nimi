import { request } from "../../request/index.js"
Page({
    /* 页面的初始数据 */
    data: {
        //轮播图
        swiperlist: [],
        catelist: [],
        floorlist: []

    },

    /* 生命周期函数--监听页面加载 */
    onLoad: function (options) {
        //1、发送异步请求获取轮播图  
        // wx.request({
        //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //     success: (result) => {
        //         console.log(result)
        //         console.log(result.data.message)
        //         this.setData({
        //             swiperlist:result.data.message

        //         })
        //     },
        // })
        //1、发送异步请求获取轮播图 优化的手段可以通过es6的promise方法
        // request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',})
        //     .then(result => {
        //         this.setData({
        //             swiperlist: result.data.message
        //         })
        //     })
        //1、调用轮播图方法
        this.getSwiperList();
        //2、调用分类导航方法
        this.getCateList();
        //3、调用楼层数据方法
        this.getFloorList();



    },
    //获取轮播图数据
    getSwiperList () {
        request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata', })
            .then(result => {
                this.setData({
                    swiperlist: result.data.message
                })
            })
    },
    //获取分类导航数据
    getCateList () {
        request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems', })
            .then(result => {
                // console.log(result)
                this.setData({
                    catelist: result.data.message
                })
            })
    },
    //获取分楼层数据
    getFloorList () {
        request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata', })
            .then(result => {
                // console.log(result)
                this.setData({
                    floorlist: result.data.message
                })
            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})