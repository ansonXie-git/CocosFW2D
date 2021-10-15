
import EventManager from "./EventManager";
import GameData from "./GameData";
import GameMgr from "./GameMgr";
import LogIn from "./LogIn";

/**
 * QQ广告ID
 */
export const qqADSID = {

}
export const qqReportID = {

}

export default class QQSDK {
    private static UserInfoButton: any
    private static canHandleButton: boolean = true
    /**
     * 获取玩家信息
     */
    public static GetUserInfo() {
        //qq.getUserInfo({
        //lang: 'zh_CN',
        //success: (res: any) => {
        //console.log('getUserInfo')
        //console.log(res)
        //QQSDK.canHandleButton = false
        //let userInfo = res.userInfo
        //GameData.SetCacheUserInfo(userInfo.nickName, userInfo.avatarUrl)
        //LogIn.SetUserInfoToServer(userInfo.nickName, userInfo.avatarUrl)
        //EventManager.EventPlay('SetPlayerData')
        //},
        //fail: (res) => {
        //QQSDK.canHandleButton = true
        //console.log(res)
        //this.CreateButton()
        //}
        //})
    }
    /**
     * 创建获取用户信息按钮
     */
    public static CreateButton() {
        //if (QQSDK.UserInfoButton != null) return
        //QQSDK.UserInfoButton = qq.createUserInfoButton({
        //type: 'text',
        //text: '',
        //style: {
        //left: window.screen.width * 0.0247 + (window.screen.width / window.screen.height > 2 ? window.screen.width * 0.0714 / 4 : 0),
        //top: window.screen.height * 0.0362,
        //width: window.screen.width * 0.0714,
        //height: window.screen.height * 0.128,
        //fontSize: window.screen.width / window.screen.height > 2 ? 14 : 10,
        //color: '#9EE32D',
        //textAlign: 'center',
        //lineHeight: window.screen.height * 0.128,
        //borderRadius: 4
        //},
        //withCredentials: false,
        //lang: 'zh_CN'
        //})
        //QQSDK.UserInfoButton.show()
        //QQSDK.UserInfoButton.onTap((res) => {
        //if (res.userInfo == null) return
        //QQSDK.UserInfoButton.hide()
        //QQSDK.GetUserInfo()
        //})
    }
    /**
     * 获取用户信息按钮显示
     */
    public static ButtonShow() {
        //if (!QQSDK.canHandleButton) return
        //if (QQSDK.UserInfoButton == null) return
        //QQSDK.UserInfoButton.show()
    }
    /**
     * 获取用户信息按钮隐藏
     */
    public static ButtonHide() {
        //if (!QQSDK.canHandleButton) return
        //if (QQSDK.UserInfoButton == null) return
        //QQSDK.UserInfoButton.hide()
    }
    /**
     * 获取用户openId,uToken
     */
    public static UserLogin(callBack: Function | undefined) {
        //qq.login({
        //success(res) {
        //if (res.code) {
        //console.log('client login', res)
        //callBack(res.code)
        //} else {
        //console.log('登录失败！', res.errMsg)
        //}
        //}
        //})
    }
    /**
     * 发起网络请求
     */
    public static Request(method: string, url: string, data: any, callback: Function, fail?: Function) {
        //qq.request({
        //method: method,
        //url: 'https://www.yrhh.net/api/' + url,
        //data: data,
        //header: { 'content-type': 'application/x-www-form-urlencoded' },
        //success: (res) => {
        //console.log(url, res)
        //callback(res.data)
        //},
        //fail: (err) => {
        //console.error(url, err)
        //if (fail != null)
        //fail()
        //}
        //})
    }
    /**
     * 开启系统订阅
     */
    public static RequestSubSystemMessage() {
        //qq.onTouchEnd(() => {
        //qq.offTouchEnd(null)
        //qq.requestSubscribeSystemMessage({
        //msgTypeList: ['SYS_MSG_TYPE_INTERACTIVE', 'SYS_MSG_TYPE_RANK'],
        //success(res) {
        //console.log(res)
        //},
        //fail(res) {
        //console.error(res)
        //}
        //})
        //})
    }
    /**
     * 开启自定义订阅
     * @param id 自定义订阅id
     */
    public static RequestSubMessage(id: string[] | undefined) {
        //if ((GameData.GetSingleData('judgeSubMessage') as number) == 1) return
        //qq.getSetting({
        //withSubscriptions: true,
        //success(res) {
        //console.log(res)
        //if (res.subscriptionsSetting.mainSwitch) {
        //let message = function () {
        //qq.requestSubscribeMessage({
        //tmplIds: id,
        //success(res) {
        //console.log(res)
        //GameData.SetSingleData('judgeSubMessage', 1)
        //qq.offTouchEnd(message)
        //},
        //fail(res) {
        //console.error(res)
        //}
        //})
        //}
        //qq.onTouchEnd(message)
        //}
        //},
        //fail(res) {
        //console.error(res)
        //}
        //})
    }
    /**
     * 开启分享功能
     */
    public static ShareAPPMenu() {
        //qq.showShareMenu({
        //withShareTicket: true,
        //menus: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
        //})
    }
    /**
     * 主动拉起分享窗口
     * @param title 分享标题
     * @param url 图片地址
     * @param id 图片id
     */
    public static ShareApp(title: string | undefined, url: string | undefined, id: string | undefined) {
        //qq.shareAppMessage({
        //title: title,
        //imageUrl: url,
        //})
    }
    /**
     * 微信埋点
     * @param branchId 埋点场景ID
     * @param eventType 埋点方式（1：场景曝光；2：事件点击）
     * @param branchDim 埋点额外数据：仅支持1~100正整数
     */
    public static ReportUserBehavior(branchId: string, eventType: number, branchDim = 101) {
        // if (branchDim > 100) {
        //     qq.reportUserBehaviorBranchAnalytics({
        //         branchId: branchId,
        //         eventType: eventType,
        //     })
        // } else {
        //     qq.reportUserBehaviorBranchAnalytics({
        //         branchId: branchId,
        //         branchDim: branchDim + '',
        //         eventType: eventType,
        //     })
        // }
    }
    /**
     * 阿拉丁数据发送
     * @param eventName 事件名字
     * @param otherData 其他参数
     */
    public static ALDSendEvent(eventName: string, otherData?: Object) {
        //if (otherData == null)
        //qq.aldSendEvent(eventName);
        //else {
        //qq.aldSendEvent(eventName, otherData)
        //}
    }
    /**
     * 阿拉丁关卡数据--开始
     * @param stageId 关卡ID
     * @param stageName 关卡名称
     */
    public static ALDStart(stageId: string, stageName: string) {
        //qq.aldStage.onStart({
        //stageId: stageId,
        //stageName: stageName
        //})
    }
    /**
     * 阿拉丁关卡数据--运行
     * @param stageId 关卡ID
     * @param stageName 关卡名称
     * @param event 关卡中用户操作
     * @param params 使用道具名称 该字段必传
     */
    public static ALDRunning(stageId: string, stageName: string, event: string, params: Object) {
        //qq.aldStage.onRunning({
        //stageId: stageId,
        //stageName: stageName,
        //event: event,
        //params: params
        //})
    }
    /**
     * 阿拉丁关卡数据--停止
     * @param stageId 关卡ID
     * @param stageName 关卡名称
     * @param event 用户操作
     * @param params 关卡描述
     */
    public static ALDEnd(stageId: string, stageName: string, event: string, params: Object) {
        //qq.aldStage.onEnd({
        //stageId: stageId,
        //stageName: stageName,
        //event: event,
        //params: params
        //})
    }
    public static OnShow(callback: Function) {
        //qq.onShow((res) => {
        //if (callback != null) callback(res)
        //})
    }
    public static OnHide(callback: Function) {
        //qq.onHide((res) => {
        //if (callback != null) callback(res)
        //})
    }
    /**
     * 激励视频播放
     * @param id 视频广告ID
     * @param videoWatchFinish 视频广告观看完毕
     * @param videoShowFail 视频广告调取失败
     * @param videoWatchFail 视频广告未观看完毕
     */
    public static RewardVideoADS(id: string, videoWatchFinish: Function, videoShowFail?: Function, videoWatchFail?: Function) {
        //let videoAd = qq.createRewardedVideoAd({
        //adUnitId: id
        //})
        //videoAd.onClose((res) => {
        //videoAd.offClose()
        //if (res && res.isEnded || res === undefined) {
        //videoWatchFinish()
        //} else {
        //console.error('GetPower ad is not finish')
        //if (videoWatchFail != null) videoWatchFail()
        //}
        //})
        //videoAd.show().catch(() => {
        // 失败重试
        //videoAd.load()
        //.then(() => videoAd.show())
        //.catch(err => {
        //videoAd.offClose()
        //console.log('激励视频 广告显示失败', err)
        //if (videoShowFail != null) videoShowFail()
        //})
        //})
    }
    /**
     * 创建原生广告
     * @param adUnitID 原生广告ID
     * @param adIntervals 更新时长
     * @param left 相对屏幕左框距离
     * @param top 相对于屏幕顶部距离
     * @param fixed 
     */
    public static CreateCustomAD(adUnitID: string, adIntervals: number, left: number, top: number, fixed = true): any {
        //let customAD = qq.createBlockAd({
        //adUnitId: adUnitID,
        //style: {
        //left: left,
        //top: top,
        //},
        //size: 1,
        //orientation: 'vertical'
        //})
        //customAD.onError((res) => {
        //console.error('banner', res.errMsg)
        //})
        //return customAD
    }
    /**
     * 隐藏原生广告
     * @param customAD 原生广告组件
     */
    public static CustomADHide(customAD: any) {
        //customAD.hide()
    }
    /**
     * 展示原生广告
     * @param customAD 原生广告组件
     */
    public static CustomADShow(customAD: any) {
        //customAD.show()
    }
    /**
     * 销毁原生广告
     * @param customAD 原生广告组件
     */
    public static CustomADDestroy(customAD: any) {
        //customAD.destroy()
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
    public static CreateBanner(adUnitId: string, onError?: Function): any {
        //let banner = qq.createBannerAd({
        //adUnitId: adUnitId,
        //style: {
        //left: window.screen.width / 4,
        //top: window.screen.height - 100,
        //width: window.screen.width / 2,
        //height: 100
        //}
        //})
        //if (banner == null) {
        //console.log('banner is null')
        //return
        //}
        //banner.onError((res) => {
        //console.error('banner', res.errMsg)
        //if (onError != null) onError()
        //})
        //return banner
    }
    /**
     * 隐藏banner广告
     * @param banner banner组件
     */
    public static BannerHide(banner: any) {
        //banner.hide()
    }
    /**
     * 展示banner广告
     * @param banner banner组件
     */
    public static BannerShow(banner: any) {
        //banner.show()
    }
    /**
     * 销毁banner广告
     * @param banner banner组件
     */
    public static BannerDestroy(banner: any) {
        //banner.destroy()
    }
    /**
     * 创建格仔广告
     * @param adUnitId id
     * @param adTheme 主题
     * @param gridCount 个数
     * @param style 风格
     */
    public static CreateGridAd(adUnitId: string, Interval: number, adTheme: string, gridCount: number, style: any) {
        // if (Interval == 0) {
        //     return qq.createGridAd({
        //         adUnitId: adUnitId,
        //         adTheme: adTheme,
        //         gridCount: gridCount,
        //         style: style
        //     })
        // } else {
        //     return qq.createGridAd({
        //         adUnitId: adUnitId,
        //         adIntervals: Interval,
        //         adTheme: adTheme,
        //         gridCount: gridCount,
        //         style: style
        //     })
        // }

    }
    /**
     * 隐藏格子广告
     * @param grid 格子广告
     */
    public static GridAdHide(grid: any) {
        //grid.hide()
    }
    /**
     * 展示格子广告
     * @param grid 格子广告
     */
    public static GridAdShow(grid: any) {
        //grid.show()
    }
    /**
     * 销毁格子广告
     * @param grid 格子广告
     */
    public static GridAdDestroy(grid: any) {
        //grid.destroy()
    }
    /**
     * 展示或写入子域数据
     * @param type 类型
     * @param data 数据
     * @param event 事件名字
     * @param timer 
     */
    public static OpenDataContext(type: string, data: any, event: string, timer: any) {
        //let openDataContext = qq.getOpenDataContext();
        //openDataContext.postMessage({
        //type: type,
        //data: data,
        //event: event,
        //timer: timer
        //})
    }
    /**
     * 获取右上角功能键位置
     * @returns {width:number,height:number,top:number,right:number,bottom:number,left:number}
     */
    public static GetMBBCRect(): any {
        //return qq.getMenuButtonBoundingClientRect()
    }
}
