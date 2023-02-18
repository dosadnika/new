theme.richBannerText = {};
theme.RichBannerTextSection = (function() {
  function runSliderBanner(wrap) {
    BT.initSlider(wrap, true);
  }

  function RichBannerTextSection(container) {
    this.wrap = $(container);
    if(!this.wrap.hasClass('customize-page')) {
      var timeout = BT.data.cacheWindowWidth < BT.options.windowScreen.desktop ? 2300 : 1800;
      setTimeout(function(){
        runSliderBanner(this.wrap);
      }.bind(this), timeout);
    } else {
      runSliderBanner(this.wrap);
    }
    BT.applyCustomColorSwatches(this.wrap);
    BT.initDealCountdown(this.wrap);
    BT.popularAddedWishlistItems(this.wrap);
    
    this.slider = this.wrap.find(BT.getSliderSelector());
  }

  return RichBannerTextSection;
})();

theme.RichBannerTextSection.prototype = _.assignIn({}, theme.RichBannerTextSection.prototype, {
  onBlockSelect: function(evt) {
    var ele = $(evt.target);
    if(ele.attr('data-slick-index') != undefined) {
      this.slider.slick('slickGoTo', ele.attr('data-slick-index'), true).slick('slickPause');
    } else {
      if(!BT.isInViewport(ele, evt.currentTarget.defaultView)) {
        $('html, body').animate({
          scrollTop: (ele.offset().top - 100)
        }, 400);
      }
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
    BT.destroyDealCountdown(this.wrap);
    delete this.slider;
    delete this.wrap;
  }
});
theme.sections.constructors['rich-banner-text'] = theme.RichBannerTextSection;