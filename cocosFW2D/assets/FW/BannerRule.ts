import PlatformManager from './PlatformManager';
/**
 * 脚本功能：
 * 修改内容：
 * 修改时间：
 */
export default class BannerRule {
    private static banner1_id = 'adunit-00bebbfa451d8380'
    private static banner2_id = 'adunit-007744e4b0ae95c9'
    private static banner3_id = 'adunit-2fa731377896be1b'
    private static banner4_id = 'adunit-8c6fc809481d3e33'
    private static banner5_id = 'adunit-06511d0c0c486003'
    private static banner6_id = 'adunit-3ba07c71a19750a0'
    private static banner_1: any = null
    private static banner_2: any = null
    private static banner_3: any = null
    private static banner_4: any = null
    private static banner_5: any = null
    private static banner_6: any = null
    // private static banner_4_id: number = 1
    public static banner_index: number = 0
    public static judgeBannerShow: boolean = true
    private static judgeBanner6Show: boolean = false
    /**
     * banner广告预加载
     */
    public static BannerPreLoad() {
        this.banner_6 = PlatformManager.CreateBanner(this.banner6_id, () => {
            console.log('banner6预加载成功')
        }, () => {
            this.banner_6 = null
            console.log('banner6预加载失败')
        })
        setTimeout(() => {
            this.banner_1 = PlatformManager.CreateBanner(this.banner1_id, () => {
                console.log('banner1预加载成功')
            }, () => {
                this.banner_1 = null
                console.log('banner1预加载失败')
            })
        }, 100);
        setTimeout(() => {
            this.banner_2 = PlatformManager.CreateBanner(this.banner2_id, () => {
                console.log('banner2预加载成功')
            }, () => {
                this.banner_2 = null
                console.log('banner2预加载失败')
            })
        }, 250);
    }
    /**
     * banner广告后加载
     */
    public static BannerPreLoadAfter() {
        setTimeout(() => {
            this.banner_3 = PlatformManager.CreateBanner(this.banner3_id, () => {
                console.log('banner3预加载成功')
            }, () => {
                this.banner_3 = null
                console.log('banner3预加载失败')
            })
        }, 100);
        setTimeout(() => {
            this.banner_4 = PlatformManager.CreateBanner(this.banner4_id, () => {
                console.log('banner4预加载成功')
            }, () => {
                this.banner_4 = null
                console.log('banner4预加载失败')
            })
        }, 250);
        setTimeout(() => {
            this.banner_5 = PlatformManager.CreateBanner(this.banner5_id, () => {
                console.log('banner5预加载成功')
            }, () => {
                this.banner_5 = null
                console.log('banner5预加载失败')
            })
        }, 500);
    }
    /**
     * 展示banner6
     */
    public static ShowBanner6() {
        if (this.judgeBanner6Show) {
            console.log('banner6已经在展示中，不可重复展示')
            return
        }
        if (this.banner_6 != null) {//banner6不为空，则展示
            PlatformManager.ADSShow('banner', this.banner_6)
            this.banner_index = 6
            this.judgeBanner6Show = true
            console.log('展示banner6广告')
        } else {
            console.warn('banner6为空，不展示banner6广告')
            // this.banner_6 = PlatformManager.CreateBanner(this.banner6_id, () => {
            //     console.log('banner6重新加载成功')
            //     PlatformManager.ADSShow('banner', this.banner_6)
            //     this.banner_index = 6
            //     this.judgeBanner6Show = true
            // }, () => {
            //     console.error('banner6重新加载失败')
            //     this.banner_6 = null
            // })
        }
    }
    /**
     * 隐藏banner6
     */
    public static HidBanner6() {
        if (this.judgeBanner6Show) {
            PlatformManager.ADSHide('banner', this.banner_6)
            this.judgeBanner6Show = false
        }
    }
    /**
     * 创建banner，并隐藏另外一个banner
     * @param index 下标
     */
    public static BannerShow(index: number) {
        this.judgeBannerShow = true
        if (index == 1) {
            if (this.banner_1 == null) {
                this.banner_1 = PlatformManager.CreateBanner(this.banner1_id, () => {
                    console.log('目前播放banner1')
                    PlatformManager.ADSShow('banner', this.banner_1)
                    this.banner_index = 1
                    // PlatformManager.ADSHide('banner', this.banner_2)
                    this.HidBanner6()
                }, () => {
                    console.log('banner1加载失败')
                    // PlatformManager.ADSHide('banner', this.banner_2)
                    this.banner_1 = null
                    this.ShowBanner6()
                })
            } else {
                this.banner_index = 1
                PlatformManager.ADSShow('banner', this.banner_1)
                // PlatformManager.ADSHide('banner', this.banner_2)
                this.HidBanner6()
            }
        } else if (index == 2) {
            if (this.banner_2 == null) {
                this.banner_2 = PlatformManager.CreateBanner(this.banner2_id, () => {
                    console.log('目前播放banner2')
                    PlatformManager.ADSShow('banner', this.banner_2)
                    this.banner_index = 2
                    // PlatformManager.ADSHide('banner', this.banner_1)
                    this.HidBanner6()
                }, () => {
                    console.log('banner2加载失败')
                    // PlatformManager.ADSHide('banner', this.banner_1)
                    this.banner_2 = null
                    this.ShowBanner6()
                })
            } else {
                PlatformManager.ADSShow('banner', this.banner_2)
                this.banner_index = 2
                // PlatformManager.ADSHide('banner', this.banner_1)
                this.HidBanner6()
            }
        } else if (index == 3) {
            if (this.banner_3 == null) {
                this.banner_3 = PlatformManager.CreateBanner(this.banner3_id, () => {
                    console.log('目前播放banner3')
                    PlatformManager.ADSShow('banner', this.banner_3)
                    this.banner_index = 3
                    // PlatformManager.ADSHide('banner', this.banner_5)
                    this.HidBanner6()
                }, () => {
                    console.log('banner3加载失败')
                    // PlatformManager.ADSHide('banner', this.banner_5)
                    this.banner_3 = null
                    this.ShowBanner6()
                })
            } else {
                PlatformManager.ADSShow('banner', this.banner_3)
                this.banner_index = 3
                // PlatformManager.ADSHide('banner', this.banner_5)
                this.HidBanner6()
            }
        } else if (index == 4) {
            if (this.banner_4 == null) {
                this.banner_4 = PlatformManager.CreateBanner(this.banner4_id, () => {
                    console.log('目前播放banner4')
                    PlatformManager.ADSShow('banner', this.banner_4)
                    this.banner_index = 4
                    // PlatformManager.ADSHide('banner', this.banner_5)
                    this.HidBanner6()
                }, () => {
                    console.log('banner4加载失败')
                    // PlatformManager.ADSHide('banner', this.banner_5)
                    this.banner_4 = null
                    this.ShowBanner6()
                })
            } else {
                PlatformManager.ADSShow('banner', this.banner_4)
                this.banner_index = 4
                // PlatformManager.ADSHide('banner', this.banner_5)
                this.HidBanner6()
            }
        } else if (index == 5) {
            // if (this.banner_5 == null) {
            //     this.banner_5 = PlatformManager.CreateBanner(this.banner5_id, () => {
            //         console.log('目前播放banner5')
            //         PlatformManager.ADSShow('banner', this.banner_5)
            //         this.banner_index = 5
            //         // PlatformManager.ADSHide('banner', this.banner_4)
            //         this.HidBanner6()
            //     }, () => {
            //         console.log('banner5加载失败')
            //         // PlatformManager.ADSHide('banner', this.banner_4)
            //         this.banner_5 = null
            //         this.ShowBanner6()
            //     })
            // } else {
            //     PlatformManager.ADSShow('banner', this.banner_5)
            //     this.banner_index = 5
            //     // PlatformManager.ADSHide('banner', this.banner_4)
            //     this.HidBanner6()
            // }
        }
    }
    /**
     * 销毁banner
     */
    public static BannerDestroy() {
        this.judgeBannerShow = false
        switch (this.banner_index) {
            case 1:
                PlatformManager.ADSDestroy('banner', this.banner_1)
                this.banner_1 = null
                console.log('销毁banner1')
                // if (this.banner_2 != null) {
                //     PlatformManager.ADSDestroy('banner', this.banner_2)
                //     this.banner_2 = null
                //     console.log('连带销毁banner2')
                // }
                this.HidBanner6()
                break;
            case 2:
                PlatformManager.ADSDestroy('banner', this.banner_2)
                this.banner_2 = null
                console.log('销毁banner2')
                // if (this.banner_1 != null) {
                //     PlatformManager.ADSDestroy('banner', this.banner_1)
                //     this.banner_1 = null
                //     console.log('连带销毁banner1')
                // }
                this.HidBanner6()
                break;
            case 3:
                PlatformManager.ADSDestroy('banner', this.banner_3)
                this.banner_3 = null
                console.log('销毁banner3')
                this.HidBanner6()
                break
            case 4:
                PlatformManager.ADSDestroy('banner', this.banner_4)
                this.banner_4 = null
                console.log('销毁banner4')
                // this.banner_4 = PlatformManager.CreateBanner(this.banner4_id, () => {
                //     console.log('banner4预加载成功')
                // }, () => {
                //     this.banner_4 = null
                // })
                this.HidBanner6()
                break;
            case 5:
                PlatformManager.ADSDestroy('banner', this.banner_5)
                this.banner_5 = null
                // this.banner_5 = PlatformManager.CreateBanner(this.banner5_id, () => {
                //     console.log('banner5预加载成功')
                // }, () => {
                //     this.banner_5 = null
                // })
                console.log('销毁banner5')
                // if (this.banner_4 != null) {
                //     PlatformManager.ADSDestroy('banner', this.banner_4)
                //     this.banner_4 = PlatformManager.CreateBanner(this.banner4_id, () => {
                //         console.log('banner4预加载成功')
                //     }, () => {
                //         this.banner_4 = null
                //     })
                //     console.log('连带销毁banner4')
                // }
                this.HidBanner6()
                break;
            case 6:
                PlatformManager.ADSHide('banner', this.banner_6)
                this.judgeBanner6Show = false
                break
        }
    }
    /**
     * 隐藏banner
     */
    public static BannerHide(index: number) {
        switch (index) {
            case 1:
                PlatformManager.ADSHide('banner', this.banner_1)
                break;
            case 2:
                PlatformManager.ADSHide('banner', this.banner_2)
                break;
            case 3:
                PlatformManager.ADSHide('banner', this.banner_3)
                break;
            case 4:
                PlatformManager.ADSHide('banner', this.banner_4)
                break;
            case 5:
                PlatformManager.ADSHide('banner', this.banner_5)
                break;
        }
        this.HidBanner6()
    }
}
