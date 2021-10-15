/**
 * 微信预加载banner
 */

import { sys } from 'cc';
import PlatformManager from './PlatformManager';
export const WXBannerID = {

}

export default class banner {
    private static banner: any
    private static banner_num: number
    private static bannerID_arr: Array<string>
    private static banner_err: number = 0
    public static adInit() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            this.banner_num = 0
            this.bannerID_arr = new Array<string>()
            Object.keys(WXBannerID).forEach((key) => { this.bannerID_arr.push(WXBannerID[key]) })
            this.banner = PlatformManager.CreateBanner(this.bannerID_arr[this.banner_num], (res: any) => {
                console.log(res);
            }, () => {

            })
        }
    }
    private static reCreate = 0
    public static bannerCreate() {
        if (this.banner_num < this.bannerID_arr.length) {
            this.banner_num += 1
        } else {
            this.banner_num = 0
        }
        this.banner = PlatformManager.CreateBanner(this.bannerID_arr[this.banner_num], (res) => {
            if (res.errCode == 1004) {
                if (this.reCreate == 1) {
                    this.reCreate = 0
                    return
                } else {
                    this.reCreate = 1
                    this.bannerCreate()
                    return
                }
            }
        }, () => {

        })
    }
    /**展示banner */
    public static bannerShow() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            console.log('show', this.banner)
            if (this.banner) {
                this.banner.show()
            } else {
                console.log('banner is null');
                this.bannerCreate()
                this.banner.show()
            }
        }
    }
    public static bannerDestroy() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            console.log('destroy', this.banner)
            if (this.banner) {
                this.banner.destroy()
                this.bannerCreate()
            } else {
                this.bannerCreate()
            }
        }
    }
    public static bannerHide() {
        if (sys.platform == sys.Platform.WECHAT_GAME) {
            console.log('hide', this.banner)
            if (this.banner) {
                this.banner.hide()
            } else {
                this.bannerCreate()
            }
        }
    }
}