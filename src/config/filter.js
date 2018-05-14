const timeTypeArry = ["天", "周", "个月", "年"]
const statusArr = ["预售", "出借", "停售", "已满标", "还款中"]
const retypeTextZt = ['到期退出本息', '到期退出本息', '等额本息', '等本等息', '按月付息到期还本', '按季付息到期还本 ', '一次性付息到期还本']
const borrowType = ['等额本息', '一次性还本付息', '等额本息', '等本等息', '按月付息到期还本']
const borrowStatus = ['未添加', '未发布', '已发布', '未开始', '立即出借', '已满标', '已截止', '计息中', '已到期', '已结束', '流标']
const bannerStatus = {
    1: '进行中',
    2: '已结束'
};
let fliter = {
    bigMoneyCheck: value => {
        if (typeof value !== "number") {
            value = 0;
        }
        if (value < 10000) {
            return value + '元';
        } else {
            value = (value / 10000).toFixed(10);
            var arrNum = value.toString().split('.');
            var _m = arrNum[0] + '.' + arrNum[1].substr(0, 2);
            return _m + '万元'
        }
    },
    bankQuotaFilter: value => {
        return (value < 10000) ? (value + '元') : ((value / 10000).toFixed(10).toString().split('.')[0] + '万');
    },
    piptest: value => {
        return 'aaaa'
    },
    timeTypeFliter: value => {
        return timeTypeArry[value - 1]
    },
    productTypeFliter: value => {
        return value.charAt(value.length - 1);
    },
    timeTypeNameFliter: value => {
        var failNum = value.charAt(value.length - 1);
        return failNum == 2 ? "到期退出" : "出借期限";
    },
    percentRemainFliter: value => {
        return ((value.borrowAmount - value.remainAmount) / value.borrowAmount * 100).toFixed(2)
    },
    percentRemainFliterRe: value => {
        return ((1 - (value.borrowAmount - value.remainAmount) / value.borrowAmount) * 100).toFixed(2)
    },
    percentRemainFliterToNumber: value => {
        let i = parseFloat(((value.borrowAmount - value.remainAmount) / value.borrowAmount * 100).toFixed(2));
        return i;
    },
    rankFliter: value => {
        if (value == 'SZY0001' || value == 'YYY0002' || value == 'JJF0001' || value == 'SJY0001' || value == 'NNZ0001') {
            return true;
        } else {
            return false;
        }

    },
    retypeZtFliter: value => {
        return retypeTextZt[value]
    },
    momentTime: value => {
        let dataTime = new Date(value);
        let year = dataTime.getFullYear();
        let datamouth = dataTime.getMonth() + 1 >= 10 ? dataTime.getMonth() + 1 : "0" + (dataTime.getMonth() + 1);
        let day = dataTime.getDate() >= 10 ? dataTime.getDate() : "0" + dataTime.getDate();
        let hour = dataTime.getHours() >= 10 ? dataTime.getHours() : "0" + dataTime.getHours();
        let fen = dataTime.getMinutes() >= 10 ? dataTime.getMinutes() : "0" + dataTime.getMinutes();
        let scent = dataTime.getSeconds() >= 10 ? dataTime.getSeconds() : "0" + dataTime.getSeconds();
        return year + "-" + datamouth + "-" + day + " " + hour + ":" + fen + ":" + scent;
    },
    creatTime: value => {
        let dataTime = new Date(value);
        let year = dataTime.getFullYear();
        let datamouth = dataTime.getMonth() + 1 >= 10 ? dataTime.getMonth() + 1 : "0" + (dataTime.getMonth() + 1);
        let day = dataTime.getDate() >= 10 ? dataTime.getDate() : "0" + dataTime.getDate();
        return year + "-" + datamouth + "-" + day;
    },
    borrowTypeFliter: value => {
        return borrowType[value]
    },
    borrowStatusFliter: value => borrowStatus[value],
    timesecFliter: value => {
        if (value) {
            let date = new Date(value * 1000);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
        return '未知';
    },
    numToMoneyField: value => {
        if (!value) {
            return '0.00'
        }
        let num = value.toString().replace(/\$|\,/g, '');

        // 检查传入数值为数值类型
        if (isNaN(num))
            num = "0";

        // 获取符号(正/负数)
        let sign = (num == (num = Math.abs(num)));
        let cent = 2;
        num = Math.floor(num * Math.pow(10, cent) + 0.50000000001); // 把指定的小数位先转换成整数.多余的小数位四舍五入
        let cents = num % Math.pow(10, cent); // 求出小数位数值
        num = Math.floor(num / Math.pow(10, cent)).toString(); // 求出整数位数值
        cents = cents.toString(); // 把小数位转换成字符串,以便求小数位长度
        // 补足小数位到指定的位数
        while (cents.length < cent)
            cents = "0" + cents;

        // 对整数部分进行千分位格式化.
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        if (cent > 0)
            return (((sign) ? '' : '-') + num + '.' + cents);
        else
            return (((sign) ? '' : '-') + num);
    },
    bannerStatusFliter: value => {
        if (bannerStatus[value])
            return bannerStatus[value]
        else
            return value;
    },
    bannerTime: value => {
        let dataTime = new Date(value);
        return dataTime.getFullYear() + "年" + (dataTime.getMonth() + 1) + "月" + dataTime.getDate() + "日";
    },
    //Author:wzc0x0@gmail.com
    nameHidden: value => !!value ? value.toString().replace(/(\S{1})\S*/, "$1**") : '',
    phoneHidden: value => !!value ? value.toString().replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : '',
    bankCodeHidden: value => !!value ? value.toString().split('').map((item, i) => (i >= 6 && i < value.length - 4) ? '*' : item).join('') : '',
    idCardHidden: value => !!value ? value.toString().split('').map((item, i) => (i >= 5 && i < value.length - 4) ? '*' : item).join('') : ''

}

export default fliter