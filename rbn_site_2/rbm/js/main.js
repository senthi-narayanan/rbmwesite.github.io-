$(function () {
  // sticky navbar
  function onScroll() {
    $('.navbar').toggleClass('scrolled', $(window).scrollTop() > 60);
    $('#toTop').toggleClass('show', $(window).scrollTop() > 500);
    $('.rv:not(.in)').each(function () {
      if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 60) $(this).addClass('in');
    });
  }
  $(window).on('scroll resize', onScroll); onScroll();
  $('#toTop').click(function () { $('html,body').animate({ scrollTop: 0 }, 700); });

  // generic fade slider: .slider with .slide/.t children, optional .dots, .prev, .next
  $('[data-slider]').each(function () {
    var $s = $(this), $items = $s.find('[data-item]'), $dots = $s.find('.dots'), i = 0, timer;
    $items.each(function (n) { $dots.append('<span data-n="' + n + '"></span>'); });
    function go(n) {
      i = (n + $items.length) % $items.length;
      $items.removeClass('on').eq(i).addClass('on');
      $dots.find('span').removeClass('on').eq(i).addClass('on');
    }
    function auto() { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, +$s.data('slider') || 6500); }
    $s.find('.next').click(function () { go(i + 1); auto(); });
    $s.find('.prev').click(function () { go(i - 1); auto(); });
    $dots.on('click', 'span', function () { go(+$(this).data('n')); auto(); });
    go(0); auto();
  });

  // animated counters
  var done = false;
  $(window).on('scroll load', function () {
    var $c = $('.count').first();
    if (done || !$c.length || $c.offset().top > $(window).scrollTop() + $(window).height()) return;
    done = true;
    $('.count').each(function () {
      var $e = $(this), end = +$e.data('to');
      $({ v: 0 }).animate({ v: end }, { duration: 2200, step: function (v) { $e.text(Math.floor(v)); }, complete: function () { $e.text(end); } });
    });
  });

  // project filter
  $('.filters button').click(function () {
    var f = $(this).data('f');
    $('.filters button').removeClass('on'); $(this).addClass('on');
    $('.pitem').each(function () {
      var show = f === 'all' || $(this).data('c') === f;
      $(this)[show ? 'fadeIn' : 'fadeOut'](400);
    });
  });

  // contact form (front-end demo)
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    $(this).find('button[type=submit]').text('Request sent');
    $('#formNote').hide().text('Thank you. Our design team will call you within 24 hours.').fadeIn(500);
    this.reset();
  });
  $('#newsForm').on('submit', function (e) { e.preventDefault(); $(this).find('input').val('').attr('placeholder', 'Subscribed. Thank you.'); });
});
