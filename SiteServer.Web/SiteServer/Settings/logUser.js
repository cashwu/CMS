﻿var $url = '/pages/settings/logUser';

var data = {
  pageLoad: false,
  pageAlert: null,
  items: null,
  count: null,
  formInline: {
    dateFrom: '',
    dateTo: '',
    userName: '',
    keyword: '',
    currentPage: 1,
    offset: 0,
    limit: 30
  }
};

var methods = {
  getConfig: function () {
    var $this = this;

    $api.post($url, this.formInline).then(function (response) {
      var res = response.data;

      $this.items = res.items;
      $this.count = res.count;
    }).catch(function (error) {
      $this.pageAlert = utils.getPageAlert(error);
    }).then(function () {
      $this.pageLoad = true;
    });
  },

  btnDeleteClick: function () {
    var $this = this;

    utils.alertDelete({
      title: '清空用户日志',
      text: '此操作将会清空用户日志，且数据无法恢复，请谨慎操作！',
      callback: function () {

        utils.loading(true);
        $api.delete($url).then(function (response) {
          var res = response.data;
    
          $this.items = [];
        }).catch(function (error) {
          $this.pageAlert = utils.getPageAlert(error);
        }).then(function () {
          utils.loading(false);
        });
      }
    });
  },

  btnSearchClick() {
    var $this = this;

    this.formInline.currentPage = 1;
    this.formInline.offset = 0;
    this.formInline.limit = 30;

    utils.loading(true);
    $api.post($url, this.formInline).then(function (response) {
      var res = response.data;

      $this.items = res.items;
      $this.count = res.count;
    }).catch(function (error) {
      $this.pageAlert = utils.getPageAlert(error);
    }).then(function () {
      utils.loading(false);
    });
  },

  handleCurrentChange: function(val) {
    var $this = this;

    this.formInline.currentValue = val;
    this.formInline.offset = this.formInline.limit * (val - 1);

    utils.loading(true);
    $api.post($url, this.formInline).then(function (response) {
      var res = response.data;

      $this.items = res.items;
      $this.count = res.count;
    }).catch(function (error) {
      $this.pageAlert = utils.getPageAlert(error);
    }).then(function () {
      utils.loading(false);
    });
    window.scrollTo(0, 0);
  }
};

new Vue({
  el: '#main',
  data: data,
  methods: methods,
  created: function () {
    this.getConfig();
  }
});