AOS.init({
  duration: 700
});

$(".to-top").on("click", function () {
  $("html, body").animate({
      scrollTop: 0
    },
    3000
  );
});

$(function () {
  $(".banner-text").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top - 170;
    $("body,html").animate({
        scrollTop: top
      },
      2500
    );
  });
});

$(() => {
  var lastId,
    topMenu = $(".header"),
    topMenuHeight = topMenu.outerHeight() + 15,

    menuItems = topMenu.find("a"),

    scrollItems = menuItems.map(function () {
      var item = $($(this).attr("href"));
      if (item.length) {
        return item;
      }
    });

  menuItems.click(function (e) {
    var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, 2500);
    e.preventDefault();
  });

  $(window).scroll(function () {
    var fromTop = $(this).scrollTop() + topMenuHeight;
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop)
        return this;
    });
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      menuItems.parent().removeClass("active").end().filter("[href='#" + id + "']").parent().addClass("active");
    }
  });
})


$(document).ready(function () {
  $('#hamb-icon').click(function () {
    $(this).toggleClass('open');
  });
});

$('.rolldown-list li').each(function () {
  var delay = ($(this).index() / 4) + 's';
  $(this).css({
    webkitAnimationDelay: delay,
    mozAnimationDelay: delay,
    animationDelay: delay
  });
});

$('.hamburger-link').on('click', function () {
  $('#myList').toggleClass('rolldown-list');
});

$('.header-item').hover(
  function () {
    $(this).addClass('active')
  },
  function () {
    $(this).removeClass('active')
  }
);

$(function () {
  let windowWidth = $(window).width();
  if (windowWidth < 768) {
    $(window).scroll(function () {
      if ($(this).scrollTop() >= 500) {
        $(".m-header").fadeIn(500);
      } else {
        $(".m-header").fadeOut(500);
      }
    });
  } else {
    return false;
  }
});

$(() => {
  const rootNode = document.querySelector('.main');
  const headerTitle = document.querySelector('#header-title');

  const findFirstNodeInViewport = () => {
    const {
      children
    } = rootNode;
    return [...children].find((child) => {
      const {
        top,
        height
      } = child.getBoundingClientRect();
      return Math.abs(top) >= 0 && Math.abs(top) < height;
    })
  }
  const setHeaderText = (newValue) => {
    const currentValue = headerTitle.innerText;
    if (currentValue !== newValue) {
      headerTitle.innerText = `Этап ${newValue}.`;
    }
  }

  setHeaderText(findFirstNodeInViewport().innerText);
  window.addEventListener('scroll', () => {
    setHeaderText(findFirstNodeInViewport().innerText);
  })
});