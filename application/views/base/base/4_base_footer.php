<?php if($view == 'base/login/login_view') : ?>
</div>
<?php else : ?>
<footer class="main-footer">
    <div class="container-fluid">
        <div class="row">
            <div class="col text-center">
                <p><a rel="nofollow" href="http://www.tawdis.net" title="Análisis de la accesibilidad de la página con TAW"><img style="border: 0; width: 60px; height: 31px;" src="<?php echo base_url()?>asset/img/taw.png" alt="TAW. Nivel doble A. WCAG 1.0 WAI"></a>
                    <a href="http://www.w3.org/WAI/WCAG1AA-Conformance" title="Explicación del Nivel Doble-A de
                          Conformidad"><img height="32" width="88" src="http://www.w3.org/WAI/wcag1AA-blue" alt="Icono de conformidad con el Nivel Doble-A,
                            de las Directrices de Accesibilidad para el
                            Contenido Web 1.0 del W3C-WAI"></a></p>
            </div>
        </div>
    </div>
</footer>
</div>
</div>
</div>
<?php endif;?>
<!-- js placed at the end of the document so the pages load faster -->
<script src="<?php echo base_url() ?>asset/js/jquery.js"></script>
<script src="<?php echo base_url() ?>asset/js/jquery.awesome-cursor.min.js"></script>
<script src="<?php echo base_url() ?>asset/js/bootstrap-colorpicker.js"></script>
<script src="<?php echo base_url() ?>asset/js/modifyStyle.js"></script>
<script src="<?php echo base_url() ?>asset/js/popper.js"></script>
<script src="<?php echo base_url()?>asset/js/bootstrap.min.js"></script>
<!--common script for all pages
<script src="<?php echo base_url()?>asset/js/common-scripts.js"></script>-->
<script src="<?php echo base_url()?>asset/js/artyom.js"></script>
<script src="<?php echo base_url()?>asset/js/screenReader.js"></script>
</body>
<script>
    $(document).ready(function() {
        $(document).ready(function() {
            "use strict";
            $("#search").on("click", function(e) {
                e.preventDefault(), $(".search-box").fadeIn()
            }), $(".dismiss").on("click", function() {
                $(".search-box").fadeOut()
            }), $(".card-close a.remove").on("click", function(e) {
                e.preventDefault(), $(this).parents(".card").fadeOut()
            }), $(".dropdown").on("show.bs.dropdown", function() {
                $(this).find(".dropdown-menu").first().stop(!0, !0).fadeIn()
            }), $(".dropdown").on("hide.bs.dropdown", function() {
                $(this).find(".dropdown-menu").first().stop(!0, !0).fadeOut()
            }), $("#toggle-btn").on("click", function(e) {
                e.preventDefault(), $(this).toggleClass("active"), $(".side-navbar").toggleClass("shrinked"), $(".content-inner").toggleClass("active"), $(document).trigger("sidebarChanged"), $(window).outerWidth() > 1183 && ($("#toggle-btn").hasClass("active") ? ($(".navbar-header .brand-small").hide(), $(".navbar-header .brand-big").show()) : ($(".navbar-header .brand-small").show(), $(".navbar-header .brand-big").hide())), $(window).outerWidth() < 1183 && $(".navbar-header .brand-small").show()
            }), $(".form-validate").each(function() {
                $(this).validate({
                    errorElement: "div",
                    errorClass: "is-invalid",
                    validClass: "is-valid",
                    ignore: ":hidden:not(.summernote, .checkbox-template, .form-control-custom),.note-editable.card-block",
                    errorPlacement: function(e, t) {
                        e.addClass("invalid-feedback"), console.log(t), "checkbox" === t.prop("type") ? e.insertAfter(t.siblings("label")) : e.insertAfter(t)
                    }
                })
            });
            var e = $("input.input-material");
            e.filter(function() {
                return "" !== $(this).val()
            }).siblings(".label-material").addClass("active"), e.on("focus", function() {
                $(this).siblings(".label-material").addClass("active")
            }), e.on("blur", function() {
                $(this).siblings(".label-material").removeClass("active"), "" !== $(this).val() ? $(this).siblings(".label-material").addClass("active") : $(this).siblings(".label-material").removeClass("active")
            });
            var t = $(".content-inner");

            function n() {
                var e = $(".main-footer").outerHeight();
                t.css("padding-bottom", e + "px")
            }
            $(document).on("sidebarChanged", function() {
                n()
            }), $(window).on("resize", function() {
                n()
            }), $(".external").on("click", function(e) {
                e.preventDefault(), window.open($(this).attr("href"))
            });
        });
        function setModalMaxHeight(element) {
  this.$element     = $(element);
  this.$content     = this.$element.find('.modal-content');
  var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight();
  var dialogMargin  = $(window).width() < 768 ? 20 : 60;
  var contentHeight = $(window).height() - (dialogMargin + borderWidth);
  var headerHeight  = this.$element.find('.modal-header').outerHeight() || 0;
  var footerHeight  = this.$element.find('.modal-footer').outerHeight() || 0;
  var maxHeight     = contentHeight - (headerHeight + footerHeight);

  this.$content.css({
      'overflow': 'hidden'
  });

  this.$element
    .find('.modal-body').css({
      'max-height': maxHeight,
      'overflow-y': 'auto'
  });
}

$('.modal').on('show.bs.modal', function() {
  $(this).show();
  setModalMaxHeight(this);
});

$(window).resize(function() {
  if ($('.modal.in').length != 0) {
    setModalMaxHeight($('.modal.in'));
  }
});
    let idView = '<?php echo $id_view; ?>';
    $("#"+idView).addClass('active');
    });
</script>

</html>
