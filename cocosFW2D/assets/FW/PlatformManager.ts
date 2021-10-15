
import { ByteDancingADSID, ByteReportID } from './ByteDancingSDK';
import WXSDK, { WXADSID } from './WXSDK';
import ByteDancingSDK from './ByteDancingSDK';
import HttpManager from './HttpManager';
import GameData from './GameData';
import EventManager from './EventManager';
import QQSDK from './QQSDK';
import { qqADSID } from './QQSDK';
import HuaWeiSDK, { HuaWeiADSID } from './HuaWeiSDK';
import OPPOSDK from './OPPOSDK';
import { OPPOADSID } from './OPPOSDK';
import GameMgr from './GameMgr';
import { umaStageRunningparams } from './CommonData';
import { sys } from 'cc';
/*
    判断游戏平台，根据不同平台读取不同平台API
 */
export default class PlatformManager {
    public static wx_qq = 0
    public static RewardFail_Share(callback: Function) {
        if (sys.platform == sys.Platform.HUAWEI_QUICK_GAME) return
        PlatformManager.ShareApp('抓娃娃也能探索宇宙，看看你能抓到什么',
            'https://mmocgame.qpic.cn/wechatgame/tkibpDUz6vMRibWjVUB59GvLda7C6Vf78vUMgTdR9VpwhbYGBpcWnZvShX1BHD6fWM/0',
            'efsrqrTbSomXLxxDOJB5Ug==')
        GameData.SetSingleData('isShare', 1)
        EventManager.EventPush({
            eventName: 'share',
            eventFunc: (share: boolean) => {
                callback(share)
            },
            isOnce: true
        })
    }
    /**
     * 获取appid
     */
    public static GetAppID() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                return 'wx2f2784eafbaf7398'
            else
                return '1111291530'
        }
        else if (sys.platform == sys.Platform.BYTEDANCE_MINI_GAME)
            return 'ttf14c87f16e77146c'
        else if (sys.platform == sys.Platform.HUAWEI_QUICK_GAME)
            return '103469809'
        else if (sys.platform == sys.Platform.OPPO_MINI_GAME)
            return '30433581'
    }
    /**
     * 获取远程资源下载地址
     * @param isTest 是否测试
     */
    public static GetRemoteAddress(isTest: boolean) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (isTest) {
                return 'https://yrhh-1253933507.file.myqcloud.com/EliminateWitchTest/wechat/remote/'
            } else {
                return 'https://yrhh-1253933507.file.myqcloud.com/EliminateWitch/wechat/remote/'
            }
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            if (isTest) {
                return 'https://yrhh-1253933507.file.myqcloud.com/EliminateWitchTest/bytedancing/remote/'
            } else {
                return 'https://yrhh-1253933507.file.myqcloud.com/EliminateWitch/bytedancing/remote/'
            }
        } else {
            if (isTest) {
                return 'https://yrhh-1253933507.file.myqcloud.com/EliminateWitchTest/other/remote/'
            } else {
                return 'https://yrhh-1253933507.file.myqcloud.com/EliminateWitch/other/remote/'
            }
        }
    }
    /**
     * 短振动
     * @param type 振动类型（heavy,medium,light）
     */
    public static VibrateShort(type: string) {
        const judgeVibrate = GameData.GetSingleData('judgeVibrate') as number
        if (judgeVibrate == 0) return
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.VibrateShort(type)
        }
    }
    /**
     * 长振动
     */
    public static VibrateLong() {
        const judgeVibrate = GameData.GetSingleData('judgeVibrate') as number
        if (judgeVibrate == 0) return
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.VibrateLong()
        }
    }
    /**
     * 平台登录接口
     *  @param params 
     */
    public static LogIn(callback?: Function) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.UserLogin(callback)
            else
                QQSDK.UserLogin(callback)
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.UserLogin(callback)
        } else if (sys.platform == sys.Platform.HUAWEI_QUICK_GAME) {
            HuaWeiSDK.Login(callback)
        } else if (sys.platform == sys.Platform.OPPO_MINI_GAME) {
            OPPOSDK.gameLogin(callback)
        }
    }
    /**
     * 平台获取玩家信息接口
     *  @param params 
     */
    public static GetUserInfo() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.GetUserInfo()
            else
                QQSDK.GetUserInfo()
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.GetSetting((res) => {
                if (res.authSetting['scope.userInfo'] == true)
                    ByteDancingSDK.GetUserInfo()
            })
        }
    }
    /**
     * 其他平台获取玩家信息
     */
    public static OtherPlatformGetUserInfo() {
        if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.GetSetting((res) => {
                if (res.authSetting['scope.userInfo'] == null)
                    ByteDancingSDK.GetUserInfo()
            })
        }
    }
    /**
     * 获取用户信息按钮隐藏
     */
    public static GetUserButtonHide() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.ButtonHide()
            else
                QQSDK.ButtonHide()
        }
    }
    /**
     * 获取用户信息按钮展示
     */
    public static GetUserButtonShow() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.ButtonShow()
            else
                QQSDK.ButtonShow()
        }
    }
    /**
     * 平台开启游戏转发接口
     *  @param params 
     */
    public static ShareAppMenu() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.ShareAPPMenu()
            else
                QQSDK.ShareAPPMenu()
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.ShareAPPMenu()
        }
    }
    /**
     * 更改普通分享图片和文案
     */
    public static onShareAppMessage() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.onShareAppMessage()
        }
    }
    /**
     * 主动拉起分享界面
     * @param params 
     */
    public static ShareApp(title?: string, url?: string, id?: string) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.ShareApp(title, url, id)
            else
                QQSDK.ShareApp(title, url, id)
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.ShareApp()
        }
    }
    /**
     * 获取分享详细
     * @param shareTicket 群分享名片
     * @param success 成功回调
     */
    public static GetShareInfo(shareTicket: string, success: Function) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.GetShareInfo(shareTicket, success)
        }
    }
    /**
     * 分享视频
     */
    public static ShareTranscribe(success: Function, fail: Function) {
        if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.ShareTranscribe(success, fail)
        }
    }
    /**
     * 获取录屏控制器
     */
    public static GetRecorderManager() {
        if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.GetRecorderManager()
        }
    }
    /**
     * 开始录屏
     */
    public static RecorderStart() {
        if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.StartRecorder()
        }
    }
    /**
     * 暂停录屏
     */
    public static RecorderPause() {
        if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.PauseRecorder()
        }
    }
    /**
     * 继续录屏
     */
    public static RecorderResume() {
        if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.ResumeRecorder()
        }
    }
    /**
     * 停止录屏
     */
    public static RecorderStop(callback: Function) {
        if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.StopRecorder(callback)
        }
    }
    /**
     * 后端通信
     * @param params 
     */
    public static Request(method: string, url: string, data: any, callback: Function, fail?: Function) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.Request(method, url, data, callback, fail)
            else
                QQSDK.Request(method, url, data, callback, fail)
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.Request(method, url, data, callback, fail)
        } else {
            switch (method) {
                case 'GET':
                    console.log('AJAX,', method)
                    HttpManager.httpGet(url, data, callback)
                    break;
                case 'POST':
                    console.log('AJAX,', method)
                    HttpManager.httpPost(url, data, callback)
                    break
            }
        }
    }
    /**
     * 开启系统订阅
     * @param params 
     */
    public static SubMessage() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.RequestSubSystemMessage()
            else
                QQSDK.RequestSubSystemMessage()
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.RequestSubSystemMessage()
        }
    }
    /**
     * 开启自定义订阅
     * @param params 
     */
    public static SubSingleMessage(id?: string[]) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.RequestSubMessage(id)
            else
                QQSDK.RequestSubMessage(id)
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.RequestSubMessage(id)
        }
    }
    /**
     * 平台埋点
     * @param params 
     */
    public static ReportUserBehavior(branchId: string, data: any, eventType: number, branchDim?: number) {
        if (branchId == null || branchId == '') return
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.ReportUserBehavior(branchId, eventType, branchDim)
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.ReportUserBehavior(branchId, data)
        }
    }
    /**
     * 获取埋点ID
     * @param name 埋点ID名字
     */
    public static GetReportID(name: string) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            // return WXReportID[name]
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            return ByteReportID[name]
        }
    }
    /**
     * 阿拉丁埋点
     * @param params 
     */
    public static ALDSendEvent(eventName: string, otherData?: any) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.ALDSendEvent(eventName, otherData)
            else
                QQSDK.ALDSendEvent(eventName, otherData)
        }
    }
    /**
     * 阿拉丁数据开始
     * @param params 
     */
    public static ALDStart(stageId: string, stageName: string) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.ALDStart(stageId, stageName)
            else
                QQSDK.ALDStart(stageId, stageName)
        }
    }
    /**
     * 阿拉丁数据运行
     * @param params 
     */
    public static ALDRunning(stageId, stageName, event: string, params: Object) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.ALDRunning(stageId, stageName, event, params)
            else
                QQSDK.ALDRunning(stageId, stageName, event, params)
        }
    }
    /**
     * 阿拉丁数据结束
     * @param params 
     */
    public static ALDEnd(stageId: string, stageName: string, event: string, params: Object) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.ALDEnd(stageId, stageName, event, params)
            else
                QQSDK.ALDEnd(stageId, stageName, event, params)
        }
    }
    /**
     * 游戏打开
     * @param params 
     */
    public static OnShow(callback: Function) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.OnShow(callback)
            else
                QQSDK.OnShow(callback)
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.OnShow(callback)
        }
    }
    /**
     * 游戏隐藏
     * @param params 
     */
    public static OnHide(callback: Function) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.OnHide(callback)
            else
                QQSDK.OnHide(callback)
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.OnHide(callback)
        }
    }
    /**
     * 激励视频预加载
     * @param id 广告ID
     */
    public static RewardVideoADS(id: string): void {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.RewardVideoADS(id)
        }
    }
    /**
     * 播放预加载视频
     * @param finish 视频播放成功回调
     * @param showFail 播放视频失败
     * @param watchFail 播放未完整
     */
    public static RewardPreLoadShow(finish: Function, showFail?: Function, watchFail?: Function) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.RewardShow(finish, showFail, watchFail)
        }
    }
    /**
     * 播放视频广告
     * @param ads 广告组件
     * @param finish 观看视频完成回调
     * @param showFail 视频展示失败回调
     * @param watchFail 观看视频未完成回调
     */
    public static RewardVideoShow(id: string, finish: Function, showFail?: Function, watchFail?: Function) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.RewardADSShow(id, finish, showFail, watchFail)
            else
                QQSDK.RewardVideoADS(id, finish, showFail, watchFail)
        }
        else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.RewardVideoADS(id, finish, showFail, watchFail)
        } else if (sys.platform == sys.Platform.HUAWEI_QUICK_GAME) {
            HuaWeiSDK.CreateRewardAD(id, finish, showFail, watchFail)
        } else if (sys.platform == sys.Platform.OPPO_MINI_GAME) {
            OPPOSDK.CreateRewardAD(id, finish, showFail, watchFail)
        }
    }
    /**
     * 原生广告播放
     * @param params 
     */
    public static CreateCustomAD(adUnitID: string, adIntervals: number, left: number, top: number, success: Function, fail: Function, fixed = true) {
        if (adUnitID == null || adUnitID == '') return
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                return WXSDK.CreateCustomAD(adUnitID, adIntervals, left, top, success, fail)
            else
                return QQSDK.CreateCustomAD(adUnitID, adIntervals, left, top, fixed)
        } else if (sys.platform == sys.Platform.OPPO_MINI_GAME) {
            return OPPOSDK.CreateNativeAD(adUnitID)
        }
    }
    /**
     * banner广告播放
     * @param params 
     */
    public static CreateBanner(adUnitId: string, success: Function, onError: Function) {
        if (adUnitId == null || adUnitId == '') return
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                return WXSDK.CreateBanner(adUnitId, success, onError)
            else
                return QQSDK.CreateBanner(adUnitId, onError)
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            return ByteDancingSDK.CreateBanner(adUnitId, onError)
        } else if (sys.platform == sys.Platform.OPPO_MINI_GAME) {
            return OPPOSDK.CreateBannerAd(adUnitId)
        } else if (sys.platform == sys.Platform.HUAWEI_QUICK_GAME) {
            return HuaWeiSDK.CreateNativeAD(adUnitId, () => { }, onError)
        }
    }
    /**
     * 创建格子广告
     * @param adUnitId 广告id
     * @param Interval 刷新间隔时间（0代表不刷新）
     * @param adTheme 主题
     * @param gridCount 个数
     * @param left 左偏移量
     * @param top 上偏移量
     * @param width 宽度
     * @param height 高度
     * @param opacity 透明度
     */
    public static createGridAd(adUnitId: string, Interval: number, adTheme: string, gridCount: number, left: number, top: number, width: number, height: number, opacity: number) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            return WXSDK.CreateGridAd(adUnitId, Interval, adTheme, gridCount, {
                left: left,
                top: top,
                width: width,
                height: height,
                opacity: opacity
            })
        }
    }
    /**
     * 创建互推盒子广告
     * @param adUnitId 广告ID
     */
    public static CreateGamePortalAD(adUnitId: string) {
        if (sys.platform == sys.Platform.OPPO_MINI_GAME) {
            OPPOSDK.CreateGameProtalAD(adUnitId)
        }
    }
    /**
     * 子域通信
     * @param params 
     */
    public static OpenDataContext(type: string, data: any, event: string, timer: any) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                return WXSDK.OpenDataContext(type, data, event, timer)
            else
                QQSDK.OpenDataContext(type, data, event, timer)
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            ByteDancingSDK.OpenDataContext(type, data, event, timer)
        }
    }
    /**
     * 广告隐藏
     * @param params 
     */
    public static ADSHide(ADSName: string, ads: any) {
        if (ads == null) return
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0) {
                if (ADSName == 'custom') {
                    WXSDK.CustomADHide(ads)
                } else if (ADSName == 'banner') {
                    WXSDK.BannerHide(ads)
                } else if (ADSName == 'grid') {
                    WXSDK.GridAdHide(ads)
                }
            }
            else {
                if (ADSName == 'custom') {
                    QQSDK.CustomADHide(ads)
                } else if (ADSName == 'banner') {
                    QQSDK.BannerHide(ads)
                } else if (ADSName == 'grid') {
                    QQSDK.GridAdHide(ads)
                }
            }
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            if (ADSName == 'banner') {
                if (ads != null)
                    ByteDancingSDK.BannerHide(ads)
            }
        } else if (sys.platform == sys.Platform.HUAWEI_QUICK_GAME) {
            HuaWeiSDK.DestroyAD(ads)
        } else if (sys.platform == sys.Platform.OPPO_MINI_GAME) {
            if (ADSName == 'custom') {
                if (ads != null)
                    OPPOSDK.DestroyNativeAD(ads)
            }
            else if (ADSName == 'banner') {
                if (ads != null)
                    OPPOSDK.BannerHide(ads)
            }
        }
    }
    /**
     * 广告展示
     * @param params 
     */
    public static ADSShow(ADSName: string, ads: any) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0) {
                if (ADSName == 'custom') {
                    WXSDK.CustomADShow(ads)
                } else if (ADSName == 'banner') {
                    WXSDK.BannerShow(ads)
                } else if (ADSName == 'grid') {
                    WXSDK.GridAdShow(ads)
                }
            }
            else {
                if (ADSName == 'custom') {
                    QQSDK.CustomADShow(ads)
                } else if (ADSName == 'banner') {
                    QQSDK.BannerShow(ads)
                } else if (ADSName == 'grid') {
                    QQSDK.GridAdShow(ads)
                }
            }
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            if (ADSName == 'banner') {
                if (ads != null)
                    ByteDancingSDK.BannerShow(ads)
            }
        } else if (sys.platform == sys.Platform.HUAWEI_QUICK_GAME) {
            if (ADSName == 'banner') {
                HuaWeiSDK.NativeADLoad(ads)
            }
        } else if (sys.platform == sys.Platform.OPPO_MINI_GAME) {
            if (ADSName == 'custom') {
                if (ads != null)
                    OPPOSDK.NativeADLoad(ads)
            } else if (ADSName == 'banner') {
                if (ads != null)
                    OPPOSDK.ShowBannerAd(ads)
            }
        }
    }
    /**
     * 广告销毁
     * @param params 
     */
    public static ADSDestroy(ADSName: string, ads: any) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0) {
                if (ADSName == 'custom') {
                    if (ads != null)
                        WXSDK.CustomADDestroy(ads)
                } else if (ADSName == 'banner') {
                    if (ads != null)
                        WXSDK.BannerDestroy(ads)
                } else if (ADSName == 'grid') {
                    if (ads != null)
                        WXSDK.GridAdDestroy(ads)
                }
            }
            else {
                if (ADSName == 'custom') {
                    if (ads != null)
                        QQSDK.CustomADDestroy(ads)
                } else if (ADSName == 'banner') {
                    if (ads != null)
                        QQSDK.BannerDestroy(ads)
                } else if (ADSName == 'grid') {
                    if (ads != null)
                        QQSDK.GridAdDestroy(ads)
                }
            }
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            if (ADSName == 'banner') {
                if (ads != null)
                    ByteDancingSDK.BannerDestroy(ads)
            }
        } else if (sys.platform == sys.Platform.HUAWEI_QUICK_GAME) {
            if (ads != null)
                HuaWeiSDK.DestroyAD(ads)
        } else if (sys.platform == sys.Platform.OPPO_MINI_GAME) {
            if (ADSName == 'custom') {
                if (ads != null)
                    OPPOSDK.DestroyNativeAD(ads)
            }
            else if (ADSName == 'banner') {
                if (ads != null)
                    OPPOSDK.BannerDestroy(ads)
            }
        }
    }
    /**
     * 获取广告ID
     * @param ADSName 广告名字
     */
    public static GetADSID(ADSName: string) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                return WXADSID[ADSName]
            else
                return qqADSID[ADSName]
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            return ByteDancingADSID[ADSName]
        } else if (sys.platform == sys.Platform.HUAWEI_QUICK_GAME) {
            return HuaWeiADSID[ADSName]
        } else if (sys.platform == sys.Platform.OPPO_MINI_GAME) {
            return OPPOADSID[ADSName]
        }
    }
    /**
     * 获取右上角功能键位置
     * @returns {width:number,height:number,top:number,right:number,bottom:number,left:number}
     */
    public static GetMBBCRect(): any {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.GetMBBCRect()
            else
                QQSDK.GetMBBCRect()
        } else if (sys.platform == sys.Platform.BAIDU_MINI_GAME) {
            return null
        }
    }
    /**
     * 创建插屏广告
     * @param id 广告ID
     */
    public static CreateInterstitialAd(id: string) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.CreateInterstitialAd(id)
        }
    }
    /**
     * 插屏广告展示
     */
    public static InterstitialAdShow() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.InterstitialAdShow()
        }
    }
    /**
     * 打开提示框
     * @param content 提示语
     */
    public static showModal(content: string) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.showModal(content)
        }
    }
    /**
     * 跳转其他小游戏
     * @param appid 其他小游戏的appid
     * @param query 参数
     * @param extraData 参数
     */
    public static NavigateGame(appid: string, query: string, callback: Function, extraData?: any) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0) {
                WXSDK.NavigateGame(appid, query, callback, extraData)
            }
        }
    }
    /**
    * 友盟自定义数据发送
    * @param eventName 事件id(友盟后台创建)
    * @param otherData 其他参数
    */
    public static UMASendEvent(eventID: string, otherData?: any) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.UMASendEvent(eventID, otherData)
        }
    }
    /**
     * 友盟关卡数据--开始
     * @param stageId 关卡ID
     * @param stageName 关卡名称
     */
    public static UMAStart(stageId: string, stageName: string) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.UMAStart(stageId, stageName)
        }
    }
    /**
    * 友盟关卡数据--运行
    * @param stageId 关卡ID
    * @param stageName 关卡名称
    * @param event 关卡中用户操作 (请按照以下两个字段上传，tools/ award 使用道具/关卡中获得奖励)
    * @param params 使用道具名称 该字段必传
    */
    public static UMARunning(stageId, stageName, event: string, params: umaStageRunningparams) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.UMARunning(stageId, stageName, event, params)
        }
    }
    /**
     * 友盟关卡数据--停止
     * @param stageId 关卡ID
     * @param stageName 关卡名称
     * @param event 关卡结束结果（请按照以下两个字段上传，complete/ fail （关卡完成/关卡失败））
     * @param time 关卡耗时（毫秒）
     */
    public static UMAEnd(stageId: string, stageName: string, event: string, time?: number) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.UMAEnd(stageId, stageName, event, time)
        }
    }
    /**
     * 设置定向分享的接口query值
     * @param query 代表场景数字（0-50）
     */
    public static SetMessageToFriendQuery(query: number) {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                WXSDK.SetMessageToFriendQuery(query)
        }
    }
    /**
     * 获取冷启动数据
     */
    public static getLaunchOptionsSync() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            if (this.wx_qq == 0)
                return WXSDK.getLaunchOptionsSync()
        }
        return null
    }
}
