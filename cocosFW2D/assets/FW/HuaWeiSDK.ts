
import EventManager from "./EventManager";
import GameData from "./GameData";
import LogIn from "./LogIn";
/**
 * 微信广告ID
 */
export const HuaWeiADSID = {
    // custom_newRecord_Banner: 'adunit-21c6a1c91b2fb1b6',//关卡新纪录banner
    // custom_winner_Banner: 'adunit-7dc125c003d714f4',//关卡胜利banner
    mission_Reward: 'e7hm5vx799',//任务视频//x4s1dqjbco
    getGold_Reward: 'e7hm5vx799',//获得金币视频
    tenPrecentage_Reward: 'e7hm5vx799',//十倍奖励视频
    custom_ThreePrecentage_Reward: 'e7hm5vx799',//关卡结算三倍奖励视频
    custom_newRecord_twoPrecentage_Reward: 'e7hm5vx799',//新纪录双倍奖励视频
    reStart_Reward: 'e7hm5vx799',//重新开始视频
    skill_support_Reward: 'e7hm5vx799',//技能援军视频
    skill_defense_Reward: 'e7hm5vx799',//技能防守视频
    skill_speedUp_Reward: 'e7hm5vx799',//技能加速视频
    // turnTabel_Reward: 'adunit-ac5554dc8aa82f84',//转盘视频
    checkIn_Reward: 'e7hm5vx799',//签到视频
    getPower_Reward: 'e7hm5vx799',//体力获取视频
    skill_speedDown_Reward: 'e7hm5vx799',//技能减速视频
    // custom_complete_Reward: 'adunit-d33f4e373446cf17',//通关奖励视频
    // hotGame_1_Grid: 'adunit-10f1dcb8d907939b',//热门游戏格子
    // hotGame_2_Grid: 'adunit-2b5c194721fe66c1',//热门游戏格子
    // friend_1_Grid: 'adunit-9b59fafd36f85663',//好友推荐格子
    // friend_2_Grid: 'adunit-7e8d8bc74c52ea33',//好友推荐格子
    custom_complete_1_Custom: 'u7m3hc4gvm',//关卡胜利原生广告//m5i37sdu0u
    custom_complete_2_Custom: 'u7m3hc4gvm',//关卡胜利原生广告
    // main_right_up_Custom: 'adunit-1e07d1f610752d2b',//主界面原生广告
}

