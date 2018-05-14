<template>

  <div class="container has-header">

    <mheader :text="pageTitle" @rightMore="jumpCall">
      <img slot="rightHtml" src="../../../assets/common/call-gray.png">
    </mheader>

    <section class="main">

      <table class="bank-quota-table" v-if="model.length > 0">
        <thead>
        <tr>
          <th style="width: 40%">银行</th>
          <th style="width: 20%">单笔额度</th>
          <th style="width: 20%">单日额度</th>
          <th style="width: 20%">单月额度</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, i) in model" :key="i">
          <td>{{item.bankName}}</td>
          <td>{{item.singerMaxAmount | bankQuotaFilter}}</td>
          <td>{{item.singerDaymount | bankQuotaFilter}}</td>
          <td>{{item.singerMonthAmount | bankQuotaFilter}}</td>
        </tr>
        </tbody>
      </table>

    </section>

  </div>

</template>

<script>

  import mheader from '../../common/m-header.vue';

  export default {
    components: {
      mheader
    },
    data() {
      return {
        pageTitle: '限额说明',
        model: []
      }
    },
    methods: {
      jumpCall() {
        this.$router.push('/find/customerService');
      },
      getModelList() {
        this.$post('bankPay/supportBankList', {userDevice: "02"}).then(res => {
          if (res.code == '200') {
            if (res.model.length > 0) {
              this.model = res.model;
            } else {
              this.$vux.toast.show({
                type: 'text',
                text: '暂无数据',
                position: 'middle'
              });
            }
          } else {
            this.$vux.toast.show({
              type: 'text',
              text: res.msg,
              position: 'middle'
            });
          }
        });
      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    },
    created() {
      this.getModelList();
    }
  }
</script>

<style scoped>

  .bank-quota-table {
    width: 100%;
    margin-bottom: 20px;
    border-collapse: collapse;
    border-spacing: 0;
  }

  .bank-quota-table thead tr th,
  .bank-quota-table tbody tr td {
    margin: 0;
    padding: 0;
  }

  .bank-quota-table thead tr th {
    height: 45px;
    background-color: #ebebeb;
    font-size: 14px;
    font-weight: normal;
    color: #333;
    text-align: center;
  }

  .bank-quota-table tbody tr td {
    border-bottom: 1px solid #ebebeb;
    height: 35px;
    font-size: 12px;
    color: #666;
    text-align: center;
  }

  .bank-quota-table tbody tr td + td {
    border-left: 1px solid #ebebeb;
  }

  .bank-quota-table tbody tr:first-child td {
    border-top: 1px solid #ebebeb;
  }

  .bank-quota-table tbody tr td:first-child {
    text-align: left;
    padding: 0 10px;
    line-height: 14px;
  }

  .bank-quota-table tbody tr:nth-child(odd) td {
    background-color: #fbfbfb;
  }

  .bank-quota-table tbody tr:nth-child(even) td {
    background-color: #fff;
  }

</style>
