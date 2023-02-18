window.theme = window.theme || {};

/* ================ SLATE ================ */
window.theme = window.theme || {};

$.extend(true, theme.libs, {
  "navigation-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-navigation.min.js?v=3676303722926578441676613167"
  },
  "navigation-vertical-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-navigation-vertical.min.js?v=8381018431390078091676613167"
  },
  "product-tabs-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-product-tabs.min.js?v=18183142843062113861676613167"
  },
  "instagram-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-instagram.min.js?v=15281244937851829271676613167"
  },
  "rich-banner-text-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-rich-banner-text.min.js?v=41956330778239065431676613168"
  },
  "layer-banner-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-layer-banner.min.js?v=85099271775259142691676613167"
  },
  "simple-product-slider-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-simple-product-slider.min.js?v=150544009374994033961676613168"
  },
  "product-columns-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-product-columns.min.js?v=112336998655061838211676613167"
  },
  "map-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-map.min.js?v=156307289829113671121676613167"
  },
  "quotes-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-quotes.min.js?v=144313337819941354051676613167"
  },
  "logo-bar-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-logo-bar.min.js?v=71807721969995009531676613167"
  },
  "single-deal-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-single-deal.min.js?v=25458204786684868451676613168"
  },
  "about-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-about.min.js?v=8502415123109276991676613167"
  },
  "newsletter-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-newsletter.min.js?v=141531588240217245561676613167"
  },
  "featured-blog-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-featured-blog.min.js?v=144183644309553950851676613167"
  },
  "footer-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-footer.min.js?v=98348299769482219231676613167"
  },
  "product-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-product.min.js?v=117549713457437673611676613167"
  },
  "collection-template-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-collection.min.js?v=32454035711797278571676613166"
  },
  "search-template-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-search.min.js?v=87958022862029333331676613167"
  },
  "cart-template-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-cart-page.min.js?v=142630996492541363041676613166"
  },
  "faq-section": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/bt-section-faq.min.js?36"
  },
  "zoom": {
    "js": "//cdn.shopify.com/s/files/1/0695/3975/8347/t/2/assets/cloudzoom.js?v=14062328003065750181676613168"
  }
});

theme.dependTypeLibs = {
  "navigation-vertical": "navigation-section",
  "product": "product-global",
  "collection-template": "nouislider"
};

theme.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
    .on('shopify:section:load', this._onSectionLoad.bind(this))
    .on('shopify:section:unload', this._onSectionUnload.bind(this))
    .on('shopify:section:select', this._onSelect.bind(this))
    .on('shopify:section:deselect', this._onDeselect.bind(this))
    .on('shopify:block:select', this._onBlockSelect.bind(this))
    .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _beforeCreateInstance: function(container, constructor, type) {
    if(!type) {
      type = $(container).attr('data-section-type');
    }
    if(theme.dependTypeLibs[type] == undefined) {
      BT.loadCssJsLib(type + '-section', function() {
        if(this.constructors[type] == undefined) {
          this.constructors[type] = constructor;
        }
        this._createInstance(container, constructor);
      }.bind(this));
    } else {
      BT.loadCssJsLib(theme.dependTypeLibs[type], function() {
        BT.loadCssJsLib(type + '-section', function() {
          if(this.constructors[type] == undefined) {
            this.constructors[type] = constructor;
          }
          this._createInstance(container, constructor);
        }.bind(this));
      }.bind(this));
    }
  },

  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (_.isUndefined(constructor)) {
      return;
    }

    var instance = _.assignIn(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._beforeCreateInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    this.instances = _.filter(this.instances, function(instance) {
      var isEventInstance = instance.id === evt.detail.sectionId;

      if (isEventInstance) {
        if (_.isFunction(instance.onUnload)) {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
      instance.onDeselect(evt);
    }
  },

  _onBlockSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    $('[data-section-type=' + type + ']').each(
      function(index, container) {
        this._beforeCreateInstance(container, constructor, type);
      }.bind(this)
    );
  }
});

window.slate = window.slate || {};

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 * Alternatives
 * - Accounting.js - http://openexchangerates.github.io/accounting.js/
 *
 */

theme.Currency = (function() {
  var moneyFormat = '$'; // eslint-disable-line camelcase

  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = format || moneyFormat;

    function formatWithDelimiters(number, precision, thousands, decimal) {
      thousands = thousands || ',';
      decimal = decimal || '.';

      if (isNaN(number) || number === null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1' + thousands
      );
      var centsAmount = parts[1] ? decimal + parts[1] : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
      case 'amount_with_apostrophe_separator':
        value = formatWithDelimiters(cents, 2, "'");
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  };
})();

/*================ SECTIONS ================*/
window.theme = window.theme || {};

theme.sections = new theme.Sections();
BT.loadRequireCss();
BT.init();
function registerSections() {
  theme.sections.register('navigation', theme.DesktopNavigationSection);
  theme.sections.register('navigation-vertical', theme.VerticalNavigationSection);
  theme.sections.register('instagram', theme.InstagramSection);
  theme.sections.register('rich-banner-text', theme.RichBannerTextSection);
  theme.sections.register('layer-banner', theme.LayerBannerSection);
  theme.sections.register('simple-product-slider', theme.SimpleProductSliderSection);
  theme.sections.register('product', theme.ProductTemplateSection);
  theme.sections.register('product-tabs', theme.ProductTabsSection);
  theme.sections.register('product-columns', theme.ProductColumnsSection);
  theme.sections.register('map', theme.Maps);
  theme.sections.register('quotes', theme.QuotesSection);
  theme.sections.register('featured-blog', theme.FeaturedBlogSection);
  theme.sections.register('logo-bar', theme.LogoListSection);
  theme.sections.register('single-deal', theme.SingleDealSection);
  theme.sections.register('about', theme.AboutSection);
  theme.sections.register('newsletter', theme.NewsletterSection);
  theme.sections.register('footer', theme.FooterSection);
  theme.sections.register('collection-template', theme.CollectionTemplateSection);
  theme.sections.register('search-template', theme.SearchTemplateSection);
  theme.sections.register('cart-template', theme.CartTemplateSection);
  theme.sections.register('faq', theme.faqSection);
}
if(BT.data.cacheWindowWidth <= BT.options.windowScreen.mobile) {
  $(document).ready(function() {
    registerSections();
  });
} else {
  registerSections();
}