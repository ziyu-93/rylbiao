$(document).ready(function() {

  init()

  function init() {
    imgH();
    textArea();
    upload();
    star();
    getAjax();
    submit();
    //mapImg();
    enlarge();
    $("#map").css("opacity", "1");
    $(".load").css("display", "none");
  }

  //图片高度 和 图片数量
  function imgH() {
    $(".pic>img").height($(".pic>img").width());
    $(".upload-bt").height($(".upload-bt").width());
  }


  //textarea 字数
  function textArea() {
    $(".text-wrap textarea").on("input", function() {
      textnum = $(this).val().length;
      if (textnum > 190) {
        $(".num").css({
          "color": "red",
          "font-weight": "600"
        });
      } else {
        $(".num").css({
          "color": "black",
          "font-weight": "300"
        });
      }
      $(".num").html(textnum);
      if (textnum >= 200) {
        $(".num").html(200);
      }
    })
  }


  //上传图片
  function upload() {
    $('#upload_image').on("change", function(event) {
      var files = event.target.files,
        file;
      if (files && files.length > 0 && files.length <= 6) {
        var a = $(".upload").find(".upload-item");
        files = Array.prototype.slice.call(files);
        var other = 6 - a.length;
        if (a && files.length > other) {
          files = files.slice(0, other);
        }
        file = files;
        var URL = window.URL || window.webkitURL;
        // 通过 file 生成目标 url
        var wid = $(".upload-bt").width();
        for (var i = 0; i < file.length; i++) {
          var imgURL = URL.createObjectURL(file[i]);
          $(".upload").prepend($('<img/>').attr({
            'src': imgURL,
            "class": "upload-item",
            "height": wid
          }));
        }
        if ($(".upload").find(".upload-item").length >= 6) {
          $(".upload-bt").hide();
        } else {
          $(".upload-bt").show();
        }
      } else if (files.length > 6) {
        alert("最多上传6张图片")
      }
    });
  }


  //星星数量
  function star() {
    $(".comment-star").on("click", function() {
      $(".comment-star").attr("src", "../img/hide-star.png");
      var showStar = $(this).attr("data") * 1;
      for (var i = 1; i < showStar + 1; i++) {
        $(".comment-star:nth-of-type(" + i + ")").attr("src", "../img/show-star.png");
      }
    })
  }

  //提交评价
  function submit() {
    $(".submit").on("click", function() {
      alert("上传成功");
    })
  }


  //地图图片
  function mapImg() {
    var name = $(".location-name").html();
    $(".mapp").attr("src", "http://api.map.baidu.com/staticimage?width=400&height=180&zoom=18&markers=" + name + "").css({
      "color": "blue"
    })
  }

  //getAjax();
  //地图
  //创建地图函数：
  function createMap(x, y) {
    var map = new BMap.Map("dituContent"); //在百度地图容器中创建一个地图
    var point = new BMap.Point(x, y); //定义一个中心点坐标
    map.centerAndZoom(point, 16); //设定地图的中心点和坐标并将地图显示在地图容器中


    window.map = map; //将map变量存储在全局
    //
    var local = new BMap.LocalSearch(map, {
      renderOptions: {
        map: map
      }
    });
    var name = $(".destination").html();
    local.search(name);
  }

  //调取位置经纬度
  function getAjax() {
    var locationName = $(".destination").html();
    var shopName = $(".location-name").html();
    var url = "http://api.map.baidu.com/place/v2/search?q=" + shopName + "&region=北京&output=json&ak=CFl65IH1HyiLKmGytgDbr5xvm5me8xWU";
    $.ajax({
      url: url,
      dataType: "jsonp",
      jsonp: "callback",
      success: function(data) {
        var x = data.results[0].location.lat;
        var y = data.results[0].location.lng;
        createMap(x, y);
        toSomewhere(x, y, shopName, locationName);
      }
    })
  }


  //goto=> somewhere;
  function toSomewhere(x, y, shopName, locationName) {
    $(".go-here").on("click", function() {
      window.location.href = "http://api.map.baidu.com/marker?location=" + x + "," + y + "&title=" + shopName + "&content=" + locationName + "&output=html&src=百度地图";
    })
  }


  //点击评论图片放大
  function enlarge() {
    $(".pic img").on("click", function() {
      $(".img-swiper").css("display", "block");
      var largeImgStr = "";
      var imgArr = $(this).parent().children("img");
      var dotArr = "";
      var current = $(this).index();
      for (var j = 0; j < imgArr.length; j++) {
        var imgSrc = $(imgArr[j]).attr("src");
        largeImgStr = largeImgStr + "<div class=\"swiper-slide imgArrItem\"><img src=\"" + imgSrc + "\" alt=\"\"></div>";
        dotArr = dotArr + "<span class=\"swiper-pagination-bullet\"></span>";
      }
      $(".swiper-wrapper").html(largeImgStr);
      $(".swiper-pagination").html(dotArr);

      var mySwiper = new Swiper('.swiper-container', {
        //autoplay: 5000, //可选选项，自动滑动
        pagination: "swiper-pagination",
        autoplayDisableOnInteraction: false,
        observer: true,
        onTransitionStart: function(swiper) {
          showItem();
        }
      });
      var a = (current * (-$(window).width())) + "px";
      $(".swiper-wrapper").css("transform", "translate3d(" + a + ", 0px, 0px)");
      $($(".swiper-pagination span")[current]).addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
      $(".img-swiper").on("click", function() {
        $(this).css("display", "none");
      })
    })
  }

  function showItem() {
    var swiperItem = $(".swiper-wrapper div");
    for (var i = 0; i < swiperItem.length; i++) {
      if ($(swiperItem[i]).hasClass("swiper-slide-active")) {
        $($(".swiper-pagination span")[i]).addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active");
      }
    }
  }


})