export default class HuaWeiSDK {
    private static rewardAD: any
    private static nativeADItemData: any
    /**
     * 用户登录
     * @param callback 回调
     */
    public static Login(callback: Function | undefined) {
        //hbs.gameLogin({
        //forceLogin: 0,
        //appid: '103469809',
        //success: (res) => {
        //GameData.SetCacheUserInfo(res.displayName, '')
        //LogIn.SetUserInfoToServer(res.displayName, '')
        //EventManager.EventPlay('SetPlayerData')
        //if (callback != null)
        //callback(JSON.stringify(res))
        //},
        //fail: (data, code) => {
        //console.error(data)
        //console.error('login fail code--->', code)
        //},
        //complete: (res) => {
        // console.log('login complete, ', res)
        //}
        //})
    }
    /**
     * 创建原生广告
     * @param id 原生广告ID
     * @param success 创建广告成功回调
     * @param fail 创建广告失败回调
     */
    public static CreateNativeAD(id: string, suss: Function, fail?: Function): any {
        //return hbs.createNativeAd({
        //adUnitId: id,
        //success: (res) => {
        //success(res)
        //},
        //fail: (data, code) => {
        //console.error('createNative fail code--->', code, data)
        //fail()
        //}
        //})
    }
    /**
     * 加载原生广告
     * @param nativeAD 原生广告
     */
    public static NativeADLoad(nativeAD: any) {
        //nativeAD.load()
        //let load = function (data) {
        //HuaWeiSDK.nativeADItemData = data.adList[0]
        //nativeAD.offLoad(load)
        //}
        //nativeAD.onLoad(load)
        //let loadFail = function (e) {
        //console.error('loadNative fail,', e)
        //for (let k in e) {
        //console.log(k, e[k])
        //}
        //nativeAD.offError(loadFail)
        //}
        //nativeAD.onError(loadFail)
    }
    public static DestroyAD(nativeAD: any) {
        //nativeAD.destroy()
    }
    /**
     * 创建视频广告
     * @param success 视频广告播放完毕回调
     * @param fail 视频播放失败回调
     * @param watchFail 视频未观看完整回调
     */
    public static CreateRewardAD(id: string, suss: Function, fail?: Function, watchFail?: Function) {
        //HuaWeiSDK.rewardAD = hbs.createRewardedVideoAd({
        //adUnitId: id,
        //success: (res) => {
        //console.log('load rewardAD success,', JSON.stringify(res))
        //HuaWeiSDK.rewardAD.load()

        //this.LoadRewardAD(success, fail, watchFail)
        //},
        //fail: (data, code) => {
        //console.error('createRewardAD fail code--->', code, data)
        //if (fail != null)
        //fail()
        //}
        //})
    }
    /**
     * 播放视频广告
     * @param success 视频广告播放完毕回调
     * @param fail 视频播放失败回调
     * @param watchFail 视频未观看完整回调
     */
    private static LoadRewardAD(suss: Function, fail: Function, watchFail: Function) {
        //let show = function () {
        //HuaWeiSDK.rewardAD.show()
        //HuaWeiSDK.rewardAD.offLoad(show)
        //}
        //HuaWeiSDK.rewardAD.onLoad(show)
        //HuaWeiSDK.rewardAD.load()
        //let close = function (isEnded) {
        //HuaWeiSDK.rewardAD.offClose(close)
        //if (isEnded) {
        //success()
        //} else {
        //if (watchFail != null)
        //watchFail()
        //}
        //}
        //HuaWeiSDK.rewardAD.onClose(close)
        //let loadFail = function (e) {
        //console.error('loadReward fail,', JSON.stringify(e))
        //if (fail != null)
        //fail()
        //HuaWeiSDK.rewardAD.offError(loadFail)
        //}
        //HuaWeiSDK.rewardAD.onError(loadFail)
    }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import EventManager from "./EventManager";
// import GameData from "./GameData";
// import LogIn from "./LogIn";
//
// const { ccclass } = cc._decorator;
//
// @ccclass
// export default class HuaWeiSDK {
//     private static rewardAD: any
//     private static nativeADItemData: any
//     /**
//      * 用户登录
//      * @param callback 回调
//      */
//     public static Login(callback: Function) {
//         hbs.gameLogin({
//             forceLogin: 0,
//             appid: '103469809',
//             success: (res) => {
//                 GameData.SetCacheUserInfo(res.displayName, '')
//                 LogIn.SetUserInfoToServer(res.displayName, '')
//                 EventManager.EventPlay('SetPlayerData')
//                 if (callback != null)
//                     callback(JSON.stringify(res))
//             },
//             fail: (data, code) => {
//                 console.error(data)
//                 console.error('login fail code--->', code)
//             },
//             complete: (res) => {
//                 // console.log('login complete, ', res)
//             }
//         })
//     }
//     /**
//      * 创建原生广告
//      * @param id 原生广告ID
//      * @param success 创建广告成功回调
//      * @param fail 创建广告失败回调
//      */
//     public static CreateNativeAD(id: string, success: Function, fail: Function): any {
//         return hbs.createNativeAd({
//             adUnitId: id,
//             success: (res) => {
//                 success(res)
//             },
//             fail: (data, code) => {
//                 console.error('createNative fail code--->', code, data)
//                 fail()
//             }
//         })
//     }
//     /**
//      * 加载原生广告
//      * @param nativeAD 原生广告
//      */
//     public static NativeADLoad(nativeAD: any) {
//         nativeAD.load()
//         let load = function (data) {
//             HuaWeiSDK.nativeADItemData = data.adList[0]
//             nativeAD.offLoad(load)
//         }
//         nativeAD.onLoad(load)
//         let loadFail = function (e) {
//             console.error('loadNative fail,', e)
//             for (let k in e) {
//                 console.log(k, e[k])
//             }
//             nativeAD.offError(loadFail)
//         }
//         nativeAD.onError(loadFail)
//     }
//     public static DestroyAD(nativeAD: any) {
//         nativeAD.destroy()
//     }
//     /**
//      * 创建视频广告
//      * @param success 视频广告播放完毕回调
//      * @param fail 视频播放失败回调
//      * @param watchFail 视频未观看完整回调
//      */
//     public static CreateRewardAD(id: string, success: Function, fail: Function, watchFail: Function) {
//         HuaWeiSDK.rewardAD = hbs.createRewardedVideoAd({
//             adUnitId: id,
//             success: (res) => {
//                 console.log('load rewardAD success,', JSON.stringify(res))
//                 HuaWeiSDK.rewardAD.load()
//
//                 this.LoadRewardAD(success, fail, watchFail)
//             },
//             fail: (data, code) => {
//                 console.error('createRewardAD fail code--->', code, data)
//                 if (fail != null)
//                     fail()
//             }
//         })
//     }
//     /**
//      * 播放视频广告
//      * @param success 视频广告播放完毕回调
//      * @param fail 视频播放失败回调
//      * @param watchFail 视频未观看完整回调
//      */
//     private static LoadRewardAD(success: Function, fail: Function, watchFail: Function) {
//         let show = function () {
//             HuaWeiSDK.rewardAD.show()
//             HuaWeiSDK.rewardAD.offLoad(show)
//         }
//         HuaWeiSDK.rewardAD.onLoad(show)
//         HuaWeiSDK.rewardAD.load()
//         let close = function (isEnded) {
//             HuaWeiSDK.rewardAD.offClose(close)
//             if (isEnded) {
//                 success()
//             } else {
//                 if (watchFail != null)
//                     watchFail()
//             }
//         }
//         HuaWeiSDK.rewardAD.onClose(close)
//         let loadFail = function (e) {
//             console.error('loadReward fail,', JSON.stringify(e))
//             if (fail != null)
//                 fail()
//             HuaWeiSDK.rewardAD.offError(loadFail)
//         }
//         HuaWeiSDK.rewardAD.onError(loadFail)
//     }
// }
// /**
//  * 微信广告ID
//  */
// export const HuaWeiADSID = {
//     // custom_newRecord_Banner: 'adunit-21c6a1c91b2fb1b6',//关卡新纪录banner
//     // custom_winner_Banner: 'adunit-7dc125c003d714f4',//关卡胜利banner
//     mission_Reward: 'e7hm5vx799',//任务视频//x4s1dqjbco
//     getGold_Reward: 'e7hm5vx799',//获得金币视频
//     tenPrecentage_Reward: 'e7hm5vx799',//十倍奖励视频
//     custom_ThreePrecentage_Reward: 'e7hm5vx799',//关卡结算三倍奖励视频
//     custom_newRecord_twoPrecentage_Reward: 'e7hm5vx799',//新纪录双倍奖励视频
//     reStart_Reward: 'e7hm5vx799',//重新开始视频
//     skill_support_Reward: 'e7hm5vx799',//技能援军视频
//     skill_defense_Reward: 'e7hm5vx799',//技能防守视频
//     skill_speedUp_Reward: 'e7hm5vx799',//技能加速视频
//     // turnTabel_Reward: 'adunit-ac5554dc8aa82f84',//转盘视频
//     checkIn_Reward: 'e7hm5vx799',//签到视频
//     getPower_Reward: 'e7hm5vx799',//体力获取视频
//     skill_speedDown_Reward: 'e7hm5vx799',//技能减速视频
//     // custom_complete_Reward: 'adunit-d33f4e373446cf17',//通关奖励视频
//     // hotGame_1_Grid: 'adunit-10f1dcb8d907939b',//热门游戏格子
//     // hotGame_2_Grid: 'adunit-2b5c194721fe66c1',//热门游戏格子
//     // friend_1_Grid: 'adunit-9b59fafd36f85663',//好友推荐格子
//     // friend_2_Grid: 'adunit-7e8d8bc74c52ea33',//好友推荐格子
//     custom_complete_1_Custom: 'u7m3hc4gvm',//关卡胜利原生广告//m5i37sdu0u
//     custom_complete_2_Custom: 'u7m3hc4gvm',//关卡胜利原生广告
//     // main_right_up_Custom: 'adunit-1e07d1f610752d2b',//主界面原生广告
// }
