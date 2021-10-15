

import { umaStageRunningparams } from "./CommonData";
import EventManager from "./EventManager";
import GameData from './GameData';
import LogIn from "./LogIn";
import PlatformManager from './PlatformManager';
/**
 * 微信广告ID
 */
export const WXADSID = {
    PropBanner: 'adunit-d6fa61844b3fe388',
    handbookBanner: 'adunit-6ad8f1f24a3972b6',
    skinBanner: 'adunit-317a228d5ded8d42',
    shoppingBanner: 'adunit-502ab62065028d2a',
    turnBanner: 'adunit-2d98efe800c40a34',
    reward: 'adunit-f8729cfb6f67f762',
    InterstitialAd: 'adunit-7c31ccf8dcb9d58f',
    always_custom: 'adunit-c79f56b17ec39ec1',
    // allScreen_custom: 'adunit-b0f45d7d47923288',
}

export default class WXSDK {
    private static UserInfoButton: any
    private static canHandleButton: boolean = true
    private static rewardADS: any
    private static interstitialAd: any = null
    /**
     * 获取玩家信息
     */
    public static GetUserInfo() {
        wx.getUserInfo({
            lang: 'zh_CN',
            success: (res: any) => {
                console.log('getUserInfo')
                console.log(res)
                WXSDK.canHandleButton = false
                let userInfo = res.userInfo
                GameData.SetCacheUserInfo(userInfo.nickName, userInfo.avatarUrl)
                LogIn.SetUserInfoToServer(userInfo.nickName, userInfo.avatarUrl)
                EventManager.EventPlay('SetPlayerData')
            },
            fail: (res) => {
                WXSDK.canHandleButton = true
                console.log(res)
                this.CreateButton()
            }
        })
    }
    /**
     * 创建获取用户信息按钮
     */
    public static CreateButton() {
        if (WXSDK.UserInfoButton != null) return
        WXSDK.UserInfoButton = wx.createUserInfoButton({
            type: 'image',
            text: '',
            style: {
                left: 6 / 750 * window.screen.width,
                top: 1.9 + (window.screen.height - 667 - 1) / 2,
                width: 120 / 750 * window.screen.width,
                height: 126 / 1334 * window.screen.height,
                fontSize: 14,
                color: '#9EE32D',
                textAlign: 'center',
                lineHeight: window.screen.height * 0.128,
                borderRadius: 4
            },
            withCredentials: false,
            lang: 'zh_CN'
        })
        WXSDK.UserInfoButton.show()
        WXSDK.UserInfoButton.onTap((res) => {
            if (res.userInfo == null) return
            WXSDK.UserInfoButton.hide()
            WXSDK.GetUserInfo()
        })
    }
    /**
     * 获取用户信息按钮显示
     */
    public static ButtonShow() {
        if (!WXSDK.canHandleButton) return
        if (WXSDK.UserInfoButton == null) return
        WXSDK.UserInfoButton.show()
    }
    /**
     * 获取用户信息按钮隐藏
     */
    public static ButtonHide() {
        if (!WXSDK.canHandleButton) return
        if (WXSDK.UserInfoButton == null) return
        WXSDK.UserInfoButton.hide()
    }
    /**
     * 获取用户openId,uToken
     */
    public static UserLogin(callBack: Function | undefined) {
        wx.login({
            success(res) {
                if (res.code) {
                    console.log('client login', res)
                    if (callBack != null)
                        callBack(res.code)
                } else {
                    console.log('登录失败！', res.errMsg)
                }
            }
        })
    }
    /**
     * 发起网络请求
     */
    public static Request(method: string, url: string, data: any, callback: Function, fail?: Function) {
        wx.request({
            method: method,
            url: 'https://www.yrhh.net/api/' + url,
            data: data,
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: (res) => {
                console.log(url, res)
                callback(res.data)
            },
            fail: (err) => {
                console.error(url, err)
                if (fail != null)
                    fail()
            }
        })
    }
    /**
     * 开启系统订阅
     */
    public static RequestSubSystemMessage() {
        wx.onTouchEnd(() => {
            wx.offTouchEnd(null)
            wx.requestSubscribeSystemMessage({
                msgTypeList: ['SYS_MSG_TYPE_INTERACTIVE', 'SYS_MSG_TYPE_RANK'],
                success(res) {
                    console.log(res)
                },
                fail(res) {
                    console.error(res)
                }
            })
        })
    }
    /**
     * 开启自定义订阅
     * @param id 自定义订阅id
     */
    public static RequestSubMessage(id: string[] | undefined) {
        if ((GameData.GetSingleData('judgeSubMessage') as number) == 1) return
        wx.getSetting({
            withSubscriptions: true,
            success(res) {
                console.log(res)
                if (res.subscriptionsSetting.mainSwitch) {
                    let message = function () {
                        wx.requestSubscribeMessage({
                            tmplIds: id,
                            success(res) {
                                console.log('订阅成功返回', res)
                                if (res.TEMPLATE_ID == 'accept')
                                    PlatformManager.ALDSendEvent('签到订阅成功')
                                GameData.SetSingleData('judgeSubMessage', 1)
                                wx.offTouchEnd(message)
                            },
                            fail(res) {
                                console.error(res)
                                wx.offTouchEnd(message)
                            }
                        })
                    }
                    wx.onTouchEnd(message)
                }
            },
            fail(res) {
                console.error(res)
            }
        })
    }
    /**
     * 开启分享功能
     */
    public static ShareAPPMenu() {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })
    }
    /**
     * 修改普通分享的标题与图片
     */
    public static onShareAppMessage() {
        wx.onShareAppMessage(() => {
            return {
                title: '抓娃娃也能探索宇宙，看看你能抓到什么',
                imageUrl: 'https://mmocgame.qpic.cn/wechatgame/tkibpDUz6vMRibWjVUB59GvLda7C6Vf78vUMgTdR9VpwhbYGBpcWnZvShX1BHD6fWM/0'  //图片 URL
            }
        })
        wx.updateShareMenu({
            withShareTicket: true,
            success: () => {
                console.log('withShareTicket success')
            },
            fail: () => {
                console.log('withShareTicket fail')
            }
        })
    }
    /**
     * 通用提示框
     */
    public static showModal(content: string) {
        wx.showModal({
            title: '提示',
            content: content,
            showCancel: false
        })
    }
    /**
     * 主动拉起分享窗口
     * @param title 分享标题
     * @param url 图片地址
     * @param id 图片id
     */
    public static ShareApp(title: string | undefined, url: string | undefined, id: string | undefined) {
        wx.shareAppMessage({
            title: title,
            imageUrl: url,
            imageUrlId: id
        })
    }
    /**
     * 获取分享信息
     * @param shareTicket 分享卡片信息
     * @param success 成功回调
     */
    public static GetShareInfo(shareTicket: string, success: Function) {
        wx.getShareInfo({
            shareTicket: shareTicket,
            success: (res) => {
                console.log('shareInfo', res)
                success(res)
            }
        })
    }
    /**
     * 微信埋点
     * @param branchId 埋点场景ID
     * @param eventType 埋点方式（1：场景曝光；2：事件点击）
     * @param branchDim 埋点额外数据：仅支持1~100正整数
     */
    public static ReportUserBehavior(branchId: string, eventType: number, branchDim = 101) {
        if (branchDim > 100) {
            wx.reportUserBehaviorBranchAnalytics({
                branchId: branchId,
                eventType: eventType,
            })
        } else {
            wx.reportUserBehaviorBranchAnalytics({
                branchId: branchId,
                branchDim: branchDim + '',
                eventType: eventType,
            })
        }
    }
    /**
     * 阿拉丁数据发送
     * @param eventName 事件名字
     * @param otherData 其他参数
     */
    public static ALDSendEvent(eventName: string, otherData?: Object) {
        if (otherData == null)
            wx.aldSendEvent(eventName);
        else {
            wx.aldSendEvent(eventName, otherData)
        }
    }
    /**
     * 阿拉丁关卡数据--开始
     * @param stageId 关卡ID
     * @param stageName 关卡名称
     */
    public static ALDStart(stageId: string, stageName: string) {
        wx.aldStage.onStart({
            stageId: stageId,
            stageName: stageName
        })
    }
    /**
     * 阿拉丁关卡数据--运行
     * @param stageId 关卡ID
     * @param stageName 关卡名称
     * @param event 关卡中用户操作
     * @param params 使用道具名称 该字段必传
     */
    public static ALDRunning(stageId: string, stageName: string, event: string, params: Object) {
        wx.aldStage.onRunning({
            stageId: stageId,
            stageName: stageName,
            event: event,
            params: params
        })
    }
    /**
     * 阿拉丁关卡数据--停止
     * @param stageId 关卡ID
     * @param stageName 关卡名称
     * @param event 用户操作
     * @param params 关卡描述
     */
    public static ALDEnd(stageId: string, stageName: string, event: string, params: Object) {
        wx.aldStage.onEnd({
            stageId: stageId,
            stageName: stageName,
            event: event,
            params: params
        })
    }
    public static OnShow(callback: Function) {
        wx.onShow((res) => {
            if (callback != null) callback(res)
        })
    }
    public static OnHide(callback: Function) {
        wx.onHide((res) => {
            if (callback != null) callback(res)
        })
    }
    /**
     * 激励视频预加载
     * @param id 视频广告ID
     * @param videoWatchFinish 视频广告观看完毕
     * @param videoShowFail 视频广告调取失败
     * @param videoWatchFail 视频广告未观看完毕
     */
    public static RewardVideoADS(id: string): any {
        if (this.rewardADS != null) return
        let videoAd = wx.createRewardedVideoAd({
            adUnitId: id
        })
        videoAd.load()
        let load = function () {
            console.log('视频预加载成功')
            videoAd.offLoad()
        }
        videoAd.onLoad(load)
        videoAd.onError(() => {
            console.log('视频加载失败', id)
        })
        this.rewardADS = videoAd
    }
    /**
     * 预加载激励视频播放
     * @param videoAd 视频广告ID
     * @param videoWatchFinish 视频广告观看完毕
     * @param videoShowFail 视频广告调取失败
     * @param videoWatchFail 视频广告未观看完毕
     */
    public static RewardShow(videoWatchFinish: Function, videoShowFail?: Function, videoWatchFail?: Function) {
        this.rewardADS.onClose((res) => {
            this.rewardADS.offClose()
            if (res && res.isEnded || res === undefined) {
                videoWatchFinish()
            } else {
                console.error('视频未观看完毕')
                if (videoWatchFail != null) videoWatchFail()
            }
        })
        this.rewardADS.show().catch(() => {
            // 失败重试
            this.rewardADS.load()
                .then(() => this.rewardADS.show())
                .catch(err => {
                    this.rewardADS.offClose()
                    console.log('激励视频 广告显示失败', err)
                    if (videoShowFail != null) videoShowFail()
                })
        })
    }
    /**
     * 激励视频播放
     * @param id 视频广告ID
     * @param videoWatchFinish 视频广告观看完毕
     * @param videoShowFail 视频广告调取失败
     * @param videoWatchFail 视频广告未观看完毕
     */
    public static RewardADSShow(id: string, videoWatchFinish: Function, videoShowFail?: Function, videoWatchFail?: Function) {
        let videoAd = wx.createRewardedVideoAd({
            adUnitId: id
        })
        videoAd.onClose((res) => {
            videoAd.offClose()
            if (res && res.isEnded || res === undefined) {
                videoWatchFinish()
                // ComonTools.PlayBGM(ABName.AudioSources, SourceName.BGM, true)
            } else {
                console.error('GetPower ad is not finish')
                if (videoWatchFail != null) videoWatchFail()
                // ComonTools.PlayBGM(ABName.AudioSources, SourceName.BGM, true)
            }
        })
        videoAd.show().catch(() => {
            // 失败重试
            videoAd.load()
                .then(() => videoAd.show())
                .catch(err => {
                    videoAd.offClose()
                    console.log('激励视频 广告显示失败', err)
                    // ComonTools.PlayBGM(ABName.AudioSources, SourceName.BGM, true)
                    if (videoShowFail != null) videoShowFail()
                })
        })
    }
    /**
     * 创建原生广告
     * @param adUnitID 原生广告ID
     * @param adIntervals 更新时长
     * @param left 相对屏幕左框距离
     * @param top 相对于屏幕顶部距离
     * @param fixed 
     */
    public static CreateCustomAD(adUnitID: string, adIntervals: number, left: number, top: number, success: Function, fail: Function): any {
        let customAD = wx.createCustomAd({
            adUnitId: adUnitID,
            adIntervals: adIntervals,
            style: {
                left: left,
                top: top,
            }
        })
        const succ = () => {
            success()
            customAD.offLoad(succ)
        }
        customAD.onLoad(succ)
        const Err_func = (res) => {
            console.error('custom', res)
            fail()
            customAD.offError(Err_func)
        }
        customAD.onError(Err_func)
        return customAD
    }
    /**
     * 隐藏原生广告
     * @param customAD 原生广告组件
     */
    public static CustomADHide(customAD: any) {
        customAD.hide()
    }
    /**
     * 展示原生广告
     * @param customAD 原生广告组件
     */
    public static CustomADShow(customAD: any) {
        customAD.show()
    }
    /**
     * 销毁原生广告
     * @param customAD 原生广告组件
     */
    public static CustomADDestroy(customAD: any) {
        customAD.destroy()
    }
    /**
     * 创建banner广告
     * @param adUnitId 广告ID
     * @param left 距离屏幕左框位置
     * @param top 距离屏幕顶部位置
     * @param width banner缩放宽度（最小300）
     * @param realLeft 经缩放后真实x坐标
     * @param realTop 经缩放后真实y坐标
     * @param onError 广告创建失败回调
     */
    public static CreateBanner(adUnitId: string, success: Function, onError?: Function): any {
        let banner = wx.createBannerAd({
            adUnitId: adUnitId,
            adIntervals: 30,
            style: {
                left: 0,
                top: window.screen.height - 300 / (window.screen.width / window.screen.height),
                width: window.screen.width,
            }
        })
        banner.onResize((res) => {
            banner.style.left = 0.1;
            banner.style.top = window.screen.height - banner.style.realHeight + 0.1;
        })
        const bannerOnLoad = () => {
            success()
            banner.offLoad(bannerOnLoad)
            banner.offError(bannerErr)
        }
        banner.onLoad(bannerOnLoad)
        let bannerErr = (res) => {
            console.error(adUnitId + '__banner', res.errMsg)
            if (onError != null) onError(res)
            banner.offLoad(bannerOnLoad)
            banner.offError(bannerErr)
        }
        banner.onError(bannerErr)
        return banner
    }
    /**
     * 隐藏banner广告
     * @param banner banner组件
     */
    public static BannerHide(banner: any) {
        banner.hide()
    }
    /**
     * 展示banner广告
     * @param banner banner组件
     */
    public static BannerShow(banner: any) {
        banner.show()
    }
    /**
     * 销毁banner广告
     * @param banner banner组件
     */
    public static BannerDestroy(banner: any) {
        banner.destroy()
    }
    /**
     * 创建格仔广告
     * @param adUnitId id
     * @param adTheme 主题
     * @param gridCount 个数
     * @param style 风格
     */
    public static CreateGridAd(adUnitId: string, Interval: number, adTheme: string, gridCount: number, style: any) {
        let grid: any = null
        if (Interval == 0) {
            grid = wx.createGridAd({
                adUnitId: adUnitId,
                adTheme: adTheme,
                gridCount: gridCount,
                style: style
            })
        } else {
            grid = wx.createGridAd({
                adUnitId: adUnitId,
                adIntervals: Interval,
                adTheme: adTheme,
                gridCount: gridCount,
                style: style
            })
        }
        if (grid == null) {
            console.error('grid create fail')
            return null
        }
        grid.onResize((res) => {
            grid.style.left = 0.1
            grid.style.top = window.screen.height - res.height + 0.1
        })
        grid.onError((res) => {
            console.error('grid err:', res.errMsg)
            grid = null
        })
        console.log('grid', grid)
        return grid
    }
    /**
     * 隐藏格子广告
     * @param grid 格子广告
     */
    public static GridAdHide(grid: any) {
        grid.hide()
    }
    /**
     * 展示格子广告
     * @param grid 格子广告
     */
    public static GridAdShow(grid: any) {
        grid.show()
    }
    /**
     * 销毁格子广告
     * @param grid 格子广告
     */
    public static GridAdDestroy(grid: any) {
        grid.destroy()
    }
    /**
     * 展示或写入子域数据
     * @param type 类型
     * @param data 数据
     * @param event 事件名字
     * @param timer 
     */
    public static OpenDataContext(type: string, data: any, event: string, timer: any) {
        let openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage({
            type: type,
            data: data,
            event: event,
            timer: timer
        })
        return openDataContext
    }
    /**
     * 获取右上角功能键位置
     * @returns {width:number,height:number,top:number,right:number,bottom:number,left:number}
     */
    public static GetMBBCRect(): any {
        return wx.getMenuButtonBoundingClientRect()
    }
    /**
     * 短振动
     * @param type 振动类型（heavy,medium,light）
     */
    public static VibrateShort(type: string) {
        wx.vibrateShort(type)
    }
    /**
     * 长振动
     */
    public static VibrateLong() {
        wx.vibrateLong()
    }
    /**
     * 创建插屏广告
     * @param id 广告ID
     */
    public static CreateInterstitialAd(id: string) {
        // 创建插屏广告实例，提前初始化
        this.interstitialAd = wx.createInterstitialAd({
            adUnitId: id
        })
        this.interstitialAd.load()
        this.interstitialAd.onLoad(() => {
            console.log('插屏加载成功')
        })
        this.interstitialAd.onError((err) => {
            console.log('插屏加载失败', err)
        })
    }
    /**
     * 插屏广告展示
     */
    public static InterstitialAdShow() {
        if (this.interstitialAd == null) return
        // 在适合的场景显示插屏广告
        this.interstitialAd.show().catch((err) => {
            console.log('插屏展示失败')
            console.error(err)
        })
        this.interstitialAd.onClose(() => {
            // this.CreateInterstitialAd()
        })
    }
    /**
     * 跳转其他小游戏
     */
    public static NavigateGame(appid: string, query: string, callback: Function, extraData?: any) {
        wx.navigateToMiniProgram({
            appId: appid,
            path: query,
            extraData: extraData,
            success(res) {
                callback()
                console.log('navigate success', res)
            },
            fail: (res) => {
                callback()
                console.error('navigate fail', res)
            }
        })
    }
    /**
     * 友盟自定义数据发送
     * @param eventID 事件名字
     * @param otherData 其他参数
     */
    public static UMASendEvent(eventID: string, otherData?: Object) {
        otherData == null ? wx.uma.trackEvent(eventID) : wx.uma.trackEvent(eventID, otherData)
    }
    /**
     * 友盟关卡数据--开始
     * @param stageId 关卡ID
     * @param stageName 关卡名称
     */
    public static UMAStart(stageId: string, stageName: string) {
        wx.uma.stage.onStart({
            stageId: stageId,
            stageName: stageName
        })
    }
    /**
     * 友盟关卡数据--运行
     * @param stageId 关卡ID
     * @param stageName 关卡名称
     * @param event 关卡中用户操作 (请按照以下两个字段上传，tools/ award 使用道具/关卡中获得奖励)
     * @param params 使用道具名称 该字段必传
     */
    public static UMARunning(stageId: string, stageName: string, event: string, params: umaStageRunningparams) {
        wx.uma.stage.onRunning({
            stageId: stageId,
            stageName: stageName,
            event: event,
            params: params
        })
    }
    /**
     * 友盟关卡数据--停止
     * @param stageId 关卡ID
     * @param stageName 关卡名称
     * @param event 关卡结束结果（请按照以下两个字段上传，complete/ fail （关卡完成/关卡失败））
     * @param time 关卡耗时（毫秒）
     */
    public static UMAEnd(stageId: string, stageName: string, event: string, time?: number) {
        wx.uma.stage.onEnd({
            stageId,
            stageName,
            event,
            _um_sdu: time,
        })
    }
    /**
     * 设置定向分享的接口query值
     * @param query 代表场景数字（0-50）
     */
    public static SetMessageToFriendQuery(query: number) {
        wx.setMessageToFriendQuery({
            shareMessageToFriendScene: query
        })
    }
    /**
     * 获取冷启动数据
     */
    public static getLaunchOptionsSync() {
        return wx.getLaunchOptionsSync()
    }
}