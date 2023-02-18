theme.productColumns = {};
theme.ProductColumnsSection = (function() {
  function ProductColumnsSection(container) {
    this.wrap = $(container);
    BT.convertCurrencySilence(this.wrap.find('span.money'));
    BT.initSlider(this.wrap);
    BT.initDealCountdown(this.wrap);
    BT.applyCustomColorSwatches(this.wrap);
  }

  return ProductColumnsSection;
})();

theme.ProductColumnsSection.prototype = _.assignIn({}, theme.ProductColumnsSection.prototype, {
  onBlockSelect: function(evt) {
    var ele = $(evt.target);
    if(!BT.isInViewport(ele, evt.currentTarget.defaultView)) {
      var offset = ele.offset().top - 100;
      $('html, body').animate({
        scrollTop: offset
      }, 400);
    }
  },
  onUnload: function() {
    BT.destroySlider(this.wrap);
    BT.destroyDealCountdown(this.wrap);
    delete this.wrap;
  }
});
theme.sections.constructors['product-columns'] = theme.ProductColumnsSection;