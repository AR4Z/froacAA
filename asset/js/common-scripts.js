$(document).ready(function () {
  $("#toggle-btn").on("click", function (e) {
    e.preventDefault(), $(this).toggleClass("active"), $(".side-navbar").toggleClass("shrinked"), $(".content-inner").toggleClass("active"), $(document).trigger("sidebarChanged"), $(window).outerWidth() > 1183 && ($("#toggle-btn").hasClass("active") ? ($(".navbar-header .brand-small").hide(), $(".navbar-header .brand-big").show()) : ($(".navbar-header .brand-small").show(), $(".navbar-header .brand-big").hide())), $(window).outerWidth() < 1183 && $(".navbar-header .brand-small").show()
  })
  var t = $(".content-inner");

  function n() {
    var e = $(".main-footer").outerHeight();
    t.css("padding-bottom", e + "px")
  }
  $(document).on("sidebarChanged", function () {
    n()
  }), $(window).on("resize", function () {
    n()
  }), $(".external").on("click", function (e) {
    e.preventDefault(), window.open($(this).attr("href"));
  });

  if (!session_user || accessibilityBar.needCustomInterfaz) {
    $('#interfaz').addClass('show active');
    $('#interfaz-tab').addClass('active');
    $('#interfaz-tab').attr('aria-selected', true);
  } else if (accessibilityBar.needNarrator) {
    $('#narrator').addClass('show active');
    $('#narrator-tab').addClass('active');
    $('#narrator-tab').attr('aria-selected', true);
  } else if (accessibilityBar.needScreenReader) {
    $('#screen-reader').addClass('show active');
    $('#screen-reader-tab').addClass('active');
    $('#screen-reader-tab').attr('aria-selected', true);
  } else if (accessibilityBar.needLscTranslator) {
    $('#LSC-translator').addClass('show active');
    $('#LSC-translator-tab').addClass('active');
    $('#LSC-translator-tab').attr('aria-selected', true);
  } else if (accessibilityBar.needKeyboard) {
    $('#keyboard-cf').addClass('show active');
    $('#keyboard-tab').addClass('active');
    $('#keyboard-tab').attr('aria-selected', true);
  }

  if ($('ul#accessibilityTab li').length == 2) {
    $('#reset-all').hide();
  }

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
});

function contains(selector, text) {
  let elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text, 'i').test(element.textContent);
  });
}

