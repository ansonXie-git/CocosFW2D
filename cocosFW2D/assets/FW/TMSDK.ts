import { sys } from "cc";

export default class TMSDK {
    //0:wx; 1:qq
    private static wx_qq = 0
    /**
     * 天幕SDK初始化
     */
    public static TMInit() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0) {
                wx.tmSDK.init({
                    hideRequestLog: true,
                    appVersion: '0.0.7'
                });
            }
        }
    }
    //使用无登录版本SDK的，无需接入此部分内容
    public static TMLogin() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0) {
                wx.tmSDK.login().then(res => {
                    console.log(res)
                })
            }
        }
    }
    /**
     * AB测试
     * @param plan_id AB测试计划id
     * @param callback 回调{planId:string,groupId:string}（group_id: 在对应计划下当前用户所属的策略组ID  ）
     */
    public static TMABTest(plan_id: number, callback: Function) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0) {
                wx.tmSDK.abtest(plan_id).then(res => {
                    console.log(res);
                    if (callback != null) callback(res)
                });
            }
        }
    }
    /**
     * 天幕版本控制
     * @param callback 回调(参数：{"1" : {id: 1,key: 'share',description: '分享',status: 1 } })
     */
    public static TMVersionControl(callback: Function) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0) {
                wx.tmSDK.getJudgeConfig().then(res => {
                    console.log(res)
                    if (callback != null)
                        callback(res)
                })
            }
        }
    }
    /**
     * 获取天幕在线参数
     * @param callback 回调
     * @param key 天幕后台配置的key
     */
    public static GetJsonConfig(callback: Function, key?: string) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0) {
                if (key == null || key == '') {
                    wx.tmSDK.getAppJSONConfig().then((res) => {
                        console.log('在线配置参数:', res);
                        if (callback != null) callback()
                    });
                } else {
                    wx.tmSDK.getAppJSONConfig(key).then((res) => {
                        console.log('在线配置 key 对应的配置:', res);
                        if (callback != null) callback()
                    });
                }
            }
        }
    }
    /**
     * 检查广告位是否开启
     * @param positionId 广告id
     * @param callback 回调
     * @returns isOpen：是否开启；type：广告位类型（如无开启，则不反悔此信息）
     */
    public static CheckADSOpen(positionId: string, callback: Function) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0) {
                wx.tmSDK.checkFlowIsOpen({
                    positionId: positionId
                }).then((res: { isOpen: boolean, type: number }) => {
                    console.log('该广告位是否开启:', res.isOpen, res.type);
                    if (callback != null) callback(res)
                });
            }
        }
    }
    /**
     * 获取天幕广告（API式广告）
     * @param positionId 广告ID
     * @param callback 回调
     */
    public static GetTMADS(positionId: string, callback: Function) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0) {
                wx.tmSDK.getFlowConfig({
                    positionId: positionId
                }).then((config) => {
                    console.log('该广告位当前配置', config);
                    callback(config)
                });
            }
        }
    }
}

