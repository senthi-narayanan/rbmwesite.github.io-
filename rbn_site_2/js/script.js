$(function () {
        const $gate = $(".gate");
        const $images = $(".gate__image");
        const $buttons = $(".gate__button");

        function showSide(side) {
          $images.each(function () {
            const active = $(this).data("side") === side;
            $(this).toggleClass("is-active", active);
          });
          $buttons.each(function () {
            const active = $(this).data("choice") === side;
            $(this).toggleClass("is-active", active).attr("aria-pressed", String(active));
          });
        }

        $buttons.on("mouseenter focus", function () {
          showSide($(this).data("choice"));
        });
        $buttons.on("click", function () {
          showSide($(this).data("choice"));
        });
        $gate.on("mouseleave", function () {
          showSide(null);
        });
        $gate.on("focusin", ".brand", function () {
          showSide(null);
        });
      });
