import { assetManager, Component, game, Node, Sprite, _decorator } from "cc"
const { ccclass, property } = _decorator;

@ccclass('Loading')
export default class Loading extends Component {
    @property(Sprite)
    public bar: Sprite = null
    private judgeFinishLoad: boolean = false
    private loadSpeed: number = 0.2
    private ani_index = 0
    private ani_time = 0.2
    onLoad(): void {
        this.judgeFinishLoad = false
        this.loadSpeed = 0.2
        // PlatformManager.LogIn((res: any) => {
        //     if (res != null) {
        //         //console.log(res)
        //     }
        // })
        let s = setTimeout(() => {
            clearTimeout(s)
            this.StartLoadABPack()
        }, 0);
    }
    /**
     * 开始进度条动画
     */
    private StartLoadABPack() {
        this.LoadFW(() => {
            let gameM = new Node('GameMgr')!.addComponent('GameMgr')
            game.addPersistRootNode(gameM.node);
            (this.node.addComponent("GameInit") as any)._GameInit()
        })
    }
    /**
     * 加载框架与代码
     */
    private LoadFW(callback: Function) {
        assetManager.loadBundle('FW', null, (err, fw) => {//加载框架
            if (err != null) {
                console.log(err)
                return null
            }
            assetManager.loadBundle('Script', null, (err, script) => {//加载业务代码
                if (err != null) {
                    console.log(err)
                    return null
                }
                callback()
            })
        })
    }
    update(dt: number) {
        if (this.bar!.fillRange < 1) {
            if (this.bar!.fillRange < 0.6)
                this.loadSpeed = 0.2
            else if (this.bar!.fillRange < 0.7)
                this.loadSpeed = 0.1
            else if (this.bar!.fillRange < 0.9)
                this.loadSpeed = 0.05
            this.bar!.fillRange += this.loadSpeed * dt
        }
        if (this.judgeFinishLoad) {
            (this.node.getComponent('GameInit') as any).LoadFinish()
            this.judgeFinishLoad = false
        }
        if (this.ani_time > 0) {
            this.ani_time -= dt
            return
        }
        this.ani_time = 0.2
    }
    /**
     * 更新判断是否加载完成
     */
    public set SetJudgeFinishLoad(judge: boolean) {
        this.judgeFinishLoad = judge
    }
}