

import EventManager from "./EventManager";
import GameData from "./GameData";
import GameMgr from "./GameMgr";
import LogIn from "./LogIn";
/**
 * 微信广告ID
 */
export const OPPOADSID = {
    custom_newRecord_Banner: '269666',//关卡新纪录banner   
    custom_winner_Banner: '269652',//关卡胜利banner
    mission_Reward: '269575',//任务视频//x4s1dqjbco
    getGold_Reward: '269575',//获得金币视频
    tenPrecentage_Reward: '269538',//十倍奖励视频
    custom_ThreePrecentage_Reward: '269529',//关卡结算三倍奖励视频
    custom_newRecord_twoPrecentage_Reward: '269527',//新纪录双倍奖励视频
    reStart_Reward: '269578',//重新开始视频
    skill_support_Reward: '269574',//技能援军视频
    skill_defense_Reward: '269572',//技能防守视频
    skill_speedUp_Reward: '269563',//技能加速视频
    // turnTabel_Reward: 'adunit-ac5554dc8aa82f84',//转盘视频
    checkIn_Reward: '269540',//签到视频
    getPower_Reward: '269540',//体力获取视频
    skill_speedDown_Reward: '269564',//技能减速视频
    // custom_complete_Reward: 'adunit-d33f4e373446cf17',//通关奖励视频
    hotGame_1_Grid: '269654',//热门游戏格子   
    // hotGame_2_Grid: 'adunit-2b5c194721fe66c1',//热门游戏格子
    // friend_1_Grid: 'adunit-9b59fafd36f85663',//好友推荐格子
    // friend_2_Grid: 'adunit-7e8d8bc74c52ea33',//好友推荐格子
    // custom_complete_1_Custom: '269523',//关卡胜利原生广告//m5i37sdu0u
    // custom_complete_2_Custom: '269523',//关卡胜利原生广告
    // main_right_up_Custom: 'adunit-1e07d1f610752d2b',//主界面原生广告
}

