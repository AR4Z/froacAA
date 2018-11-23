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

  if (!window.accessibilityBar.loggedIn|| window.accessibilityBar.needCustomInterfaz) {
    document.getElementById('interfaz').classList.add('show')
    document.getElementById('interfaz').classList.add('active')
    document.getElementById('interfaz-tab').classList.add('active')
    document.getElementById('interfaz-tab').setAttribute('aria-selected', true)
  } else if (window.accessibilityBar.needNarrator) {
    document.getElementById('narrator').classList.add('show')
    document.getElementById('narrator').classList.add('active')
    document.getElementById('narrator-tab').classList.add('active')
    document.getElementById('narrator-tab').setAttribute('aria-selected', true)
  } else if (window.accessibilityBar.needScreenReader) {
    document.getElementById('screen-reader').classList.add('show')
    document.getElementById('screen-reader').classList.add('active')
    document.getElementById('screen-reader-tab').classList.add('active')
    document.getElementById('screen-reader-tab').setAttribute('aria-selected', true)
  } else if (window.accessibilityBar.needLscTranslator) {
    document.getElementById('LSC-translator').classList.add('show')
    document.getElementById('LSC-translator').classList.add('active')
    document.getElementById('LSC-translator-tab').classList.add('active')
    document.getElementById('LSC-translator-tab').setAttribute('aria-selected', true)
  } else if (window.accessibilityBar.needVirtualKeyboard) {
    document.getElementById('keyboard-cf').classList.add('show')
    document.getElementById('keyboard-cf').classList.add('active')
    document.getElementById('keyboard-tab').classList.add('active')
    document.getElementById('keyboard-tab').setAttribute('aria-selected', true)
  }

  if (document.querySelectorAll('ul#accessibilityTab li').length == 2) {
    document.getElementById('reset-all').style.display = 'none'
  }
})

function contains(selector, text) {
  let elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text, 'i').test(element.textContent);
  })
}
