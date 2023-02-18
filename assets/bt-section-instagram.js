theme.instagram = {};
theme.InstagramSection = (function() {
  function InstagramSection(container) {
    var $container = $(container);
    BT.initSlider($container, true);
  }

  return InstagramSection;
})();
theme.sections.constructors['instagram'] = theme.InstagramSection;