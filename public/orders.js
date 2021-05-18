$(document).ready(function(){
	$("#Y").on("click", function (event) {
		$("#DeliveryDetails").attr("style","display:block;margin-left:0;margin-bottom:0;margin-right:0;margin-top:2%;");
		$("#sellerAddress").attr("style","display:none;margin-left:0;margin-right:0;margin-top:2%;");
	});
	$("#N").on("click", function (event) {
		$("#DeliveryDetails").attr("style","margin-left:0;margin-bottom:0;margin-right:0;margin-top:2%;display:none");
		$("#sellerAddress").attr("style","display:block;margin-left:0;margin-right:0;margin-top:2%;");
	});
});
