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
})
