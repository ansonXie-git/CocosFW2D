

import GameMgr from './GameMgr';
import { ABName, SourceName } from './CommonData';
import GameData from './GameData';
import { AudioClip, AudioSource, Component, _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SourceManager')
export class SourceManager extends Component {
    private allAudioClip: AudioClip[]
    private allSource: AudioSource[]
    /**
     * 数据初始化
     */
    public async SourceMan_Init(): Promise<void> {
        this.allSource = new Array<AudioSource>()
        this.allAudioClip = new Array<AudioClip>()
        // const allClip:  AudioClip[] = await GameMgr.ResLoadDir('UI_voice', '',  AudioClip)
        // for (let i = 0; i < allClip.length; i++)
        //     this.allAudioClip.push(allClip[i])
        // GameMgr.RemoveABPack('UI_voice')
        // allClip.splice(0, allClip.length)
    }
    // /**
    //  * 设置BGM音量
    //  */
    // public static SetBGMValue(volume: number) {
    //     audioEngine.setMusicVolume(volume)
    // }
    // /**
    //  * 设置音效音量
    //  */
    // public static SetSoundValue(volume: number) {
    //     audioEngine.setEffectsVolume(volume)
    // }
    // /**
    //  * 播放BGM
    //  * @param clipName 音效名字
    //  * @param loop 是否循环
    //  */
    // public static PlayBGM(clipName: string, loop = true): void {
    //     const judgeMusic = GameData.GetSingleData('jdugeMusic') as number
    //     if (judgeMusic == 0) return
    //     for (let i = 0; i < this.allBGM.length; i++) {
    //         if (clipName == this.allBGM[i].name) {
    //             audioEngine.playMusic(this.allBGM[i], loop)
    //             return
    //         }
    //     }
    // }
    // /**
    //  * 停止播放BGM
    //  */
    // public static StopBGm() {
    //     audioEngine.stopMusic()
    // }
    // /**
    //  * 播放音效
    //  * @param clipName 音效名字
    //  * @param loop 是否循环
    //  */
    // public static PlaySource(clipName: string, loop = false) {
    //     const judgeMusic = GameData.GetSingleData('jdugeMusic') as number
    //     if (judgeMusic == 0) return null
    //     for (let i = 0; i < this.allAudioClip.length; i++) {
    //         if (clipName == this.allAudioClip[i].name) {
    //             const num = audioEngine.playEffect(this.allAudioClip[i], loop)
    //             return num
    //         }
    //     }
    //     return null
    // }
    // /**
    //  * 停止播放指定音效
    //  * @param sourceIndex 音乐下标
    //  */
    // public static StopSource(sourceIndex: number) {
    //     audioEngine.stopEffect(sourceIndex)
    // }
    // /**
    //  * 停止所有音效
    //  */
    // public static StopAllSouces() {
    //     audioEngine.stopAllEffects()
    // }
    /**
     * 音效播放
     * @param source_name 音效名字
     * @param isLoop 是否循环
     */
    public SourcePlay(source_name: string) {
        let play_audio: AudioClip | null = this.GetClip(source_name)
        if (play_audio == null) return
        for (let i = 0; i < this.allSource.length; i++) {
            if (!this.allSource[i].playing) {
                this.allSource[i].clip = play_audio
                this.allSource[i].play()
                return
            }
        }
        this.allSource.push(this.node.addComponent(AudioSource))
        this.allSource[this.allSource.length - 1].play()
    }
    /**
     * 获取需要播放的音效
     * @param source_name 音效名字
     * @returns 
     */
    private GetClip(source_name: string): AudioClip | null {
        let clip: AudioClip | null = null
        for (let i = 0; i < this.allAudioClip.length; i++) {
            if (source_name == this.allAudioClip[i].name) {
                clip = this.allAudioClip[i]
                break
            }
        }
        return clip
    }
    /**
     * 停止所有音效播放
     */
    public StopAllSource() {
        for (let i = 0; i < this.allSource.length; i++) {
            if (this.allSource[i].playing) this.allSource[i].stop()
        }
    }
}
