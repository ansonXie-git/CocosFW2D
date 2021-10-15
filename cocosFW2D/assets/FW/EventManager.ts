/**
 * 事件管理类
 * 通过本管理类，实现函数通过事件的方式，传递到其他类中进行调用，尽可能实现类与类之间的解耦。
 */

import { EventData } from "./CommonData"


export default class EventManager {
    private static eventDic: Array<EventData> = new Array<EventData>()
    private static TempDataAgent_arr: { name: string, data: any } = new Object() as { name: string, data: any }
    /**
     * 事件插入
     * @param eventData 事件信息接口
     */
    public static EventPush(eventData: EventData): void {
        if (this.eventDic.length == 0) {
            this.eventDic.push(eventData)
            return
        }
        for (let i = 0; i < this.eventDic.length; i++) {
            if (this.eventDic[i].eventName == eventData.eventName) {
                this.eventDic[i] = eventData
                return
            }
        }
        this.eventDic.push(eventData)
    }
    /**
     * 事件运行
     * @param eventName 事件对应名字
     * @param eventPara 事件参数传递(不提示错误，由用户自我检测参数传递)
     */
    public static EventPlay(eventName: string, ...eventPara: any): void {
        for (let i = 0; i < this.eventDic.length; i++) {
            if (this.eventDic[i].eventName == eventName) {
                this.eventDic[i].eventFunc(...eventPara)
                if (this.eventDic[i] != null && this.eventDic[i].isOnce)
                    this.eventDic.splice(i, 1)
                break
            }
        }
    }
    /**
     * 事件移除
     * @param eventName 事件对应名字
     */
    public static EventRemove(eventName: string): void {
        for (let i = 0; i < this.eventDic.length; i++) {
            if (this.eventDic[i].eventName == eventName) {
                this.eventDic.splice(i, 1)
                return
            }
        }
    }
    /**
     * 查询是否有此事件
     * @param eventName 事件对应名字
     */
    public static ContainEvent(eventName: string): boolean {
        for (let i = 0; i < this.eventDic.length; i++)
            if (this.eventDic[i].eventName == eventName)
                return true
        return false
    }
    /**
     * 写入中介数据（名字重复会覆盖前面的数据）
     * @param name 中介数据缓存名字
     * @param data 中介数据
     */
    public static Array_AgentDataWrite(name: string, data: any): void {
        this.TempDataAgent_arr[name] = data
    }
    /**
     * 读取中介数据
     * @param name 中介数据缓存名字
     */
    public static Array_AgentDataRead(name: string): any {
        if (this.TempDataAgent_arr[name] == null) {
            console.error('data is null,please write data into agent first!!!' + name)
            return
        }
        let data = new Object() as { name: string, data: any }
        data.name = name
        data.data = this.TempDataAgent_arr[name]
        this.TempDataAgent_arr[name] = null
        return data.data
    }
}
