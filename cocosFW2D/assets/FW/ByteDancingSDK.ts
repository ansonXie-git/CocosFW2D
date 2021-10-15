
import EventManager from "./EventManager";
import GameData from "./GameData";
import GameMgr from './GameMgr';
import LogIn from "./LogIn";
/**
 * 微信广告ID
 */
export const ByteDancingADSID = {

}
export const ByteReportID = {

}
export default class ByteDancingSDK {
    private static RecorderManager: any
    private static RecorderAdd: string
    private static RecorderStart = false
    private static TranscribeTime: number = 0
    public static get GetTranscribeTime() {
        return this.TranscribeTime
    }
    public static set SetTrancribeTime(time: number) {
        //this.TranscribeTime = time
    }
    public static JudgeRecorderAdd() {
        //if (this.RecorderAdd == '' || this.RecorderAdd == null) return false
        //return true
    }
    /**
     * 获取玩家信息
     */
    public static GetUserInfo() {
        //tt.getUserInfo({
        //withCredentials: false,
        //success: (res: any) => {
        //console.log('getUserInfo')
        //console.log(res)
        //let userInfo = res.userInfo
        //GameData.SetCacheUserInfo(userInfo.nickName, userInfo.avatarUrl)
        //LogIn.SetUserInfoToServer(userInfo.nickName, userInfo.avatarUrl)
        //EventManager.EventPlay('SetPlayerData')
        //},
        //fail: (res) => {
        //console.log('getUserInfo fail,', res)
        //}
        //})
    }
    /**
     * 获取玩家授权
     */
    public static GetSetting(callback: Function) {
        //tt.getSetting({
        //success: (authSetting) => {
        //console.log("getSetting success", authSetting)
        //callback(authSetting)
        //},
        //fail: (res) => {
        //console.error('getsetting fail,', res)
        //}
        //})
    }
    /**
     * 获取用户openId,uToken
     */
    public static UserLogin(callBack: Function | undefined) {
        //tt.login({
        //force: false,
        //success(res) {
        //if (res.code) {
        //console.log('实名登录', res)
        //callBack(res.code)
        //} else {
        //console.log('匿名登录', res)
        //callBack(null, res.anonymousCode)
        //}
        //}
        //})
    }
    /**
     * 发起网络请求
     */
    public static Request(method: string, url: string, data: any, callback: Function, fail?: Function) {
        //tt.request({
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
        //tt.onTouchEnd(() => {
        //tt.offTouchEnd(null)
        //tt.requestSubscribeSystemMessage({
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
        //tt.getSetting({
        //withSubscriptions: true,
        //success(res) {
        //console.log(res)
        //if (res.subscriptionsSetting.mainSwitch) {
        //let message = function () {
        //tt.requestSubscribeMessage({
        //tmplIds: id,
        //success(res) {
        //console.log(res)
        //GameData.SetSingleData('judgeSubMessage', 1)
        //tt.offTouchEnd(message)
        //},
        //fail(res) {
        //console.error(res)
        //}
        //})
        //}
        //tt.onTouchEnd(message)
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
        //tt.showShareMenu({
        //withShareTicket: true,
        //menus: ['shareAppMessage', 'shareTimeline']
        //})
    }
    /**
     * 主动拉起分享窗口
     * @param title 分享标题
     * @param url 图片地址
     * @param id 图片id
     */
    public static ShareApp() {
        //tt.shareAppMessage({
        // title: title,
        // imageUrl: url,
        //imageUrlId: '22ckjj4paanl280kl1',
        //success() {
        //let isShare = GameData.GetSingleData('isShare')
        //if (isShare == 1) {  // 分享
        //let shareCount = GameData.GetSingleData('numberOfShare') as number
        //if (isShare == 1) { // 激励视频拉取失败分享
        //GameData.SetSingleData('isShare', 0)
        //if (shareCount < 1) { //分享成功
        //GameData.SetSingleData('numberOfShare', shareCount + 1)
        //EventManager.EventPlay('share', true)
        //} else { // 分享失败
        //EventManager.EventPlay('share', false)
        //}
        //}
        //}
        //console.log('分享成功')
        //},
        //fail(res) {
        //EventManager.EventPlay('share', false)
        //console.log('分享失败', res)
        //}
        //})
    }
    /**
     * 分享视频
     */
    public static ShareTranscribe(suss: Function, fail: Function) {
        //tt.shareAppMessage({
        //channel: 'video',
        //extra: {
        //videoPath: this.RecorderAdd,
        //},
        //success: () => {
        //console.log('分享成功')
        //if (success != null) success()
        //},
        //fail: () => {
        //if (fail != null) fail()
        //console.log('分享失败')
        //}
        //})
    }
    /**
     * 获取录屏管理器
     */
    public static GetRecorderManager(): any {
        //ByteDancingSDK.RecorderManager = tt.getGameRecorderManager()
        //console.log(ByteDancingSDK.RecorderManager)
        //ByteDancingSDK.RecorderManager.onError((err) => {
        //console.error('录屏错误,', err)
        //ByteDancingSDK.RecorderManager.stop()
        //})
    }
    /**
     * 开始录制
     */
    public static StartRecorder() {
        //ByteDancingSDK.RecorderManager.onStart((res) => {
        //console.log('开始录制', res)
        //ByteDancingSDK.RecorderStart = true
        //})
        //ByteDancingSDK.RecorderManager.start({
        //duration: 60
        //})
    }
    /**
     * 暂停录制
     */
    public static PauseRecorder() {
        //ByteDancingSDK.RecorderManager.onPause((res) => {
        //console.log('暂停录制', res)
        //})
        //ByteDancingSDK.RecorderManager.pause()
    }
    /**
     * 继续录制
     */
    public static ResumeRecorder() {
        //ByteDancingSDK.RecorderManager.onResume((res) => {
        //console.log('继续录制', res)
        //})
        //ByteDancingSDK.RecorderManager.resume()
    }
    /**
     * 停止录制
     */
    public static StopRecorder(callback: Function) {
        //ByteDancingSDK.RecorderManager.onStop((res) => {
        //console.log('停止录制', res)
        //if (ByteDancingSDK.RecorderStart) {
        //this.RecorderAdd = res.videoPath
        //ByteDancingSDK.RecorderStart = false
        //if (callback != null)
        //callback()
        //}
        //})
        //ByteDancingSDK.RecorderManager.stop()
    }
    /**
     * 埋点
     * @param branchId 埋点场景ID
     */
    public static ReportUserBehavior(branchId: string, data: any) {
        //tt.reportAnalytics(branchId, data);
    }
    /**
     * 阿拉丁数据发送
     * @param eventName 事件名字
     * @param otherData 其他参数
     */
    public static ALDSendEvent(eventName: string, otherData?: Object) {
        //if (otherData == null)
        //tt.aldSendEvent(eventName);
        //else {
        //tt.aldSendEvent(eventName, otherData)
        //}
    }
    /**
     * 阿拉丁关卡数据--开始
     * @param stageId 关卡ID
     * @param stageName 关卡名称
     */
    public static ALDStart(stageId: string, stageName: string) {
        //tt.aldStage.onStart({
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
        //tt.aldStage.onRunning({
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
        //tt.aldStage.onEnd({
        //stageId: stageId,
        //stageName: stageName,
        //event: event,
        //params: params
        //})
    }
    public static OnShow(callback: Function) {
        //tt.onShow((res) => {
        //if (callback != null) callback(res)
        //})
    }
    public static OnHide(callback: Function) {
        //tt.onHide((res) => {
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
        //let videoAd = tt.createRewardedVideoAd({
        //adUnitId: id
        //})
        //let listener = function (res) {
        //console.log("rewardADS:", res)
        //if (res && res.isEnded || res === undefined) {
        //videoWatchFinish()
        //videoAd.offClose(listener)
        //} else {
        //console.error('GetPower ad is not finish')
        //if (videoWatchFail != null) videoWatchFail()
        //}
        //}
        //videoAd.onClose(listener)
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
        //let errorHandler = function (err) {
        //console.log('广告加载出错', err)
        //videoAd.offError(errorHandler)
        //if (videoShowFail != null) videoShowFail()
        //}
        //videoAd.onError(errorHandler)
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
        //let customAD = tt.createCustomAd({
        //adUnitId: adUnitID,
        //adIntervals: adIntervals,
        //style: {
        //left: left,
        //top: top,
        //fixed: fixed
        //}
        //})
        //customAD.onError((res) => {
        //console.error('custom', res.errMsg)
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
     * @param width banner缩放宽度（最小128,最大208）
     * @param realLeft 经缩放后真实x坐标
     * @param realTop 经缩放后真实y坐标
     * @param onError 广告创建失败回调
     */
    public static CreateBanner(adUnitId: string, onError?: Function): any {
        //let left = window.screen.width / 2 - 104
        //let banner = tt.createBannerAd({
        //adUnitId: adUnitId,
        //adIntervals: 30,
        //style: {
        //left: left,
        //top: window.screen.height - 117,
        //width: 208,
        //}
        //})
        //if (banner == null) {
        //console.log('banner is null')
        //return
        //}
        //let reSize = function (size) {
        //banner.style.left = window.screen.height - size.height + 50
        //banner.style.top = (window.screen.width - size.width) / 2 - 40
        //console.log(banner.style)
        //banner.offResize(reSize)
        //}
        //banner.onResize(reSize)
        //banner.onError((res) => {
        //console.error('banner', res.errMsg)
        //if (onError != null) onError(res)
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
        //banner.onLoad(function () {
        //banner
        //.show()
        //.then(() => {
        //console.log("广告显示成功");
        //})
        //.catch((err) => {
        //console.log("广告组件出现问题", err);
        //});
        //});
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
        //if (Interval == 0) {
        //return tt.createGridAd({
        //adUnitId: adUnitId,
        //adTheme: adTheme,
        //gridCount: gridCount,
        //style: style
        //})
        //} else {
        //return tt.createGridAd({
        //adUnitId: adUnitId,
        //adIntervals: Interval,
        //adTheme: adTheme,
        //gridCount: gridCount,
        //style: style
        //})
        //}

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
        //let openDataContext = tt.getOpenDataContext();
        //openDataContext.postMessage({
        //type: type,
        //data: data,
        //event: event,
        //timer: timer
        //})
    }
}
