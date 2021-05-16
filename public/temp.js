$(document).ready(function() {
	var thumb = $("#thumb");
	var slidesPerPage = 1; //globaly define number of elements per page
	var syncedSecondary = true;
	slider.owlCarousel({
		items: 1,
		slideSpeed: 2000,
		nav: false,
		autoplay: false,
		dots: false,
		loop: false,
		responsiveRefreshRate: 200
	}).on('changed.owl.carousel', syncPosition);
	thumb
		.on('initialized.owl.carousel', function() {
			thumb.find(".owl-item").eq(0).addClass("current");
		})
		.owlCarousel({
			items: slidesPerPage,
			dots: false,
			nav: true,
			item: 1,
			smartSpeed: 200,
			slideSpeed: 500,
			slideBy: slidesPerPage,
			navText: ['<svg width="18px" height="18px" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>',
				'<svg width="25px" height="25px" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'
			],
			responsiveRefreshRate: 100
		}).on('changed.owl.carousel', syncPosition2);

	function syncPosition(el) {
		var count = el.item.count - 1;
		var current = Math.round(el.item.index - (el.item.count / 2) - .5);
		if (current < 0) {
			current = count;
		}
		if (current > count) {
			current = 0;
		}
		thumb
			.find(".owl-item")
			.removeClass("current")
			.eq(current)
			.addClass("current");
		var onscreen = thumb.find('.owl-item.active').length - 1;
		var start = thumb.find('.owl-item.active').first().index();
		var end = thumb.find('.owl-item.active').last().index();
		if (current > end) {
			thumb.data('owl.carousel').to(current, 100, true);
		}
		if (current < start) {
			thumb.data('owl.carousel').to(current - onscreen, 100, true);
		}
	}

	function syncPosition2(el) {
		if (syncedSecondary) {
			var number = el.item.index;
			slider.data('owl.carousel').to(number, 100, true);
		}
	}
	thumb.on("click", ".owl-item", function(e) {
		e.preventDefault();
		var number = $(this).index();
		slider.data('owl.carousel').to(number, 300, true);
	});


	$(".qtyminus").on("click", function() {
		var now = $(".qty").val();
		if ($.isNumeric(now)) {
			if (parseInt(now) - 1 > 0) {
				now--;
			}
			$(".qty").val(now);
			$("#quant").val(parseInt(now));
		}
	})
	$(".qtyplus").on("click", function() {
		var now = $(".qty").val();
		if ($.isNumeric(now)) {
			$(".qty").val(parseInt(now) + 1);
			$("#quant").val(parseInt(now) + 1);
		}
	});

	$.ajax({

		url: "/getSellers/" + < %= rows[0].pId % > ,
		type: "GET",
		success: function(data) {

			var len = data.length;


			$("#selldiv").empty();

			if (len == 0) {
				$("#selldiv").append("<h2>No Sellers found</h2>");
				$(".MRP").removeClass("line-through");
				$(".disButton").attr("style", "display:none;");

			} else {

				for (var i = 0; i < len; i++) {
					if (i == 0) {
						var str1 = "<button id='Individualseller' class='sellerButton' style='color:#048f83;box-shadow: 0px 0px 3px #048f83;' value=" + data[i].iId + "><div class='card sellerSide'  style=''><div class='card-body'><div class='row'><div class='col-auto col-8 column1'><h5 class='sellingPrice sp'>" + data[i].bName + "</h5></div><div class='col-auto col-4 column'><h5 id=" + data[i].iId + " class='sellingPrice'>₹ " + data[i].sellerPrice + "</h5></div></div></div></div></button>";
					} else {
						var str1 = "<button id='Individualseller' class='sellerButton' value=" + data[i].iId + "><div class='card sellerSide'  style=''><div class='card-body'><div class='row'><div class='col-auto col-8 column1'><h5 class='sellingPrice sp'>" + data[i].bName + "</h5></div><div class='col-auto col-4 column'><h5 id=" + data[i].iId + " class='sellingPrice'>₹ " + data[i].sellerPrice + "</h5></div></div></div></div></button>";
					}
					$("#selldiv").append(str1);

				}

				$("#sellerPrice").html("₹ " + data[0].sellerPrice);
				$("#youSaved").html("&nbsp; &nbsp; You save ₹ " + ( < %= rows[0].pMrp % > -data[0].sellerPrice));
				$("#youSaved2").html("You save ₹ " + ( < %= rows[0].pMrp % > -data[0].sellerPrice));
				$("#description").html(data[0].iDescription);
				if (data[0].iDelivery == 'Y') {
					$("#deliveryDiv").html('<span style="font-size: 1.2rem;color:#048f83;display:inline;" ><i class="fas fa-check-circle"></i>Home Delivery Avaliable</span>');
				} else {
					$("#deliveryDiv").html('<span style="font-size: 1.2rem;color:red;display:inline;"><i class="fas fa-times-circle"></i>Home Delivery Unavailable<br/></span><span style="color:#048f83;font-size: 1rem;">You can order product and collect it from the shop</span>')
				}
				$("#bName").html(data[0].bName);
				$("#bAddress").html(data[0].bAddress + ', ' + data[0].bCity + ', ' + data[0].bState);
				$("#bMobile").html("Contact No. : " + data[0].bMobile);
				$("#bWebsite").html('<a href=data[0].bWebsite>' + data[0].bWebsite + '</a>');
				alert(data[0].iId);
				$("#invent").val(data[0].iId);
				var size = data[0].iSize.split(",");
				$("#si").empty()
				for (var i = 0; i < size.length; i++) {
					$("#si").append("<option value=" + size[i] + ">" + size[i] + "</option>")
				}
				$("#si").on("change", function() {
					var cat = $(this).val();
					$("#siz").val(cat);
				});
				alert(data[0].iId);
				$("#invent").val(data[0].iId);
			}
		}
	});

	$(document).on("click", '.sellerButton', function(event) {
		var id = $(this).val();
		$(".sellerButton").removeAttr("style");
		$(this).attr('style', 'color:#048f83;box-shadow: 0px 0px 3px #048f83;');

		$.ajax({

			url: "/getSellersOnClick/" + < %= rows[0].pId % > +"/" + id,
			type: "GET",
			success: function(data) {

				$("#sellerPrice").html("₹ " + data[0].sellerPrice);
				$("#youSaved").html("&nbsp; &nbsp; You save ₹ " + ( < %= rows[0].pMrp % > -data[0].sellerPrice));
				$("#youSaved2").html("You save ₹ " + ( < %= rows[0].pMrp % > -data[0].sellerPrice));
				$("#description").html(data[0].iDescription);
				if (data[0].iDelivery == 'Y') {
					$("#deliveryDiv").html('<span style="font-size: 1.2rem;color:#048f83;display:inline;" ><i class="fas fa-check-circle"></i>Home Delivery Avaliable</span>');
				} else {
					$("#deliveryDiv").html('<span style="font-size: 1.2rem;color:red;display:inline;"><i class="fas fa-times-circle"></i>Home Delivery Unavailable<br/></span><span style="color:#048f83;font-size: 1rem;">You can order product and collect it from the shop</span>')
				}
				$("#bName").html(data[0].bName);
				$("#bAddress").html(data[0].bAddress + ', ' + data[0].bCity + ', ' + data[0].bState);
				$("#bMobile").html("Contact No. : " + data[0].bMobile);
				$("#bWebsite").html('<a href=data[0].bWebsite>' + data[0].bWebsite + '</a>');
				$("#" + data[0].iId).text("₹ " + data[0].sellerPrice);
				var size = data[0].iSize.split(",");
				$("#si").empty()
				for (var i = 0; i < size.length; i++) {
					$("#si").append("<option value=" + size[i] + ">" + size[i] + "</option>")
				}
				$("#si").on("change", function() {
					var cat = $(this).val();
					$("#siz").val(cat);
				});
				alert(data[0].iId);
				$("#invent").val(data[0].iId);
			}
		});
	});
});
