import { Node, SpriteAtlas } from "cc"

/**
 * 游戏逻辑常用数据
 * 游戏逻辑常用接口
 */
export default class CommonData {

}
/**
 * 图集名字
 */
export const AtlasName = {

}
/**
 * AB包名字
 */
export const ABName = {
    CommonUse: 'CommonUse',
}
/**
 * 音效名字
 */
export const SourceName = {

}
/**
 * 预制体名字
 */
export const PrefabName = {

}
/**
 * 数字特殊符号
 */
export const NumberToStr = {
    '/': 'xg',
    '-': '-',
    '关': 'guan',
    '秒': 'miao',
    '第': 'di',
    '级': 'lv',
    '.': 'dian',
    '%': 'precentage',
    '伤': 'ms',
    '+': '+',
    ':': 'maohao',
    'x': 'x',
    '波': 'bo',
    'k': 'k',
    'm': 'm',
}
/**
 * 广告名字
 */
export const ADSName = {

}
/**
 * 场景信息
 */
export interface sceneData {
    /**
     * 场景存储路径
     */
    path: string,
    /**
     * 场景名字（标识）
     */
    name: string,
    /**
     * 场景对应类
     */
    component: any
}
/**
 * 事件信息
 */
export interface EventData {
    /**
     * 事件名字
     */
    eventName: string,
    /**
     * 事件函数
     */
    eventFunc: Function,
    /**
     * 是否调用一次后自动销毁事件
     */
    isOnce: boolean,
}
/**
 * update循环事件信息
 */
export interface CycEvent {
    /**
     * 事件名字（事件唯一标识）
     */
    cycName: string,
    /**
     * 事件（带参dt=>秒）
     */
    cycFunc: Function
}
/**
 * 计时器事件信息
 */
export interface TimerEvent {
    /**
     * 事件名字(事件唯一标识)
     */
    cycName: string,
    /**
     * 事件(带参dt=>秒)
     */
    cycFunc: Function,
}
/**
 * 寻找子物体信息（返回类型默认Node）
 */
export interface FindComponentData {
    /**
     * 父物体（从此开始循环寻找）
     */
    parent: Node,
    /**
     * 进行搜索的路径
     */
    path: string,
}
/**
 * 数字图集缓存
 */
export interface NumberAtlasCache {
    /**
     * 名字
     */
    name: string,
    /**
     * 图集
     */
    atlas: SpriteAtlas
}
/**
 * 用户登录信息
 */
export interface LoginInfo {
    /**
     * 用户openId
     */
    openId: string,
    /**
     * 用户uToken
     */
    uToken: string
}
/**
 * 获取指定用户的指定排行榜所需传递的参数
 */
export interface rankGetParams {
    /**从/login获取的登录串uToken */
    uToken: string,
    /**榜单类型 */
    rankType: string,
    /**指定用户的openid */
    getOpenId: string
}
/**友盟关卡中行为事件参数 */
export interface umaStageRunningparams {
    /**商品/道具名称 */
    itemName: string,
    /**商品/道具ID */
    itemId?: string,
    /**商品/道具数量 */
    itemCount?: string,
    /**商品/道具单价 */
    itemMoney?: string,
    /**描述 */
    desc?: string,
}