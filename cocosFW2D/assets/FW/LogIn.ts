
import { LoginInfo } from './CommonData';
import GameData from './GameData';
import GameMgr from './GameMgr';
import PlatformManager from './PlatformManager';

export default class LogIn {
    /**
     * 用户登录（有服务器的登录）
     * @param callback 回调
     */
    public static UserLogin(callback: Function): any {
        PlatformManager.LogIn(res => {
            PlatformManager.Request('POST', 'login', {
                appId: 'wx2f2784eafbaf7398',
                jsCode: res
            }, (res) => {
                console.log('request', res);
                if (res.data.data) {
                    let data: LoginInfo = res.data.data
                    GameData.SetUserLoginInfo(data.openId, data.uToken)
                    GameData.SaveUserIDByLocalStorage()
                    callback()
                }
            })
        })
    }
    /**
     * 上传用户信息到服务器
     */
    public static SetUserInfoToServer(name: string, url: string) {
        PlatformManager.Request('POST', 'saveUserInfo', {
            uToken: GameData.GetUserLoginInfo().uToken,
            nickname: name,
            avatarUrl: url
        }, (res) => {
            console.log('保存用户头像与昵称', res)
        })
    }
}

