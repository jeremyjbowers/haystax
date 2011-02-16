(function(jQuery) {
  var $ = jQuery;
  
  var TAG_COLORS = [
    "#C60C46",
    "#00AEEF",
    "#F3739B",
    "#FF66FF",
    "#E66124",
    "#FFC328",
    "#B2E725",
    "#660066",
    "#FF9900"
  ];

  var NUM_TAG_COLORS = TAG_COLORS.length;

  var TAG_COLOR_MAP = {
    img: 0,
    p: 1,
    div: 2,
    a: 3,
    span: 4,
    body: 5,
    h1: 6,
    html: 7,
    footer: 8
  };

  function tagNameToNumber(tagName) {
    var total = 0;
    for (var i = 0; i < tagName.length; i++)
      total += tagName.charCodeAt(i);
    return total;
  }

  jQuery.extend({
    // Returns the color hex for the "official" Web X-Ray color
    // for the given tag name, excluding angled brackets.
    colorForTag: function colorForTag(tagName) {
      var colorNumber;

      tagName = tagName.toLowerCase();
      if (tagName in TAG_COLOR_MAP)
        colorNumber = TAG_COLOR_MAP[tagName];
      else
        colorNumber = (tagNameToNumber(tagName) % NUM_TAG_COLORS);

      return TAG_COLORS[colorNumber];
    }
  });

  jQuery.fn.extend({
    // Like $.overlay(), but applies the "official" Web X-Ray color
    // for the element type being overlaid, with the given opacity.
    overlayWithTagColor: function overlayWithTagColor(opacity) {
      var bgColor;
      var overlay = $(this).overlay();
      var baseColor = $.colorForTag($(this).get(0).nodeName);

      bgColor = $.makeRGBA(baseColor, opacity);

      overlay.css({backgroundColor: bgColor});
      return overlay;
    }
  });
})(jQuery);