export default class OPPOSDK {
    private static rewardAD: any
    private static nativeADItemData: any
    private static nativeLoadTimes = 0
    private static rewardLoadTimes = 0
    /**
     * 玩家登录
     * @param callback 回调
     */
    public static gameLogin(callback: Function | undefined) {
        //console.log('start login')
        //qg.login({
        //success: (res) => {
        //console.log('login success ,', JSON.stringify(res))
        //GameData.SetCacheUserInfo(res.nickName, res.avatar)
        //LogIn.SetUserInfoToServer(res.nickName, res.avatar)
        //EventManager.EventPlay('SetPlayerData')
        //if (callback != null)
        //callback(res.data.token)
        //},
        //fail: (res) => {
        //console.error('login fail ,', JSON.stringify(res))
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
    public static CreateNativeAD(id: string): any {
        //console.log('createNative,', id)
        //return qg.createNativeAd({
        //adUnitId: id,
        //})
    }
    /**
     * 加载原生广告
     * @param nativeAD 原生广告
     */
    public static NativeADLoad(nativeAD: any) {
        //nativeAD.load()
        //let load = function (data) {
        //console.log('原生广告加载', data.adList)
        //OPPOSDK.nativeADItemData = data.adList
        //OPPOSDK.nativeLoadTimes = 0
        //nativeAD.offLoad(load)
        //}
        //nativeAD.onLoad(load)
        //let loadFail = function (e) {
        //console.error('loadNative fail,', JSON.stringify(e))
        //nativeAD.offError(loadFail)
        //OPPOSDK.nativeLoadTimes += 1
        //if (OPPOSDK.nativeLoadTimes < 2)
        //OPPOSDK.NativeADLoad(nativeAD)
        //else
        //OPPOSDK.nativeLoadTimes = 0
        //}
        //nativeAD.onError(loadFail)
    }
    /**
     * 删除原生广告
     * @param nativeAD 原生广告组件
     */
    public static DestroyNativeAD(nativeAD: any) {
        //nativeAD.destroy()
    }
    /**
     * 创建视频广告
     * @param success 视频广告播放完毕回调
     * @param fail 视频播放失败回调
     * @param watchFail 视频未观看完整回调
     */
    public static CreateRewardAD(id: string, suss: Function, fail?: Function, watchFail?: Function) {
        //OPPOSDK.rewardAD = qg.createRewardedVideoAd({
        //adUnitId: id,
        //})
        //this.LoadRewardAD(success, fail, watchFail)
    }
    /**
     * 播放视频广告
     * @param success 视频广告播放完毕回调
     * @param fail 视频播放失败回调
     * @param watchFail 视频未观看完整回调
     */
    private static LoadRewardAD(suss: Function, fail: Function, watchFail: Function) {
        //let show = function () {
        //OPPOSDK.rewardLoadTimes = 0
        //OPPOSDK.rewardAD.show()
        //OPPOSDK.rewardAD.offLoad(show)
        //}
        //OPPOSDK.rewardAD.onLoad(show)
        //OPPOSDK.rewardAD.load()
        //let close = function (res) {
        //OPPOSDK.rewardAD.offClose(close)
        //if (res.isEnded) {
        //success()
        //} else {
        //if (watchFail != null)
        //watchFail()
        //}
        //}
        //OPPOSDK.rewardAD.onClose(close)
        //let loadFail = function (e) {
        //console.error('loadReward fail,', JSON.stringify(e))
        //OPPOSDK.rewardAD.offError(loadFail)
        //OPPOSDK.rewardLoadTimes += 1
        //if (OPPOSDK.rewardLoadTimes < 2)
        //OPPOSDK.LoadRewardAD(success, fail, watchFail)
        //else {
        //OPPOSDK.rewardLoadTimes = 0
        //if (fail != null)
        //fail()
        //}
        //}
        //OPPOSDK.rewardAD.onError(loadFail)
    }
    /**
     * 创建banner广告
     * @param adUnitId 广告id
     * @param onError 加载失败回调
     */
    public static CreateBannerAd(adUnitId: string, onError?: Function) {
        //let banner = qg.createBannerAd({
        //adUnitId: adUnitId,
        //style: {
        //left: window.screen.width / 2 - 320,
        //top: window.screen.height - 150,
        //width: 900,
        //height: 300
        //}
        //})
        // banner.onResize(function (obj) {
        //     banner.style.top = window.screen.height - obj.height - 100
        //     banner.style.left = (window.screen.width - obj.width) / 2
        // })
        //banner.onError((res) => {
        //console.error(JSON.stringify(res))
        //if (onError != null)
        //onError()
        //})
        //return banner
    }
    /**
     * 展示banner
     * @param bannerAD 广告ID
     */
    public static ShowBannerAd(bannerAD: any) {
        //bannerAD.show()
    }
    /**
     * 隐藏banner
     * @param bannerAD 广告ID
     */
    public static BannerHide(bannerAD: any) {
        //bannerAD.hide()
    }
    /**
     * 销毁banner
     * @param bannerAD 广告ID
     */
    public static BannerDestroy(bannerAD: any) {
        //bannerAD.destroy()
    }
    /**
     * 创建互推盒子广告
     * @param adUnitId 广告ID
     */
    public static CreateGameProtalAD(adUnitId: string) {
        //if (qg.getSystemInfoSync().platformVersionCode >= 1076) {
        //let gamePortalAd = qg.createGamePortalAd({
        //adUnitId: adUnitId
        //})
        //gamePortalAd.load()
        //gamePortalAd.onLoad(() => {
        //console.log('广告盒子加载成功')
        //gamePortalAd.show()
        //gamePortalAd.offLoad(null)
        //})
        //gamePortalAd.onError((err) => {
        //console.error(err)
        //gamePortalAd.offError(null)
        //})
        //gamePortalAd.onClose(() => {
        //gamePortalAd.offClose(null)
        //gamePortalAd.destroy()
        //})
        //} else {
        //console.log('快应用平台版本号低于1076，暂不支持互推盒子相关 API')
        //}
    }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import EventManager from "./EventManager";
// import GameData from "./GameData";
// import GameMgr from "./GameMgr";
// import LogIn from "./LogIn";
// 
// const { ccclass } = cc._decorator;
// 
// @ccclass
// export default class OPPOSDK {
//     private static rewardAD: any
//     private static nativeADItemData: any
//     private static nativeLoadTimes = 0
//     private static rewardLoadTimes = 0
//     /**
//      * 玩家登录
//      * @param callback 回调
//      */
//     public static gameLogin(callback: Function) {
//         console.log('start login')
//         qg.login({
//             success: (res) => {
//                 console.log('login success ,', JSON.stringify(res))
//                 GameData.SetCacheUserInfo(res.nickName, res.avatar)
//                 LogIn.SetUserInfoToServer(res.nickName, res.avatar)
//                 EventManager.EventPlay('SetPlayerData')
//                 if (callback != null)
//                     callback(res.data.token)
//             },
//             fail: (res) => {
//                 console.error('login fail ,', JSON.stringify(res))
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
//     public static CreateNativeAD(id: string): any {
//         console.log('createNative,', id)
//         return qg.createNativeAd({
//             adUnitId: id,
//         })
//     }
//     /**
//      * 加载原生广告
//      * @param nativeAD 原生广告
//      */
//     public static NativeADLoad(nativeAD: any) {
//         nativeAD.load()
//         let load = function (data) {
//             console.log('原生广告加载', data.adList)
//             OPPOSDK.nativeADItemData = data.adList
//             OPPOSDK.nativeLoadTimes = 0
//             nativeAD.offLoad(load)
//         }
//         nativeAD.onLoad(load)
//         let loadFail = function (e) {
//             console.error('loadNative fail,', JSON.stringify(e))
//             nativeAD.offError(loadFail)
//             OPPOSDK.nativeLoadTimes += 1
//             if (OPPOSDK.nativeLoadTimes < 2)
//                 OPPOSDK.NativeADLoad(nativeAD)
//             else
//                 OPPOSDK.nativeLoadTimes = 0
//         }
//         nativeAD.onError(loadFail)
//     }
//     /**
//      * 删除原生广告
//      * @param nativeAD 原生广告组件
//      */
//     public static DestroyNativeAD(nativeAD: any) {
//         nativeAD.destroy()
//     }
//     /**
//      * 创建视频广告
//      * @param success 视频广告播放完毕回调
//      * @param fail 视频播放失败回调
//      * @param watchFail 视频未观看完整回调
//      */
//     public static CreateRewardAD(id: string, success: Function, fail: Function, watchFail: Function) {
//         OPPOSDK.rewardAD = qg.createRewardedVideoAd({
//             adUnitId: id,
//         })
//         this.LoadRewardAD(success, fail, watchFail)
//     }
//     /**
//      * 播放视频广告
//      * @param success 视频广告播放完毕回调
//      * @param fail 视频播放失败回调
//      * @param watchFail 视频未观看完整回调
//      */
//     private static LoadRewardAD(success: Function, fail: Function, watchFail: Function) {
//         let show = function () {
//             OPPOSDK.rewardLoadTimes = 0
//             OPPOSDK.rewardAD.show()
//             OPPOSDK.rewardAD.offLoad(show)
//         }
//         OPPOSDK.rewardAD.onLoad(show)
//         OPPOSDK.rewardAD.load()
//         let close = function (res) {
//             OPPOSDK.rewardAD.offClose(close)
//             if (res.isEnded) {
//                 success()
//             } else {
//                 if (watchFail != null)
//                     watchFail()
//             }
//         }
//         OPPOSDK.rewardAD.onClose(close)
//         let loadFail = function (e) {
//             console.error('loadReward fail,', JSON.stringify(e))
//             OPPOSDK.rewardAD.offError(loadFail)
//             OPPOSDK.rewardLoadTimes += 1
//             if (OPPOSDK.rewardLoadTimes < 2)
//                 OPPOSDK.LoadRewardAD(success, fail, watchFail)
//             else {
//                 OPPOSDK.rewardLoadTimes = 0
//                 if (fail != null)
//                     fail()
//             }
//         }
//         OPPOSDK.rewardAD.onError(loadFail)
//     }
//     /**
//      * 创建banner广告
//      * @param adUnitId 广告id
//      * @param onError 加载失败回调
//      */
//     public static CreateBannerAd(adUnitId: string, onError?: Function) {
//         let banner = qg.createBannerAd({
//             adUnitId: adUnitId,
//             style: {
//                 left: window.screen.width / 2 - 320,
//                 top: window.screen.height - 150,
//                 width: 900,
//                 height: 300
//             }
//         })
//         // banner.onResize(function (obj) {
//         //     banner.style.top = window.screen.height - obj.height - 100
//         //     banner.style.left = (window.screen.width - obj.width) / 2
//         // })
//         banner.onError((res) => {
//             console.error(JSON.stringify(res))
//             if (onError != null)
//                 onError()
//         })
//         return banner
//     }
//     /**
//      * 展示banner
//      * @param bannerAD 广告ID
//      */
//     public static ShowBannerAd(bannerAD: any) {
//         bannerAD.show()
//     }
// 
//     /**
//      * 隐藏banner
//      * @param bannerAD 广告ID
//      */
//     public static BannerHide(bannerAD: any) {
//         bannerAD.hide()
//     }
// 
//     /**
//      * 销毁banner
//      * @param bannerAD 广告ID
//      */
//     public static BannerDestroy(bannerAD: any) {
//         bannerAD.destroy()
//     }
//     /**
//      * 创建互推盒子广告
//      * @param adUnitId 广告ID
//      */
//     public static CreateGameProtalAD(adUnitId: string) {
//         if (qg.getSystemInfoSync().platformVersionCode >= 1076) {
//             let gamePortalAd = qg.createGamePortalAd({
//                 adUnitId: adUnitId
//             })
//             gamePortalAd.load()
//             gamePortalAd.onLoad(() => {
//                 console.log('广告盒子加载成功')
//                 gamePortalAd.show()
//                 gamePortalAd.offLoad(null)
//             })
//             gamePortalAd.onError((err) => {
//                 console.error(err)
//                 gamePortalAd.offError(null)
//             })
//             gamePortalAd.onClose(() => {
//                 gamePortalAd.offClose(null)
//                 gamePortalAd.destroy()
//             })
//         } else {
//             console.log('快应用平台版本号低于1076，暂不支持互推盒子相关 API')
//         }
//     }
// }
// /**
//  * 微信广告ID
//  */
// export const OPPOADSID = {
//     custom_newRecord_Banner: '269666',//关卡新纪录banner
//     custom_winner_Banner: '269652',//关卡胜利banner
//     mission_Reward: '269575',//任务视频//x4s1dqjbco
//     getGold_Reward: '269575',//获得金币视频
//     tenPrecentage_Reward: '269538',//十倍奖励视频
//     custom_ThreePrecentage_Reward: '269529',//关卡结算三倍奖励视频
//     custom_newRecord_twoPrecentage_Reward: '269527',//新纪录双倍奖励视频
//     reStart_Reward: '269578',//重新开始视频
//     skill_support_Reward: '269574',//技能援军视频
//     skill_defense_Reward: '269572',//技能防守视频
//     skill_speedUp_Reward: '269563',//技能加速视频
//     // turnTabel_Reward: 'adunit-ac5554dc8aa82f84',//转盘视频
//     checkIn_Reward: '269540',//签到视频
//     getPower_Reward: '269540',//体力获取视频
//     skill_speedDown_Reward: '269564',//技能减速视频
//     // custom_complete_Reward: 'adunit-d33f4e373446cf17',//通关奖励视频
//     hotGame_1_Grid: '269654',//热门游戏格子   
//     // hotGame_2_Grid: 'adunit-2b5c194721fe66c1',//热门游戏格子
//     // friend_1_Grid: 'adunit-9b59fafd36f85663',//好友推荐格子
//     // friend_2_Grid: 'adunit-7e8d8bc74c52ea33',//好友推荐格子
//     // custom_complete_1_Custom: '269523',//关卡胜利原生广告//m5i37sdu0u
//     // custom_complete_2_Custom: '269523',//关卡胜利原生广告
//     // main_right_up_Custom: 'adunit-1e07d1f610752d2b',//主界面原生广告
// }
