import { _decorator, Component, view, ResolutionPolicy, UITransform } from 'cc';

const { ccclass } = _decorator;

@ccclass
export class Screem extends Component {
    /**判断是否横屏游戏 */
    private judge_Landscape = false
    onLoad() {
        const size = view.getFrameSize();
        let h = 750 * size.height / size.width;
        if (this.judge_Landscape) {
            view.setDesignResolutionSize(h, 750, ResolutionPolicy.FIXED_WIDTH)
            this.node.getComponent(UITransform).setContentSize(h, 750);
        } else {
            view.setDesignResolutionSize(750, h, ResolutionPolicy.FIXED_HEIGHT)
            this.node.getComponent(UITransform).setContentSize(750, h);
        }
    }
}
