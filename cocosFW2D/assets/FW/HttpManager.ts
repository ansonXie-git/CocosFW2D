
export default class HttpManager {
    /**
     * 发起Post请求
     * @param type 请求地址后缀
     * @param params 请求参数
     * @param callback 回调
     */
    public static httpPost(type: string, params: any, callback?: Function, fail?: Function, isJson = false) {
        //let url = 'https://www.yrhh.net/api/' + type
        //let new_params = ''
        //for (let k in params) {
        //let str = k + '=' + params[k] + '&'
        //new_params = new_params + str
        //}
        //console.log(type + 'params----->', new_params)
        //let xhr = new XMLHttpRequest();
        //xhr.onreadystatechange = function () {
        //console.log(type + ' callBack,', xhr.responseText)
        //if (xhr.readyState === 4 && xhr.status == 200) {
        //let respone = xhr.responseText;
        //if (respone) {
        //let rsp = JSON.parse(respone);
        //if (callback) callback(rsp);
        //} else {
        //console.error(xhr.response)
        //if (fail != null) fail()
        //}
        //} else {
        //console.error(type + "--->" + xhr.status, xhr.response)
        //if (fail != null) fail()
        //}
        //};
        //xhr.open('POST', url, true);
        //if (!isJson)
        //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //else
        //xhr.setRequestHeader("Content-Type", "application/json");
        //xhr.timeout = 8000;// 8 seconds for timeout
        //xhr.send(new_params);
    }
    /**
     * 发起Get请求
     * @param type 请求地址后缀
     * @param params 请求参数
     * @param callback 回调
     */
    public static httpGet(type: string, params: any, callback: Function, fail?: Function, isJson = false) {
        //let new_params = ''
        //for (let k in params) {
        //let str = k + '=' + params[k] + '&'
        //new_params = new_params + str
        //}
        //let url = 'https://www.yrhh.net/api/' + type
        //url += "?" + new_params;
        //console.log(type + 'params----->', url)
        //let xhr = new XMLHttpRequest();
        //xhr.onreadystatechange = function () {
        //console.log(type + ' callBack,', xhr.responseText)
        //if (xhr.readyState === 4 && xhr.status == 200) {
        //let respone = xhr.responseText;
        //if (respone) {
        //let rsp = JSON.parse(respone);
        //callback(rsp);
        //} else {
        //console.error(xhr.response)
        //if (fail != null) fail()
        //}
        //} else {
        //console.error(type + "--->" + xhr.status, xhr.response)
        //if (fail != null) fail()
        //}
        //};
        //xhr.withCredentials = true;
        //xhr.open('GET', url, true);
        //if (!isJson)
        //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //else
        //xhr.setRequestHeader("Content-Type", "application/json");
        //xhr.timeout = 8000;// 8 seconds for timeout
        //xhr.send();
    }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// export default class HttpManager {
// 
//     /**
//      * 发起Post请求
//      * @param type 请求地址后缀
//      * @param params 请求参数
//      * @param callback 回调
//      */
//     public static httpPost(type: string, params: any, callback?: Function, fail?: Function, isJson = false) {
//         let url = 'https://www.yrhh.net/api/' + type
//         let new_params = ''
//         for (let k in params) {
//             let str = k + '=' + params[k] + '&'
//             new_params = new_params + str
//         }
//         console.log(type + 'params----->', new_params)
//         let xhr = new XMLHttpRequest();
//         xhr.onreadystatechange = function () {
//             console.log(type + ' callBack,', xhr.responseText)
//             if (xhr.readyState === 4 && xhr.status == 200) {
//                 let respone = xhr.responseText;
//                 if (respone) {
//                     let rsp = JSON.parse(respone);
//                     if (callback) callback(rsp);
//                 } else {
//                     console.error(xhr.response)
//                     if (fail != null) fail()
//                 }
//             } else {
//                 console.error(type + "--->" + xhr.status, xhr.response)
//                 if (fail != null) fail()
//             }
//         };
//         xhr.open('POST', url, true);
//         if (!isJson)
//             xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//         else
//             xhr.setRequestHeader("Content-Type", "application/json");
//         xhr.timeout = 8000;// 8 seconds for timeout
//         xhr.send(new_params);
//     }
// 
//     /**
//      * 发起Get请求
//      * @param type 请求地址后缀
//      * @param params 请求参数
//      * @param callback 回调
//      */
//     public static httpGet(type: string, params: any, callback: Function, fail?: Function, isJson = false) {
//         let new_params = ''
//         for (let k in params) {
//             let str = k + '=' + params[k] + '&'
//             new_params = new_params + str
//         }
//         let url = 'https://www.yrhh.net/api/' + type
//         url += "?" + new_params;
//         console.log(type + 'params----->', url)
//         let xhr = new XMLHttpRequest();
//         xhr.onreadystatechange = function () {
//             console.log(type + ' callBack,', xhr.responseText)
//             if (xhr.readyState === 4 && xhr.status == 200) {
//                 let respone = xhr.responseText;
//                 if (respone) {
//                     let rsp = JSON.parse(respone);
//                     callback(rsp);
//                 } else {
//                     console.error(xhr.response)
//                     if (fail != null) fail()
//                 }
//             } else {
//                 console.error(type + "--->" + xhr.status, xhr.response)
//                 if (fail != null) fail()
//             }
//         };
//         xhr.withCredentials = true;
//         xhr.open('GET', url, true);
//         if (!isJson)
//             xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//         else
//             xhr.setRequestHeader("Content-Type", "application/json");
//         xhr.timeout = 8000;// 8 seconds for timeout
//         xhr.send();
//     }
// 
// }
