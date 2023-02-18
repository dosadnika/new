theme.featuredBlog = {};
theme.FeaturedBlogSection = (function() {
  function FeaturedBlogSection(container) {
    this.wrap = $(container);
    BT.initSlider(this.wrap, true);  
    this.slider = this.wrap.find(BT.getSliderSelector());
  }

  return FeaturedBlogSection;
})();

theme.FeaturedBlogSection.prototype = _.assignIn({}, theme.FeaturedBlogSection.prototype, {
  onUnload: function() {
    BT.destroySlider(this.wrap);
    delete this.slider;
    delete this.wrap;
  }
});

theme.sections.constructors['featured-blog'] = theme.FeaturedBlogSection;