import { request } from "../../request/index.js"
Page({
    data: {
        objLsit: {}
    },
    onLoad: function (options) {
        const { goods_id } = options;
        // console.log(goods_id);
        this.getGoodsObj(goods_id)
    },

    //获取详情列表数据
    getGoodsObj (goods_id) {
        request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail', data:{goods_id}})
            .then(result => {
                console.log(result)
                this.setData({
                    objLsit: result.data.message
                })
            })
    },

})