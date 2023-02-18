theme.quotes = {};
theme.QuotesSection = (function() {
  function QuotesSection(container) {
    this.wrap = $(container);
    BT.initSlider(this.wrap, true);
    this.slider = this.wrap.find(BT.getSliderSelector());
  }

  return QuotesSection;
})();

theme.QuotesSection.prototype = _.assignIn({}, theme.QuotesSection.prototype, {
  onBlockSelect: function(evt) {
    var ele = $(evt.target);
    if(ele.attr('data-slick-index') != undefined) {
      if(!ele.hasClass('slick-current')) {
        this.slider.slick('slickGoTo', ele.attr('data-slick-index'), true);
      }
      this.slider.slick('slickPause');
    }
  },
  onBlockDeselect: function() {
    // Resume auto-rotate
    if(this.slider.hasClass('slick-initialized')) {
      this.slider.slick('slickPlay');
    }
  },
  onUnload: function() {
    BT.destroySlider(this.wrap);
    delete this.slider;
    delete this.wrap;
  }
});
theme.sections.constructors['quotes'] = theme.QuotesSection;