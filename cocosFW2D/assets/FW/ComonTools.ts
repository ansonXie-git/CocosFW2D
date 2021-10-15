import { Color, easing, find, instantiate, Label, misc, Node, Prefab, Sprite, SpriteAtlas, SpriteFrame, tween, UIOpacity, UITransform, v2, v3, Vec2, Vec3, Widget } from 'cc';
import { NumberToStr } from './CommonData';
import GameMgr from './GameMgr';
import PoolManager from './PoolManager';
/**
 * 脚本功能：通用方法类
 * 修改内容：
 *          7.2新增体力飞行动画方法；通用提示文字方法
 */
export default class ComonTools {
    public static gold_ani_index = 0
    /**
     * 根据坐标判断距离
     * @param origin 开始位置
     * @param target 结束位置
     * @param judge_dis 目标距离
     * @returns true为到达目标距离，false为未到达
     */
    public static JudgeDistance(origin: Vec2, target: Vec2, judge_dis: number): boolean;
    public static JudgeDistance(origin: Vec2, target: Vec2, judge_dis: Vec2): boolean;
    /**
     * 根据坐标判断距离
     * @param origin 开始位置
     * @param target 结束位置
     * @param judge_dis 目标距离
     * @returns true为到达目标距离，false为未到达
     */
    public static JudgeDistance(origin: number, target: number, judge_dis: number): boolean;
    /**
     * 根据坐标判断距离
     * @param origin 开始位置
     * @param target 结束位置
     * @returns 整数
     */
    public static JudgeDistance(origin: Vec2, target: Vec2): number;
    /**
     * 根据坐标判断距离
     * @param origin 开始位置
     * @param target 结束位置
     * @returns 整数
     */
    public static JudgeDistance(origin: number, target: number): number;
    public static JudgeDistance(originPos: Vec2 | number, targetPos: Vec2 | number, judge_dis?: Vec2 | number): boolean | number {
        if (typeof originPos === "object" && typeof targetPos === "object") {
            if (judge_dis != null) {
                const subPos = v2(originPos.x, originPos.y)
                let dis = subPos.subtract(targetPos).length()
                if (typeof judge_dis == 'object') {
                    return Math.abs(originPos.x - targetPos.x) <= judge_dis.x && Math.abs(originPos.y - targetPos.y) <= judge_dis.y
                } else {
                    return dis <= judge_dis
                }
            } else {
                const subPos = v2(originPos.x, originPos.y)
                return Math.round(subPos.subtract(targetPos).length())
            }
        } else if (typeof originPos === "number" && typeof targetPos === "number") {
            if (judge_dis != null) {
                let dis = Math.abs(originPos - targetPos)
                return dis <= judge_dis
            } else {
                return Math.abs(originPos - targetPos)
            }
        } else {
            return 0
        }
    }
    /**使用希尔算法重排序 */
    public static XierSort(arr: any[], event: Function): any[] {// parseInt(arr[j].y) > parseInt(arr[j - incre].y)
        for (let incre = arr.length / 2; incre > 0; incre /= 2) {
            incre = Math.floor(incre)
            for (let i = incre; i < arr.length; i++) {
                let j = i
                while (j - incre >= 0 && event(arr[j], arr[j - incre])) {
                    let temp = arr[j]
                    arr[j] = arr[j - incre]
                    arr[j - incre] = temp
                    j -= incre
                }
            }
        }
        return arr
    }
    /**
     * 目标移动到下一个地点
     * @param obj 目标
     * @param target 下一个地点
     */
    public static BulletTrace(obj: Vec2, target: Vec2, speed: number): Vec2 {
        const temp = v2(target.x, target.y)
        let delta = temp.subtract(obj)
        delta.x = delta.x / delta.length() * speed
        delta.y = delta.y / delta.length() * speed
        return delta
        // let deltaRotation = 90 - Math.atan2(x2 - obj.x, y2 - obj.y) * 180 / Math.PI
        // obj.angle = deltaRotation
        // obj.setPosition(x2, y2)
    }
    /**
     * 目标移动到下一个地点（带旋转）
     * @param obj 目标
     * @param target 下一个地点
     * @param speed 速度
     * @param isOpposite 是否相反（true：是的，false：不是）
     */
    public static BulletTraceWithRotation(obj: Node, target: Vec2, speed: number, isOpposite = false): void {
        const obj_v2 = obj.getPosition()
        const temp = v2(target.x, target.y)
        const delta = temp.subtract(v2(obj_v2.x, obj_v2.y))
        const x2 = obj_v2.x + delta.x / delta.length() * speed
        const y2 = obj_v2.y + delta.y / delta.length() * speed
        const deltaRotation = -(Math.atan2(x2 - obj_v2.x, y2 - obj_v2.y) * 180 / Math.PI)
        if (!isOpposite)
            obj.angle = deltaRotation + 90
        else
            obj.angle = deltaRotation - 90
        obj.setPosition(x2, y2)
    }
    /**
     * 获取两坐标间坐标
     * @param startPos 开始位置
     * @param endPos 结束位置
     */
    public static GetAngle(startPos: Vec2, endPos: Vec2): number {
        const temp = v2(endPos.x, endPos.y)
        let delta = temp.subtract(startPos)
        let x2 = delta.x / delta.length()
        let y2 = delta.y / delta.length()
        return -(Math.atan2(x2, y2) * 180 / Math.PI)
    }
    private static temp_load_item: Node = null
    /**
     * 加载时动画
     * @param parent 父物体
     */
    public static LoadingTips(): void {
        if (this.temp_load_item != null) return
        this.temp_load_item = instantiate(GameMgr.GetRes<Prefab>('load_item'))
        this.temp_load_item.active = true
        this.temp_load_item.parent = find('game_Canvas')
        this.temp_load_item.setPosition(Vec3.ZERO)
        this.temp_load_item.setSiblingIndex(this.temp_load_item.parent.children.length - 1)
        this.LoadAni(this.temp_load_item.getChildByName('load')!)
    }
    /**
     * 销毁加载动画
     */
    public static DestroyLoadItem() {
        GameMgr.CycleEventRemove('quanAni')
        if (this.temp_load_item == null) return
        this.temp_load_item.destroy()
        this.temp_load_item = null
    }
    /**
     * 加载动画
     * @param quan 动画主体
     */
    private static LoadAni(quan: Node): void {
        GameMgr.CycleEventPush({
            cycName: 'quanAni', cycFunc: (dt: number) => {
                quan.angle -= dt * 50
            }
        })
    }
    /**
     * 检测是否刘海
     * @param top 需要降低的对象
     */
    public static CheckBang(top: Node): void {
        console.log(window.screen.width / window.screen.height)
        if (window.screen.width / window.screen.height >= 2) {
            top.getComponent(Widget)!.left = 50
            top.setPosition(top.getPosition().x + 50, top.getPosition().y)
        }
    }
    /**
     * 用图片展示数字
     * @param number_str 需要显示的数字
     * @param atlasName 图集名字
     * @param parent 父物体
     * @param sprite_arr 对象集合
     * @param changeUnit 是否需要变更单位
     * @param needPoint 是否需要标点符号
     * @param precentageSize 图片大小尺寸
     */
    public static ShowNumber(number_str: string, atlasName: string, parent: Node, sprite_arr: Sprite[], changeUnit = true, needPoint = true, precentageSize = 1): Sprite[] {
        let code = 0, start = -1, newNum: string[] = []
        if (changeUnit) {
            for (let i = 0; i < number_str.length; i++) {
                code = number_str.charCodeAt(i)
                if (code > 57 || code < 48) {
                    // if (i != 0) {
                    let tempNum = parseInt(number_str.substring(start + 1, i - start))
                    if (!isNaN(tempNum))
                        newNum = newNum.concat(ComonTools.ChangeUnit(tempNum, needPoint))
                    newNum.push(NumberToStr[number_str[i]])
                    // } 
                    start = i
                } else if (i == number_str.length - 1) {
                    let tempNum = parseInt(number_str.substring(start + 1, i - start))
                    if (!isNaN(tempNum))
                        newNum = newNum.concat(ComonTools.ChangeUnit(tempNum, needPoint))
                }
            }
            if (newNum.length < 1)
                newNum = newNum.concat(ComonTools.ChangeUnit(parseInt(number_str), needPoint))
        } else {
            for (let i = 0; i < number_str.length; i++) {
                code = number_str.charCodeAt(i)
                if (code > 57 || code < 48) {
                    newNum.push(NumberToStr[number_str[i]])
                } else {
                    newNum.push(number_str[i])
                }
            }
        }
        let number_spriteFrame: SpriteFrame[] = []
        let atlas = GameMgr.GetRes<SpriteAtlas>(atlasName)!
        for (let i = 0; i < newNum.length; i++)
            number_spriteFrame.push(atlas.getSpriteFrame(newNum[i])!)
        return this.CreateSprite(number_spriteFrame, parent, sprite_arr, precentageSize)
    }
    /**
     * 创建精灵
     * @param number_spriteFrame 精灵图片集合
     * @param parent 父物体
     * @param sprite_arr 对象集合
     * @param precentageSize 图片大小比例
     */
    private static CreateSprite(number_spriteFrame: SpriteFrame[], parent: Node, sprite_arr: Sprite[], precentageSize: number): Sprite[] {
        let temp_sprite: Node
        if (sprite_arr.length < number_spriteFrame.length) {
            for (let i = sprite_arr.length; i < number_spriteFrame.length; i++) {
                temp_sprite = PoolManager.GetObj('number')!
                if (temp_sprite == null) {
                    temp_sprite = instantiate(GameMgr.GetRes<Prefab>('numberPrefab'))
                    sprite_arr[i] = temp_sprite.getComponent(Sprite)!
                } else {
                    sprite_arr[i] = temp_sprite.getComponent(Sprite)!
                }
            }
        } else if (sprite_arr.length > number_spriteFrame.length) {
            for (let i = sprite_arr.length - 1; i >= number_spriteFrame.length; i--) {
                PoolManager.PutObj('number', sprite_arr[i].node, () => {
                    sprite_arr[i].node.parent = null
                    sprite_arr[i].enabled = false
                })
                delete sprite_arr[i]
            }
            sprite_arr.length = number_spriteFrame.length
        }
        let front_arr = new Array<Sprite>()
        let back_arr = new Array<Sprite>()
        let middle_num = sprite_arr.length % 2 == 0 ? sprite_arr.length / 2 : Math.round(sprite_arr.length / 2) - 1
        for (let i = 0; i < sprite_arr.length; i++) {
            sprite_arr[i].spriteFrame = number_spriteFrame[i]
            sprite_arr[i].node.parent = parent
            const uiTransform = sprite_arr[i].node.getComponent(UITransform)!
            uiTransform.width = sprite_arr[i].spriteFrame!.width * precentageSize
            uiTransform.height = sprite_arr[i].spriteFrame!.height * precentageSize
            sprite_arr[i].node.setPosition(Vec3.ZERO)
            sprite_arr[i].enabled = true
            if (number_spriteFrame[i].name == 'dian') sprite_arr[i].node.getPosition().y = -(number_spriteFrame[i].height * precentageSize)
            if (sprite_arr.length % 2 == 0) {
                if (i < middle_num) front_arr.push(sprite_arr[i])
                else back_arr.push(sprite_arr[i])
            } else {
                if (i < middle_num) front_arr.push(sprite_arr[i])
                else if (i > middle_num) back_arr.push(sprite_arr[i])
                else sprite_arr[i].node.setPosition(Vec3.ZERO)
            }
        }
        const back_trans = back_arr[0].node.getComponent(UITransform)
        for (let i = front_arr.length - 1; i >= 0; i--) {
            const ui_trans = front_arr[i].node.getComponent(UITransform)
            const front_trans = front_arr[i + 1].node.getComponent(UITransform)
            if (sprite_arr.length % 2 == 0) {
                if (i == front_arr.length - 1)
                    front_arr[i].node.setPosition(-(ui_trans.width + back_trans.width) / 4, 0)
                else
                    front_arr[i].node.setPosition(front_arr[i + 1].node.getPosition().x - (front_trans.width / 2 + ui_trans.width / 2), 0)
            } else {
                if (i == front_arr.length - 1) {
                    const sprite_trans = sprite_arr[middle_num].node.getComponent(UITransform)
                    front_arr[i].node.setPosition(-(sprite_trans.width / 2 + ui_trans.width / 2), 0)
                }
                else
                    front_arr[i].node.setPosition(front_arr[i + 1].node.getPosition().x - (front_trans.width / 2 + ui_trans.width / 2), 0)
            }
        }
        const front_trans = front_arr[front_arr.length - 1].node.getComponent(UITransform)
        for (let i = 0; i < back_arr.length; i++) {
            const uitrans = back_arr[i].node.getComponent(UITransform)
            const back_trans = back_arr[i - 1].node.getComponent(UITransform)
            if (sprite_arr.length % 2 == 0) {
                if (i == 0)
                    back_arr[i].node.setPosition((front_trans.width + uitrans.width) / 4, 0)
                else
                    back_arr[i].node.setPosition(back_arr[i - 1].node.getPosition().x + (back_trans.width / 2 + uitrans.width / 2), 0)
            } else {
                if (i == 0) {
                    const sprite_trans = sprite_arr[middle_num].node.getComponent(UITransform)
                    back_arr[i].node.setPosition(sprite_trans.width / 2 + uitrans.width / 2, 0)
                }
                else
                    back_arr[i].node.setPosition(back_arr[i - 1].node.getPosition().x + (back_trans.width / 2 + uitrans.width / 2), 0)
            }
        }
        return sprite_arr
    }
    /**
     * 改变数字单位(数字加单位)
     * @param tempNum 数字
     * @param needPoint 是否需要分数
     * @param needChange 是否需要转字符
     */
    public static ChangeUnit(tempNum: number, needPoint: boolean, needChange = true): Array<string> {
        let str = '', str_arr: string[] = []
        if (tempNum >= 1000000) {
            if (needPoint) str = this.TransformUnit(Math.floor(tempNum))
            else str = Math.floor(tempNum / 1000) + 'm'
        } else if (tempNum >= 1000) {
            if (needPoint) str = this.TransformUnit(Math.floor(tempNum))
            else str = Math.floor(tempNum / 1000) + 'k'
        } else {
            str = tempNum.toString()
        }
        if (!needChange) {//不需要转字符
            for (let i = 0; i < str.length; i++)
                str_arr.push(str[i])
            return str_arr
        }
        for (let i = 0; i < str.length; i++) {
            str_arr.push(str[i])
            if (str_arr[i] == '.')
                str_arr[i] = NumberToStr['.']
        }
        return str_arr
    }
    /**
     * 更换单位
     * @param tempNum 需要转单位得数字
     */
    private static TransformUnit(tempNum: number): string {
        let return_str = ''
        let temp_str = tempNum.toString()//转为字符
        let temp_unit = ['k', 'm', 'g', 'b', 't']//单位数组
        let unit_index = Math.floor((temp_str.length + 1) / 4) - 1//获取单位下标
        let integerLength = (temp_str.length - 1) % 3 + 1//获取整数长度
        if (integerLength == 1) {
            return_str = temp_str[0] + '.' + temp_str[1] + temp_unit[unit_index]
        } else if (integerLength == 2) {
            return_str = temp_str[0] + temp_str[1] + '.' + temp_str[2] + temp_unit[unit_index]
        } else {
            return_str = temp_str[0] + temp_str[1] + temp_str[2] + temp_unit[unit_index]
        }
        return return_str
    }
    /**
     * 更新倒计时显示
     * @param time 时间
     */
    public static UpdateCountDownLabel(time: number) {
        if (time < 0) {
            return '00:00'
        }
        let min = 0, second = 0, min_str = '00', second_str = '00'
        if (time >= 60) {
            min = Math.floor(time / 60)
            second = time % 60
            if (min >= 10)
                min_str = min + ''
            else
                min_str = '0' + min
        } else {
            second = time
        }
        if (second >= 10) second_str = second + ''
        else second_str = '0' + second
        return min_str + ':' + second_str
    }
    /**
     * 检测地图移动是否超越边界
     * @param min 最小值
     * @param max 最大值
     * @param dis 移动距离
     * @param now 现在的坐标
     * @returns 应该移动的距离
     */
    public static CheckMapMove(min: number, max: number, dis: number, now: number): number {
        if (dis == 0) return 0
        let move_dis = 0
        if (dis < 0) {
            if (now + dis < min)
                move_dis = min - now
            else
                move_dis = dis
        } else {
            if (now + dis > max)
                move_dis = max - now
            else
                move_dis = dis
        }
        return move_dis
    }
    /**
     * 检查是否超越边界
     * @param dis 距离
     * @param arr 数组
     * @param right_level 最右等级上限
     * @param left_level 最左等级下线
     * @param maxLevel 最高等级
     * @param minLevel 最低等级
     */
    public static CheckLittlePanelMove(dis: number, arr: Array<Node>, right_level: number, left_level: number, maxLevel: number, minLevel: number) {
        if (dis < 0) {
            if (right_level >= maxLevel) {
                let check_x = arr[ComonTools.GetNearIndex(true, arr)].getPosition().x
                dis = check_x - dis > 228 ? 228 - check_x : dis
            }
        } else {
            if (left_level <= minLevel) {
                let check_x = arr[ComonTools.GetNearIndex(false, arr)].getPosition().x
                dis = check_x + dis > -228 ? -228 - check_x : dis
            }
        }
        return dis
    }
    /**
     * 获取最靠边缘的对象下标
     * @param left_right 是否向左移（true：左移，false：右移）
     * @param arr 数组
     */
    public static GetNearIndex(left_right: boolean, arr: Array<Node>): number {
        let x = left_right ? 228 : -228, index = 0, min = 228
        for (let i = 0; i < arr.length; i++) {
            let temp_min = Math.abs(arr[i].getPosition().x - x)
            if (temp_min < min) {
                min = temp_min
                index = i
            }
        }
        return index
    }
    /**
     * 回弹
     * @param arr 数组
     * @param callBack 回调
     */
    public static BackPos(arr: Array<Node>, callBack: Function) {
        let backPos: number[] = new Array<number>()
        for (let i = 0; i < arr.length; i++) {//228
            if (arr[i].getPosition().x >= -114 && arr[i].getPosition().x <= 114) {
                backPos.push(0)
            } else if (arr[i].getPosition().x >= -342 && arr[i].getPosition().x < -114) {
                backPos.push(-228)
            } else if (arr[i].getPosition().x < -342) {
                backPos.push(-456)
            } else if (arr[i].getPosition().x > 114 && arr[i].getPosition().x <= 342) {
                backPos.push(228)
            } else {
                backPos.push(456)
            }
        }
        for (let i = 0; i < arr.length; i++) {
            const pos = arr[i].getPosition()
            tween(arr[i])
                .to(0.2, { position: v3(pos.x, backPos[i], pos.z) })
                .call(() => {
                    if (i == 0) {
                        callBack()
                    }
                })
                .start()
        }
    }
    /**
     * 文字动画
     * @param num 变化数字
     * @param originNum 原数字
     * @param label 显示物体
     * @param changeCount 变化次数
     */
    public static LabelAni(num: number, originNum: number, label: Label, changeCount: number, updateCallback?: Function, callback?: Function) {
        const change = Math.ceil(num / changeCount)
        const temp_gold = originNum
        let index = 0
        // let countDown = 0.05
        GameMgr.CycleEventPush({
            cycName: 'GoldAni', cycFunc: (dt: number) => {
                // if (countDown > 0) {
                //     countDown -= dt
                //     return
                // }
                // countDown = 0.05
                label.string = (temp_gold + change * index) + ''
                index += 1
                if (updateCallback != null) updateCallback(changeCount)
                if (index >= changeCount) {
                    label.string = num + ''
                    GameMgr.CycleEventRemove('GoldAni')
                    if (callback != null) callback()
                }
            }
        })
    }
    /**
     * 获取游戏整体速度(原速度*整体速度变量)
     * @param originSpeed 原速度、原计时
     * @returns 
     */
    public static GetGameSpeed(originSpeed: number) {
        return originSpeed * GameMgr.gameSpeed
    }
    /**
     * 更新游戏整体速度变量
     * @param speed 游戏速度
     */
    public static SetGameSpeed(speed: number) {
        GameMgr.gameSpeed = speed
    }
    /**
     * 判断是否暂停了游戏
     * @returns 
     */
    public static JudgeGamePause() {
        return GameMgr.gameSpeed == 0
    }
    /**
     * 改变分数展示格式(会计计数方法)
     */
    public static ChangeUnit_Account(num: number): string {
        const score_str = num + ""
        let label_str = '', index = score_str.length - 1
        for (let i = 0; i < score_str.length; i++) {
            label_str += score_str[i]
            index -= 1
            if ((index + 1) % 3 == 0 && i != score_str.length - 1) label_str += ','
        }
        return label_str
    }
    /**
     * 体力标志飞往点击按钮处动画
     * @param startPos 开始位置
     * @param endPos 结束位置
     * @param time 动画时间
     * @param parent 父物体
     * @param callback 回调
     */
    public static PowerFlyButtonAni(startPos: Vec3, endPos: Vec2, time: number, parent: Node, callback: Function) {
        const power = new Node('power_item').addComponent(Sprite)
        power.node.setParent(parent)
        power.node.setPosition(startPos)
        power.spriteFrame = GameMgr.GetRes<SpriteFrame>('heart')
        power.node.setSiblingIndex(power.node.getParent().children.length - 1)
        const opacity = tween(power.getComponent(UIOpacity))
            .to(0.5, { opacity: 0 })
        tween(power.node)
            .to(time, { position: v3(endPos.x, endPos.y) }, { easing: easing.quadOut })
            .call(callback)
            .call(() => {
                this.PowerAni(power.node, () => {
                    power.node.destroy()
                })
            })
            .start()
    }
    private static PowerAni(power: Node, callback: Function) {
        tween(power)
            .to(0.5, { scale: v3(2, 2, 2) })
            .start()
        tween(power.getComponent(UIOpacity))
            .to(0.5, { opacity: 0 })
            .call(callback)
            .start()
    }
    private static tip_label: Label = null
    /**
     * 提示出现
     * @param parent 父物体
     * @param str 文字内容
     */
    public static TipShow(parent: Node, str: string) {
        if (this.tip_label != null) return
        this.tip_label = new Node('tip_label').addComponent(Label)
        this.tip_label.node.setPosition(Vec3.ZERO)
        this.tip_label.node.setParent(parent)
        this.tip_label.node.setSiblingIndex(this.tip_label.node.parent.children.length)
        this.tip_label.color = Color.RED
        this.tip_label.string = str
        const s = setTimeout(() => {
            clearTimeout(s)
            if (this.tip_label == null) return
            this.tip_label.string = ''
            this.tip_label.node.setParent(null)
            this.tip_label.node.destroy()
            this.tip_label = null
        }, 1500);
    }
    /**
     * 围绕旋转后的位置
     * @param obj 中心点
     * @param angle 旋转角度
     * @param width 横坐标偏移
     * @param height 纵坐标偏移
     */
    public static GetRoundMovePos(obj: Vec2, angle: number, width: number, height: number) {
        const radio = misc.degreesToRadians(angle)
        const x = width * Math.cos(radio) + obj.x
        const y = height * Math.sin(radio) + obj.y
        return v2(x, y)
    }
}
