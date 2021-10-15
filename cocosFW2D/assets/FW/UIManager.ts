
import GameMgr from './GameMgr';
import UIParent from './UIParent';
import { sceneData } from './CommonData';
import { find, instantiate, Node, Prefab } from 'cc';

export default class UIManager {
    private static allScene: { string: UIParent }
    private static sceneParent: Node
    /**
     * 初始化管理器
     */
    public static Init(): void {
        UIManager.allScene = new Object() as { string: UIParent }
    }
    /**
     * 显示已加载的画面，未加载的场景会返回空
     * @param name 场景名字
     * @param callback 成功打开场景后回调
     * @param panelData 打开场景参数
     */
    public static async ShowPanel(name: string, callback?: Function, ...panelData: any): Promise<void> {
        let tempScene: UIParent = UIManager.allScene[name]
        if (tempScene == null) {
            console.error('scene is null,check the name!!!!!!!!!!!!!!!!!!' + name)
            return
        }
        if (this.sceneParent == null)
            this.sceneParent = find('game_Canvas')!
        tempScene.node.parent = this.sceneParent
        tempScene.node.name = name
        await tempScene.PanelInit(...panelData)
        tempScene.node.active = true
        if (callback != null)
            callback()
        tempScene.OpenAni()
    }
    /**
     * 打开界面，首次打开调用Init方法，往后调用Reset方法
     * @param isShow 是否显示画面，默认为true，当需要暂缓展示，则可以设置为false
     * @param sceneData 场景常用信息
     * @param callback 回调
     * @param panelData 回调参数 
     */
    public static async OpenPanel(sceneData: sceneData, isShow = true, callback?: Function, ...panelData: any): Promise<void> {
        if (UIManager.allScene[sceneData.name] == null) {
            let canvas = await GameMgr.ResLoadByAB(sceneData.name, sceneData.path, Prefab)
            let UIPrefab = instantiate(canvas)
            let UIComponent: UIParent = UIPrefab.getComponent(sceneData.component)
            if (UIComponent == null) {
                UIComponent = UIPrefab.addComponent(sceneData.component)
            }
            UIManager.allScene[sceneData.name] = UIComponent
            if (isShow)
                UIManager.ShowPanel(sceneData.name, callback, panelData)
            else {
                if (callback != null) callback()
            }
        } else {
            UIManager.ResetPanel(sceneData, callback, panelData)
        }
    }
    /**
     * 重置界面，调用Reset方法
     * @param sceneData 场景常用信息
     * @param callback 回调
     * @param panelData 回调参数
     */
    public static async ResetPanel(sceneData: sceneData, callback?: Function, ...panelData: any): Promise<void> {
        await UIManager.allScene[sceneData.name].PanelReset(...panelData)
        if (callback != null) callback()
        UIManager.allScene[sceneData.name].OpenAni()
    }
    /**
     * 关闭界面，调用close方法
     * @param sceneData 场景常用信息
     * @param callback 回调
     */
    public static async ClosePanel(sceneData: sceneData, callback: Function | null): Promise<void> {
        UIManager.allScene[sceneData.name].CloseAni(async () => {
            await UIManager.allScene[sceneData.name].PanelClose(callback)
        })
    }
    /**
     * 通过场景名字获取场景对象
     * @param sceneName 场景名字
     */
    public static GetSceneComponent<T>(sceneName: string): T | null {
        if (UIManager.allScene[sceneName] == null) {
            // console.error('scene is not creat,please check the name!!' + sceneName)
            return null
        }
        return UIManager.allScene[sceneName]
    }
}
