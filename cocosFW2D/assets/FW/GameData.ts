/**
 * 游戏数据缓存类。
 * 本地数据与后端通信数据存储
 */
import { sys } from 'cc';
import GameMgr from './GameMgr';

export default class GameData {
    /**
     * 游戏缓存数据
     */
    private static allData = {
        /**离线时间 */
        OffLineTime: '',
        /**是否新人 */
        isNew: 0,
        /**新手指导步骤 */
        guideStep: 1,
        /**是否播放音乐 */
        jdugeMusic: 1,
        /**是否开启振动 */
        judgeVibrate: 1,
        /**音效音量 */
        sourceVolume: 1,
        /**BGM音量 */
        BGMVolume: 1,
        /**当前游戏等级 */
        gameLevel: 1,
        /**游戏金钱 */
        gameGold: 0,
    }
    /**游戏常数 */
    private static ConstData = {

    }
    /**
     * 用户信息
     */
    private static UserInfo = {
        name: '',
        photo: '',
    }
    /**
     * 用户登录信息
     */
    private static UserLoginInfo = {
        openId: '',
        uToken: ''
    }
    /**
     * 判断是否新手玩家
     * @returns true：新手；false：非新手
     */
    public static JudgeNewGuide() {
        return this.allData.isNew == 0
    }
    /**
     * 缓存用户信息
     * @param name 用户名称
     * @param photo 用户头像地址
     */
    public static SetCacheUserInfo(name: string, photo: string) {
        GameData.UserInfo.name = name
        GameData.UserInfo.photo = photo
    }
    /**
     * 获取用户信息
     */
    public static GetUserInfoCache() {
        return { name: GameData.UserInfo.name, photo: GameData.UserInfo.photo }
    }
    /**
     * 缓存用户登录信息
     * @param openId 用户openId
     * @param uToken 用户uToken
     */
    public static SetUserLoginInfo(openId: string, uToken: string) {
        GameData.UserLoginInfo.openId = openId
        GameData.UserLoginInfo.uToken = uToken
    }
    /**
     * 获取用户登录信息
     */
    public static GetUserLoginInfo() {
        return { openId: GameData.UserLoginInfo.openId, uToken: GameData.UserLoginInfo.uToken }
    }
    /**
     * 获取游戏常用数据
     * @param name 数据名字
     */
    public static GetSingleData(name: string): number | string {
        if (typeof GameData.allData[name] == 'number' && isNaN(GameData.allData[name]))
            GameData.allData[name] = 0
        return GameData.allData[name] == null ? null : GameData.allData[name]
    }
    /**
     * 重置游戏常用数据
     * @param name  数据名字
     * @param data  最新数据
     */
    public static SetSingleData(name: string, data: any): void {
        if (GameData.allData[name] == null) {
            console.error('name is not found!!check this name: ' + name)
            return
        }
        if (typeof data == 'number' && isNaN(data))
            data = 0
        GameData.allData[name] = data
    }
    /**
     * 获取静态数据
     * @param name 数据名称
     */
    public static GetCommonData(name: string): number {
        return GameData.ConstData[name] == null ? null : GameData.ConstData[name]
    }
    /**
     * 保存游戏数据到本地
     */
    public static SaveDataByLocalStorage(): void {
        sys.localStorage.setItem('gameData', JSON.stringify(this.allData))
    }
    /**
     * 缓存用户id与utoken到本地
     */
    public static SaveUserIDByLocalStorage(): void {
        sys.localStorage.setItem('UserData', JSON.stringify(this.UserLoginInfo))
    }
    /**
     * 保存游戏数据到服务器
     */
    public static SaveDataToServer(): void {

    }
    /**
     * 从服务器获取数据
     */
    public static GetData(callback?: Function) {

    }
    /**
     * 加载本地缓存的游戏数据
     */
    public static LoadDataByLocalStorage(): any {
        return sys.localStorage.getItem('gameData')
    }
    /**
     * 更新游戏数据
     * @param data 本地缓存的数据
     * @param callBack 回调
     */
    public static SetData(data: any) {
        let json = JSON.parse(data)
        for (let key in json) {
            if (json[key] == null || (typeof json[key] == 'number' && isNaN(json[key])) || json[key] == 'null' || json[key] < 0)
                GameData.SetSingleData(key, 0)
            else
                GameData.SetSingleData(key, json[key])
        }
        GameMgr.OffLineTime()
    }
    /**
     * 从本地加载玩家id
     */
    public static LoadUserInfoByLocalStorage(): any {
        return sys.localStorage.getItem('UserData')
    }
    /**
     * 检测此数据是否存在
     * @param name 需检测的数据名字
     */
    public static ContainData(name: string): boolean {
        return GameData.allData[name] == null
    }
}
