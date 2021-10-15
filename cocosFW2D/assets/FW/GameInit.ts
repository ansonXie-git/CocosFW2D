import Loading from '../Loading/Loading';
import banner from "./banner";
import { ADSName, ABName, PrefabName, AtlasName } from "./CommonData";
import GameData from './GameData';
import GameMgr from './GameMgr';
import PlatformManager from './PlatformManager';
import { Scene_Data } from "./SceneData";
import UIManager from './UIManager';
import BannerRule from './BannerRule';
import { SourceManager } from './SourceManager';
import { Component, director } from 'cc';

export default class GameInit extends Component {
    private loading_script: Loading | null = null
    public _GameInit() {
        // PlatformManager.UMASendEvent('_um.stage.01', '开始loading')
        this.loading_script = this.node.getComponent(Loading)!
        GameMgr.GameInit()
        this.LoadingAB_Res()
    }
    /**
    * 加载完成（loading界面调用）
    */
    public LoadFinish() {
        // director.loadScene('game', () => {
        //     UIManager.ShowPanel(Scene_Data.MainPanel.name)
        //     this.LoadADS()
        // })
    }
    /**
     * 加载广告
     */
    private LoadADS() {

    }
    /**
     * 读取本地数据并开始同步加载游戏资源
     */
    private async LoadingAB_Res(): Promise<void> {
        let data = GameData.LoadDataByLocalStorage()
        console.log("localStorage", data)
        if (data != null && data != '')
            GameData.SetData(data)
        await this.LoadAB_Res()
        director.preloadScene('game', async (err) => {
            if (err != null) {
                console.error(err)
                return
            }
            // await UIManager.OpenPanel(Scene_Data.MainPanel, false)
            this.loading_script!.SetJudgeFinishLoad = true
        })
    }
    /**
     * 加载AB包资源
     */
    private async LoadAB_Res() {
        this.ReLoadABPack_Res()
        await this.AwaitDownLoadAB()
        await this.AwaitLoadRes()
    }
    /**
     * 异步加载AB包
     */
    private ReLoadABPack_Res() {

    }
    /**
     * 同步加载AB包
     */
    private async AwaitDownLoadAB(): Promise<void> {

    }
    /**
     * 同步加载资源
     */
    private async AwaitLoadRes(): Promise<void> {

    }
}
