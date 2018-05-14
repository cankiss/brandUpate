import { Group, Cell, Flexbox, FlexboxItem, XButton, debounce } from "vux";
import MHeader from "~/common/m-header";
import KeyBoard from "~/common/keyBoard";
import NoData from "../../common/noData";
import MDialog from "../../common/dialog";
import md5 from "@/config/md5";
export default {
    data() {
        return {
            msg: `出借${this.$route.params.name}详情`,
            isShow: !this.$route.params.isDetail,
            nid: this.$route.params.nid,
            page_num: 1,
            totalAmount: null,
            isPay: false,
            busy: false,
            item: {},
            details: []
        };
    },
    components: {
        MHeader,
        Group,
        Cell,
        Flexbox,
        FlexboxItem,
        XButton,
        KeyBoard,
        MDialog,
        NoData
    },
    created() {
        this.nid &&
            this.$mine("borrowZt/selectZhiTouDetailNew", { nid: this.nid })
            .then(({ model, code } = res) => {
                this.loadMore()
                if (code === "200") this.item = model;
            })

    },
    methods: {
        loadMore: debounce(function() {
            this.$mine("borrowZt/zhiTouInvestDetail", {
                nid: this.nid,
                userDevice: "02",
                page_num: this.page_num++
            }).then(({ model, code } = res) => {
                if (code === "200") {
                    if (model && model.list.length > 0) {
                        this.details = this.details.concat(model.list)
                        this.totalAmount = model.tendLogZtRecord.totalAmount
                    } else this.busy = true
                }
            });
        }, 300, { 'leading': true, 'trailing': false }),
        applyExit(value) {
            this.$mine("borrowZt/quitProduct", {
                transactionPassword: md5(value),
                nid: this.nid
            }).then(({ code, msg, model } = res) => {
                if (code == "200") {
                    this.$refs.pay.$payStatus(true);
                    this.$refs.dialog.showDialog = true;
                } else {
                    this.$refs.pay.$payStatus(false);
                    this.$vux.toast.show({
                        text: msg,
                        type: "text",
                        width: "80%"
                    });
                }
            });
        }
    }
};