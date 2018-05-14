<template>

  <!--成长体系-->
  <div class="temp" v-if="list.length > 0">
    <table>
      <tr>
        <th>等级</th>
        <th>成长值(点)</th>
        <th>最低出借要求<br/><span>（出借年化金额）</span></th>
      </tr>
      <tr v-for="(item, i) in list" :key="i">
        <td class="grade">{{ item.memberName }}</td>
        <td v-if="i == (list.length - 1) ">{{ item.rateDown }}+</td>
        <td v-else>{{ item.rateDown }} - {{ item.rateUp }}</td>
        <td v-if="item.minLoanAmount == 0" class="yuan">--</td>
        <td v-else class="yuan">{{ item.minLoanAmount }}万元</td>
      </tr>
    </table>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        list: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.$post("member/getMemberLevelInfo", {userId: this.storage.get("user_id")}).then(res => {
          if (res.code == '200') {
            if (res.model.data.length > 0) {
              this.list = res.model.data;
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
    }
  }

</script>

<style scoped>

  .temp {
    background: #fff;
    padding: 20px 20px 25px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }

  table tr, table td, table th {
    border: solid 1px #D9D9D9;
    text-align: center;
  }

  table th {
    background: #F4F4F4;
    font-size: 14px;
    color: #333;
    font-weight: normal;
  }

  table td {
    padding: 10px 0;
  }

  table td.grade {
    width: 20%;
  }

  table td.yuan {
    width: 35%;
  }

</style>
