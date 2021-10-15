import { _decorator, Component } from 'cc';
import EventManager from './EventManager';
const { ccclass, property } = _decorator;

@ccclass('UIParent')
export default abstract class UIParent extends Component {
    /**
     * 窗口第一次打开，可调用父类方法（OpenAniBind）进行打开界面动画绑定，可绑定（PanelShow）进行界面渲染自动最前
     * @param zIndex 渲染顺序
     * @param panelData 界面所需数据
     */
    abstract PanelInit(...panelData: any): Promise<void>
    /**
     * 窗口重复打开，可绑定（PanelShow）进行界面渲染自动最前
     * @param zIndex 渲染顺序
     * @param panelData 界面所需数据
     */
    abstract PanelReset(...panelData: any): Promise<void>
    /**
     * 窗口关闭，可绑定（PanelHide）进行界面渲染自动放最后
     * @param callback 回调
     */
    abstract PanelClose(callback: Function): Promise<void>
    /**
     * 打开界面动画
     */
    abstract OpenAni(): void
    /**
     * 关闭界面动画
     * @param callback 回调
     */
    abstract CloseAni(callback: Function): void
    /**
     * 绑定动画
     * @param name 界面名字
     */
    OpenAniBind(name: string) {
        EventManager.EventPush({ eventName: name + 'openAni', eventFunc: () => { this.OpenAni() }, isOnce: false })
    }
    /**
     * 界面展示
     */
    PanelShow() {
        this.node.setSiblingIndex(this.node.parent.children.length - 1)
        this.node.active = true
    }
    /**
     * 界面隐藏
     */
    PanelHide(callback: Function) {
        if (callback != null) callback()
        this.node.setSiblingIndex(0)
        this.node.active = false
    }
}
