$(document).ready(function() {

  show();
  //点击出现弹窗
  function show() {
    $(".search-location span").on("click", function() {
      $(".choose-warp").css("display", "block");
    })
    $(".close-list").on("click", function() {
      $(".choose-warp").css("display", "none");
    })
  }

  chooseBrand()
  //选择品牌
  function chooseBrand() {
    $(".brand-list li").on("click", function() {
      $(".brand").html($(this).html());
      $(".choose-warp").css("display", "none");
    })
  }

  pullDown();
  //品牌列表下拉
  function pullDown() {
    $(".pull-down").on("click", function() {
      var a;
      if ($(this).attr("data") == 1) {
        a = 8;
        $(this).addClass("whirl-bottom");
        var timeDown = setInterval(function() {
          a = a + 0.5;
          if (a >= 16) {
            clearInterval(timeDown);
            $(".pull-down").attr("data", 2);
          }
          $(".logoList").css("height", "" + a + "rem");
        }, 30);
      } else {
        a = 16;
        $(this).removeClass("whirl-bottom").addClass("whirl-top");
        var timeUp = setInterval(function() {
          a = a - 0.5;
          $(".logoList").css("height", "" + a + "rem");
          if (a <= 8) {
            clearInterval(timeUp);
            $(".logoList").css("height", "8rem");
            $(".pull-down").attr("data", 1).removeClass("whirl-top");
          }
        }, 30);
      }
    })
  }
})
