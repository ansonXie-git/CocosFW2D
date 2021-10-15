
import UIManager from './UIManager';
import { CycEvent, FindComponentData, TimerEvent, NumberAtlasCache, ABName, ADSName } from './CommonData';
import GameData from './GameData';
import PoolManager from './PoolManager';
import PlatformManager from './PlatformManager';
import { Asset, AssetManager, assetManager, AudioClip, Button, Component, Event, EventTouch, find, js, macro, Node, Sprite, SpriteAtlas, SubContextView, _decorator } from 'cc';
const { ccclass } = _decorator;

@ccclass
export default class GameMgr extends Component {
    /**
     * @param update事件数组
     */
    private static CycDic: Array<CycEvent>
    /**
     * @param 资源缓存集合
     */
    private static resCacheDic: { string: any }
    /**
     * @param 计时器集合
     */
    private static TimerDic: Array<TimerEvent>
    /**
     * @param AB包缓存集合
     */
    private static ABCacheDis: { string: AssetManager.Bundle }
    /**
     * @param 数字图集队列
     */
    private static NumberAtlasArr: Array<NumberAtlasCache>
    /**是否展示群排行榜 */
    private static showGroupRank = false
    private static ModalShowFirst = true
    private static CommonCustom1: any;
    private static ads_custom: any;
    public static gameSpeed = 1;
    public static judgeGetShare: number = 0
    /**
     * 游戏管理类初始化
     */
    public static GameInit() {
        GameMgr.CycDic = new Array<CycEvent>()
        GameMgr.TimerDic = new Array<TimerEvent>()
        GameMgr.NumberAtlasArr = new Array<NumberAtlasCache>()
        GameMgr.resCacheDic = new Object() as { string: any }
        GameMgr.ABCacheDis = new Object() as { string: AssetManager.Bundle }
        /**游戏中等待加载logo */
        PoolManager.InitPool('loadingWait', Node)
        /**数字图片预制体 */
        PoolManager.InitPool('number', Sprite)
        /**通用礼品窗口 */
        PoolManager.InitPool('commonGift', Node)
        UIManager.Init()
        GameMgr.OnShow()
        GameMgr.OnHide()
        PlatformManager.ShareAppMenu()
        PlatformManager.onShareAppMessage()
    }
    update(dt: number) {
        if (GameMgr.CycDic == null) return
        if (GameMgr.CycDic.length == 0) return
        for (let i = 0; i < GameMgr.CycDic.length; i++) {
            if (GameMgr.CycDic[i] == null) continue
            GameMgr.CycDic[i].cycFunc(dt)
        }
    }
    /**游戏回到前台 */
    public static OnShow(): void {
        PlatformManager.OnShow((res) => {
            console.log(JSON.stringify(res))
            if (res.query != null) {//定向分享数据
                const query = res.query.shareMessageToFriendScene
                if (query != null) GameMgr.judgeGetShare = query
            }
            // if (GameMgr.showGroupRank)
            //     GameMgr.CheckGroupRank(res)
            let data = GameData.LoadDataByLocalStorage()
            GameData.SetData(data)
            GameMgr.OffLineTime()
        })
    }
    /**游戏返回后台 */
    public static OnHide(): void {
        PlatformManager.OnHide(() => {
            let HideTime = new Date()
            let str = (HideTime.getMonth() + 1) + '/' + HideTime.getDate() + '/' + HideTime.getHours() + '/' + HideTime.getMinutes()
            GameData.SetSingleData('OffLineTime', str)
            GameData.SaveDataToServer()
            GameData.SaveDataByLocalStorage()
        })
    }
    /**
     * 检测是否能打开群排行榜
     * @param res onshow回调数据
     */
    private static CheckGroupRank(res) {
        if (GameMgr.ModalShowFirst) {
            GameMgr.ModalShowFirst = false
            PlatformManager.showModal('点击群里分享链接即可查看群排行')
            return
        }
        if (res.shareTicket && res.scene == '1044') {
            console.log('获取分享内容成功', res.shareTicket)
            GameMgr.SubContextShow(JSON.stringify({ shareTicket: res.shareTicket }), 'getGroupRank')
            GameMgr.showGroupRank = false
        } else {
            if (res.scene == '1007') {
                PlatformManager.showModal('选择分享到群才能查看排行榜哦！')
                GameMgr.showGroupRank = false
            }
        }
    }
    /**
     * 更改打开群排行榜判断
     */
    public static SetGroupRankShow() {
        GameMgr.showGroupRank = true
        GameMgr.ModalShowFirst = true
    }
    /**
     * 打开子域
     * @param data ex:  JSON.stringify({
            'wxgame': { 
                'level': number,
                'update_time': number
            }
        })
     * @param event 事件类型:子域根据类型判断操作(展示数据)
     */
    public static SubContextShow(data: any, event: string) {
        let Time = new Date().getTime() / 1000
        let sub: SubContextView = find('game_Canvas/subContext')!.getComponent(SubContextView)!
        if (!sub.enabled) {
            sub.node.setSiblingIndex(sub.node.parent.children.length - 1)
            sub.node.active = true
            sub.enabled = true
        }
        PlatformManager.OpenDataContext('GET', data, event, Time)
    }
    /**
     * 关闭子域
     */
    public static CloseSubContext() {
        let sub = find('game_Canvas/subContext')!.getComponent(SubContextView)!
        sub.node.setSiblingIndex(0)
        sub.node.active = false
        sub.enabled = false
        PlatformManager.OpenDataContext('DEL', null, 'removeData', new Date().getTime() / 1000)
    }
    /**
     * 隐藏子域
     */
    public static HideSubContext() {
        let sub = find('game_Canvas/subContext')!.getComponent(SubContextView)!
        sub.node.setSiblingIndex(0)
        sub.node.active = false
        sub.enabled = false
    }
    /**
     * 发送信息到子域
     * @param data ex:  JSON.stringify({
            'wxgame': { 
                'level': number,
                'update_time': number
            }
        })
     * @param event 事件类型:子域根据类型判断操作(数据写入)
     */
    public static SendMesSubContext(data: any, event: string) {
        let updateTime = new Date().getTime() / 1000
        PlatformManager.OpenDataContext('SET', data, event, updateTime)
    }
    /**
     * 获取离线收益
     */
    public static OffLineTime() {
        let hideStr = GameData.GetSingleData('OffLineTime') as string
        // let currentPower = GameData.GetSingleData('currentPower') as number
        if (hideStr == null || hideStr == '') return
        let showTime = new Date()
        let show_hours = showTime.getHours()
        let show_min = showTime.getMinutes()
        let show_day = showTime.getDate()
        let show_month = showTime.getMonth() + 1
        let str_arr = hideStr.split('/')
        const hide_month = parseInt(str_arr[0])
        const hide_day = parseInt(str_arr[1])
        const hide_hours = parseInt(str_arr[2])
        const hide_min = parseInt(str_arr[3])
        if (show_month != hide_month) {//月份不同逻辑

            return
        }
        if (show_day != hide_day) {
            if (show_hours < hide_hours)
                show_hours += 24 * (show_day - hide_day)
            /**
             * 之前已签到，则恢复未签到状态，且日期往上加一天
             */
            if ((GameData.GetSingleData('judgeCheckIn') as number) == 1) {
                GameData.SetSingleData('judgeCheckIn', 0)
                GameData.SetSingleData('checkInDay', (GameData.GetSingleData('checkInDay') as number) + 1)
            }
        }
        let hours = show_hours - hide_hours
        if (hours >= 2) {//离线大于2小时逻辑

        } else {
            let min = 0
            if (show_min < hide_min) {
                let hours = show_hours - hide_hours - 1
                min = hours * 60 + (60 - (hide_min - show_min))
            } else {
                min = hours * 60 + (show_min - hide_min)
            }
            if (min > 150) {//大于150分钟逻辑

            } else {//其他

            }
        }
    }
    /**
     * 创建通用原生广告
     */
    public static CreateCustom() {
        // this.CommonCustom1 = PlatformManager.CreateCustomAD(PlatformManager.GetADSID(ADSName.always_custom), 30, window.screen.width - 60, 84, () => {
        //     this.CustomShow()
        // }, () => {
        //     console.log('右原生广告加载失败')
        // })
        // this.CommonCustom2 = PlatformManager.CreateCustomAD(PlatformManager.GetADSID(ADSName.left_custom), 30, 0, 84, () => {
        //     PlatformManager.ADSShow('custom', this.CommonCustom2)
        // }, () => {
        //     console.log('左原生广告加载失败')
        // })
    }
    /**
     * 通用原生广告隐藏
     */
    public static CustomHide() {
        PlatformManager.ADSHide('custom', this.CommonCustom1)
    }
    /**
     * 通用原生广告展示
     */
    public static CustomShow() {
        PlatformManager.ADSShow('custom', this.CommonCustom1)
        const s = setTimeout(() => {
            clearTimeout(s)
            this.CustomHide()
            const ss = setTimeout(() => {
                clearTimeout(ss)
                this.CustomShow()
            }, 10 * 1000);
        }, 50 * 1000);
    }
    /**
     * 创建全屏广告
     */
    public static CustomPreLoad() {
        // const top = window.screen.width / window.screen.height >= 2 ? window.screen.height / 6 : window.screen.height / 10
        // const custom = PlatformManager.CreateCustomAD(PlatformManager.GetADSID(ADSName.allScreen_custom), 30, 0, top, () => {
        //     this.ads_custom = custom
        //     console.log('全屏广告预加载成功')
        // }, () => {
        //     this.ads_custom = null
        //     console.log('全屏广告预加载失败')
        // })
    }
    /**
     * 全屏广告播放
     */
    public static AllScreenCustomPlay() {
        if (this.ads_custom != null) PlatformManager.ADSShow('custom', this.ads_custom)
    }
    /**
     * 全屏广告隐藏
     */
    public static AllScreenCustomHide() {
        if (this.ads_custom != null) PlatformManager.ADSShow('custom', this.ads_custom)
    }
    /**
     * 判断全屏广告是否为空
     */
    public static JudgeADSCustomNull() {
        return this.ads_custom == null
    }
    /**
     * 计时器（如果名字相同，则不能取消定时器内方法，需谨慎）
     * @param timerEvent 计时器所需参数
     * @param component 组件
     * @param interval 计时时间(0表示下一帧)
     * @param repeat 重复次数( macro.REPEAT_FOREVER为无限)
     * @param delay 延迟执行时间
     */
    public static Timer(timerEvent: TimerEvent, component: Component, interval = 0.02, repeat = 0, delay = 0): void {
        if (GameMgr.TimerDic.length == 0) {
            GameMgr.TimerDic[0] = timerEvent
            component.schedule(GameMgr.TimerDic[0].cycFunc, interval, repeat, delay)
        }
        for (let i = 0; i < GameMgr.TimerDic.length; i++) {
            if (GameMgr.TimerDic[i].cycName == timerEvent.cycName) {
                GameMgr.TimerDic[i] = timerEvent
                component.schedule(GameMgr.TimerDic[i].cycFunc, interval, repeat, delay)
                return
            }
        }
        GameMgr.TimerDic.push(timerEvent)
        component.schedule(timerEvent.cycFunc, interval, repeat, delay)
    }
    /**
     * 取消定时器内方法
     * @param component 组件
     * @param cycName 计时器名字
     */
    public static UnTimer(component: Component, cycName: string): void {
        if (GameMgr.TimerDic.length == 0) return
        for (let i = 0; i < GameMgr.TimerDic.length; i++) {
            if (GameMgr.TimerDic[i].cycName == cycName) {
                component.unschedule(GameMgr.TimerDic[i].cycFunc)
                js.array.removeAt(GameMgr.TimerDic, i)
                return
            }
        }
    }
    /**
     * 寻找场景内物体
     * @param componentData 物体信息与地址
     */
    public static FindComponent(componentData: FindComponentData): Node {
        let path_arr = componentData.path.split('/')
        let temp_obj = componentData.parent
        for (let i = 0; i < path_arr.length; i++) {
            temp_obj = temp_obj.getChildByName(path_arr[i])!
        }
        return temp_obj
    }
    /**
     * 按钮事件绑定。可控制按钮是否只能点击一次，通过回调恢复按钮点击功能
     * @param button 绑定事件的按钮
     * @param eventFun 绑定到按钮上的事件（默认带两参：event=>按钮点击返回参数，callback=>恢复按钮点击功能）
     * @param isHide 是否点击按钮后隐藏按钮（默认为true）
     */
    public static ButtonEventBinding(button: Button, type: string, eventFun: Function, isHide = true): void {
        button.node.on(type, (event: EventTouch) => {
            if (button.interactable == false)
                return
            // SourceManager.PlaySource('click')
            if (isHide)
                button.interactable = false
            eventFun(event, () => {
                button.interactable = true
            })
        })
    }
    /**
     * 后台加载AB包
     * @param ABName ab包名字
     * @param callback 回调
     */
    public static PreLoadABPack(ABName: string, callback?: Function) {
        assetManager.loadBundle(ABName, (err, res: AssetManager.Bundle) => {//
            if (err != null) {
                console.error(err)
                return
            }
            GameMgr.SetABCacheDis(ABName, res)
            if (callback != null)
                callback()
        })
    }
    /**
     * 后台加载AB包内资源
     * @param ABName ab包名字
     * @param path 包内资源地址
     * @param resName 资源缓存名字
     * @param type 资源类型
     * @param callback 回调
     */
    public static PreLoadResDirBack(ABName: string, path: string, resName: string, type: typeof Asset, callback?: Function) {
        let ab: AssetManager.Bundle = GameMgr.ABCacheDis[ABName]
        if (ab == null) {
            console.error('ab is null,please check the name!!!!!!!!' + ABName)
            return
        }
        ab.loadDir(path, type, (err, res) => {
            if (err != null) {
                console.error(err)
                return
            }
            for (let i = 0; i < res.length; i++)
                GameMgr.resCacheDic[resName + res[i].name] = res[i]
            if (callback != null) callback(res)
        })
    }
    /**
     * 新增数字图集缓存
     * @param path 地址
     * @param name 缓存名字
     */
    public static async SetNumberAtlasCache(path: string, name: string): Promise<void> {
        let ab = await GameMgr.GetBundle(ABName.CommonUse)
        let temp_atlas: SpriteAtlas = await new Promise<SpriteAtlas>(resolve => {
            ab.load(path, SpriteAtlas, (err, res: SpriteAtlas) => {
                if (err != null) {
                    console.error(err)
                    return null
                }
                return resolve(res)
            })
        })
        GameMgr.NumberAtlasArr.push({ name: name, atlas: temp_atlas })
    }
    /**
     * 获取数字图集缓存
     * @param name 缓存名字
     */
    public static GetNumberAtlasCache(name: string): SpriteAtlas | null {
        for (let i = 0; i < GameMgr.NumberAtlasArr.length; i++) {
            if (GameMgr.NumberAtlasArr[i].name == name)
                return GameMgr.NumberAtlasArr[i].atlas
        }
        return null
    }
    /**
     * 判断缓存中是否有此图集
     * @param name 缓存名字
     */
    public static ContainsNameInNumberAtlas(name: string): boolean {
        for (let i = 0; i < GameMgr.NumberAtlasArr.length; i++) {
            if (GameMgr.NumberAtlasArr[i].name == name)
                return true
        }
        return false
    }
    /**
     * 获取音效文件
     * @param clipName 音效名字
     */
    public static GetAudioClip(clipName: string): AudioClip | null {
        let allClip = GameMgr.GetRes<AudioClip[]>('allSources')
        for (let i = 0; i < allClip.length; i++) {
            if (allClip[i].name == clipName)
                return allClip[i]
        }
        return null
    }
    /**
     * 获取缓存资源
     * @param name 资源名称
     */
    public static GetRes<T>(name: string): T {
        return GameMgr.resCacheDic[name]
    }
    /**
     * 获取路径下的所有资源中的单独资源
     * @param dirName 路径名字
     * @param resName 资源名字
     */
    public static GetResByDir<T>(dirName: string, resName: string): T | null {
        for (let i = 0; i < GameMgr.resCacheDic[dirName].length; i++) {
            if (GameMgr.resCacheDic[dirName][i].name == resName)
                return GameMgr.resCacheDic[dirName][i]
        }
        return null
    }
    /**
     * 加载AB包内的资源
     * @param ABName AB包名字
     * @param path 包内资源地址
     * @param type 资源类型
     */
    public static async ResLoadByAB(ABName: string, path: string, type: typeof Asset): Promise<any> {
        let ab = await GameMgr.GetBundle(ABName)
        return new Promise<any>(resolve => {
            ab.load(path, type, (err, res) => {
                if (err != null) {
                    console.error(err)
                    return null
                }
                return resolve(res)
            })
        })
    }
    /**
     * 加载AB包内的资源
     * @param ab AB包
     * @param path 包内资源地址
     * @param type 资源类型
     */
    public static async ResLoad<T>(ab: AssetManager.Bundle, path: string, type: typeof Asset): Promise<T> {
        return new Promise<any>(resolve => {
            ab.load(path, type, (err, res) => {
                if (err != null) {
                    console.error(err)
                    return null
                }
                return resolve(res)
            })
        })
    }
    /**
     * 通过AB包加载资源路径下的全部资源
     * @param dir 资源总路径
     * @param type 类型
     * @param bundleName AB包名字
     * @param callback 回调
     */
    public static async ResLoadDir(ABName: string, dir: string, type: typeof Asset): Promise<any> {
        let ab = await GameMgr.GetBundle(ABName)
        return new Promise<any>(resolve => {
            ab.loadDir(dir, type, (err, res) => {
                if (err != null) {
                    console.error(err)
                    return null
                }
                return resolve(res)
            })
        })
    }
    public static async DirLoad<T>(ab: AssetManager.Bundle, dir: string, type: typeof Asset): Promise<T[]> {
        return new Promise<T[]>(resolve => {
            ab.loadDir(dir, type, (err, res) => {
                if (err != null) {
                    console.error(err)
                    return null
                }
                return resolve(res as any)
            })
        })
    }
    /**
     * AB包加载
     * @param ABName AB包名字
     */
    public static async ABLoad(ABName: string): Promise<AssetManager.Bundle> {
        return new Promise<AssetManager.Bundle>(resolve => {
            assetManager.loadBundle(ABName, null, (err, res) => {
                if (err != null) {
                    console.log(err)
                    return null
                }
                return resolve(res)
            })
        })
    }
    /**
     * 缓存res加载的资源
     * @param name 资源名称
     * @param res 资源
     */
    public static SetResCacheDic(name: string, res: any) {
        GameMgr.resCacheDic[name] = res
    }
    /**
     * 缓存AB包
     * @param name AB包名字
     * @param res AB包
     */
    public static SetABCacheDis(name: string, res: AssetManager.Bundle) {
        GameMgr.ABCacheDis[name] = res
    }
    /**
     * 后台加载AB包资源
     * @param ABName AB包名字
     * @param resName 资源名字
     * @param path 地址
     * @param type 类型
     */
    public static ABLoadResBack(ABName: string, resName: string, path: string, type: typeof Asset, isDir = false, isDis = false, callback?: Function) {
        let ab: AssetManager.Bundle = GameMgr.ABCacheDis[ABName]
        if (!isDir) {
            ab.load(path, type, (err, res) => {
                if (err != null) {
                    console.error('ABLoadResBack', err)
                    return
                }
                GameMgr.SetResCacheDic(resName, res)
                if (isDis) {
                    assetManager.removeBundle(GameMgr.ABCacheDis[ABName])
                    delete GameMgr.ABCacheDis[ABName]
                }
                if (callback != null) callback()
            })
        } else {
            ab.loadDir(path, type, (err, res) => {
                if (err != null) {
                    console.error(err)
                    return
                }
                GameMgr.SetResCacheDic(resName, res)
                if (isDis) {
                    assetManager.removeBundle(GameMgr.ABCacheDis[ABName])
                    delete GameMgr.ABCacheDis[ABName]
                }
                if (callback != null) callback()
            })
        }
    }
    /**
     * AB加载资源（不缓存，直接返回）
     * @param ABName AB包名字
     * @param path 地址
     * @param type 类型
     * @param isDir 是否多个
     * @param callback 回调（带参）
     */
    public static ABLoadRes_NotSave(ABName: string, path: string, type: typeof Asset, isDir = false, callback: Function) {
        let ab: AssetManager.Bundle = GameMgr.ABCacheDis[ABName]
        if (!isDir) {
            ab.load(path, type, (err, res) => {
                if (err != null) {
                    console.error('ABLoadResBack', err)
                    return
                }
                callback(res)
            })
        } else {
            ab.loadDir(path, type, (err, res) => {
                if (err != null) {
                    console.error(err)
                    return
                }
                callback(res)
            })
        }
    }
    /**
     * 移除AB包
     * @param ABName ab包名字
     */
    public static RemoveABPack(ABName: string) {
        if (GameMgr.ABCacheDis[ABName] == null) return
        assetManager.removeBundle(GameMgr.ABCacheDis[ABName])
        delete GameMgr.ABCacheDis[ABName]
    }
    /**
     * 移除包体并释放其所有资源
     * @param ABName ab包名字
     */
    public static RemoveAB_Asset(ABName: string, bundle?: AssetManager.Bundle) {
        if (bundle == null) bundle = GameMgr.ABCacheDis[ABName]
        if (bundle == null) return
        bundle.releaseAll()
        assetManager.removeBundle(bundle)
        if (GameMgr.ABCacheDis[ABName] != null) delete GameMgr.ABCacheDis[ABName]
    }
    /**
     * 检测是否存在此AB包
     * @param ABName ab包名字
     */
    public static CheckABPackCache(ABName: string) {
        return GameMgr.ABCacheDis[ABName] == null
    }
    /**
     * 获取AB包
     * @param name AB包名字
     */
    public static async GetBundle(name: string): Promise<AssetManager.Bundle> {
        if (GameMgr.ABCacheDis[name] == null) {
            GameMgr.SetABCacheDis(name, await GameMgr.ABLoad(name))
            return GameMgr.ABCacheDis[name]
        } else {
            return GameMgr.ABCacheDis[name]
        }
    }
    /**
     * 插入事件到游戏upate循环中
     * 一个Name对应一个函数，名字相同，则覆盖
     * @param cycData 需要循环的游戏数据
     */
    public static CycleEventPush(cycData: CycEvent): void {
        if (GameMgr.CycDic.length == 0) {
            GameMgr.CycDic[0] = cycData
            return
        }
        for (let i = 0; i < GameMgr.CycDic.length; i++) {
            if (GameMgr.CycDic[i].cycName == cycData.cycName) {
                GameMgr.CycDic[i] = cycData
                return
            }
        }
        GameMgr.CycDic.push(cycData)
    }
    /**
     * 根据名字，移除事件方法
     * @param cycName 事件对应的名字
     */
    public static CycleEventRemove(cycName: string): void {
        if (GameMgr.CycDic.length == 0) return
        for (let i = 0; i < GameMgr.CycDic.length; i++) {
            if (GameMgr.CycDic[i].cycName == cycName) {
                js.array.removeAt(GameMgr.CycDic, i)
                break
            }
        }
    }
    /**
     * 根据名字判断是否存在此事件
     * @param cycName 事件对应名字
     * @returns true:存在；false:不存在
     */
    public static ContainsKeyInCycle(cycName: string): boolean {
        if (GameMgr.CycDic.length == 0) return false
        for (let i = 0; i < GameMgr.CycDic.length; i++)
            if (GameMgr.CycDic[i].cycName == cycName)
                return true
        return false
    }
    /**
     * 根据名字判断计时器集合中是否有此事件
     * @param cycName 计时器名字
     * @returns ture：存在，false：不存在
     */
    public static ContainsKeyInTimer(cycName: string): boolean {
        if (GameMgr.TimerDic.length == 0) return false
        for (let i = 0; i < GameMgr.TimerDic.length; i++) {
            if (GameMgr.TimerDic[i].cycName == cycName)
                return true
        }
        return false
    }
}
