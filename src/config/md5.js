/*
 * @Author: wzc0x0@gmail.com
 * @Date: 2017-11-20 15:47:29
 * @feature: hex encode pay-password by md5
 */

import { md5 } from "vux";
//Are you kidding me ? let the key show on the front-end?
const _key = "xingfuqianzhuang001bank";

export default value => !!value ? md5(`${_key}${value}`) : ''