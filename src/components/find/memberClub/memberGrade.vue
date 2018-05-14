<template>

  <div class="container has-header">

    <mheader :text="pageTitle"></mheader>

    <section class="main">

      <!--会员二期文案-->
      <!--<dl class="fqa">
        <dt class="title acquire">成长值获取方式</dt>
        <dd class="content">
          <p>您通过成功出借，出借项目起息后（亿宝智投项目出借后）即可获取对应的成长值，次日0点陆续发放至您账户。成长值仅计算出借金额中人民币实际支付金额，不包含优惠券（虚拟金、满减券、加息券等）抵扣金额。</p>
        </dd>
        <dt class="title calculate">成长值计算的方法</dt>
        <dd class="content">
          <p>1、一次性还本付息项目（按月付息到期还本项目）：成长值=单笔出借金额*出借期限（单位为天，1个月计30天，3个月计90天，以此类推）/365/100；</p>
          <p>2、智投项目（亿宝智投项目）：成长值=实际出借本金 *项目锁定期（天）/365/100（取整）；</p>
          <p class="mark">备注：成长值1点起算，可进行累加，上不封顶；不满1点不进行计算。</p>
        </dd>
        <dt class="title up">会员升级的条件</dt>
        <dd class="content">
          <p>您所获取的成长值达到对应会员等级的区间段，次日即可升级至对应会员等级，0点后开始陆续调整。</p>
        </dd>
        <dt class="title indate">会员等级的有效期</dt>
        <dd class="content">
          <p>会员等级自变更之日起，为期90天为会员等级的有效期。（本期自会员权益上线之日开始计算，为期90天会员等级的有效期）</p>
        </dd>
        <dt class="title adjust">会员等级的调整</dt>
        <dd class="content">
          <p>会员等级自变更之日起，第91天系统将对原有成长值进行调整，并按照以下方式重新核算会员成长值，根据最新核算的成长值调整至对应的会员等级：</p>
          <p>重新核算成长值=会员有效期结束当日（第90天）账户所持有出借项目年化金额累计/100(取整)；</p>
          <p class="mark">备注：一次性还本付息（按月付息到期还本项目）、等额本息和亿宝智投项目计算方式不一致，详情请参照上述成长值计算方法。</p>
        </dd>
      </dl>-->

      <dl class="fqa">
        <dt class="title acquire">成长值获取方式</dt>
        <dd class="content">
          <p>您通过成功出借，出借项目起息后即可获取对应的成长值，成长值仅计算出借金额中人民币实际支付金额，不包含优惠券（虚拟金、满减券、加息券等）抵扣金额。</p>
        </dd>
        <dt class="title calculate">成长值计算的方法</dt>
        <dd class="content">
          <p>1.	一次性还本付息项目（按月付息到期还本项目）：成长值 = 单笔出借金额 *出借期限（单位为天。 1个月为30天，3个月90天，以此类推）/ 365 / 100（取整）；</p>
          <p>2.等额本息项目：成长值 = 单笔出借可得总利息 / 平台利率 / 100（取整）；<br>举个栗子：老王出借年年涨项目1万元（等额本息12%收益），1年后可得总利息662元，则可获得成长值为 662 / 12% / 100 = 55点</p>
          <p class="mark">备注：成长值1点起算，可进行累加，上不封顶；不满1点不进行计算。<br>智投项目（亿宝智投项目）：成长值=实际出借本金 *项目锁定期（天）/365/100（取整）；如果出借项目持续续投，利息不计入成长值，仅初始出借本金计入成长值。</p>
        </dd>
        <dt class="title up">会员升级的条件</dt>
        <dd class="content">
          <p>您所获取的成长值达到对应会员等级的区间段，次日即可升级至对应会员等级，0点后开始陆续调整。</p>
        </dd>
        <dt class="title indate">会员等级的有效期</dt>
        <dd class="content">
          <p>会员等级自变更之日起，为期90天为会员等级的有效期。（会员权益上线前，会员等级不设定有效期）。</p>
        </dd>
        <dt class="title adjust">会员等级的调整</dt>
        <dd class="content">
          <p>会员等级自变更之日起，第91天系统将对原有成长值进行调整，并按照以下方式重新核算会员成长值，根据最新核算的成长值调整至对应的会员等级：重新核算成长值=会员有效期结束当日（第90天）账户所持有出借项目年化金额累计/100(取整)；</p>
          <p class="mark">备注：一次性还本付息和等额本息产品计算方式不一致，详情请参照上述成长值计算方法。</p>
        </dd>
      </dl>

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
        //pageTitle: '等级说明&常见FQA'
        pageTitle: '会员等级说明'
      }
    },
    metaInfo() {
      return {
        title: this.pageTitle
      }
    }
  }

</script>

<style scoped>

  .main {
    padding-top: 0
  }

  .fqa {
    background-color: #fff;
  }

  .fqa .title {
    position: relative;
    padding: 10px 10px 5px 35px;
    font-size: 15px;
    color: #222;
    line-height: 22px;
  }

  .fqa .content {
    padding: 0 10px 20px 35px;
    border-bottom: 1px solid #f3f3f3;
  }

  .fqa .content:last-child {
    border-bottom: 0;
  }

  .fqa .content p {
    margin-bottom: 6px;
    font-size: 14px;
    color: #999;
    line-height: 22px;
    letter-spacing: -0.34px;
  }

  .fqa .content p.mark {
    color: #666
  }

  .fqa .content p:last-child {
    margin-bottom: 0;
  }

  .fqa .title.acquire:before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 16px;
    height: 21px;
    background: url(../../../assets/find/memberClub/icon_acquire.png) no-repeat center;
    background-size: 100% 100%;
  }

  .fqa .title.calculate:before {
    content: '';
    position: absolute;
    top: 12px;
    left: 9px;
    width: 18px;
    height: 18px;
    background: url(../../../assets/find/memberClub/icon_calculate.png) no-repeat center;
    background-size: 100% 100%;
  }

  .fqa .title.up:before {
    content: '';
    position: absolute;
    top: 12px;
    left: 12px;
    width: 13px;
    height: 18px;
    background: url(../../../assets/find/memberClub/icon_up.png) no-repeat center;
    background-size: 100% 100%;
  }

  .fqa .title.indate:before {
    content: '';
    position: absolute;
    top: 11px;
    left: 8px;
    width: 20px;
    height: 20px;
    background: url(../../../assets/find/memberClub/icon_indate.png) no-repeat center;
    background-size: 100% 100%;
  }

  .fqa .title.adjust:before {
    content: '';
    position: absolute;
    top: 12px;
    left: 10px;
    width: 17px;
    height: 17px;
    background: url(../../../assets/find/memberClub/icon_adjust.png) no-repeat center;
    background-size: 100% 100%;
  }

</style>
