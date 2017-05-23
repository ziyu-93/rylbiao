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
      var a = $(".logoList").height();
      if ($(this).attr("data") == 1) {
        $(this).addClass("whirl-bottom");
        var timeDown = setInterval(function() {
          a = a + 10;
          if (a >= 320) {
            clearInterval(timeDown);
            $(".pull-down").attr("data", 2);
          }
          $(".logoList").height(a);
        }, 30);
      } else {
        $(this).removeClass("whirl-bottom").addClass("whirl-top");
        var timeUp = setInterval(function() {
          a = a - 10;
          $(".logoList").height(a);
          if (a <= 160) {
            clearInterval(timeUp);
            $(".logoList").height(160);
            $(".pull-down").attr("data", 1).removeClass("whirl-top");
          }
        }, 30);
      }
    })
  }
})
