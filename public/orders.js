$(document).ready(function(){

	// $("#amount").val(<%=rows[0].sellerPrice * data.qty%>);
	// alert($("#amount").val());
	var deliveryCharge = $("#inputdelivery").val();

	$("#Y").on("click", function (event) {
		$("#DeliveryDetails").attr("style","display:block;margin-left:0;margin-bottom:0;margin-right:0;margin-top:2%;");
		$("#sellerAddress").attr("style","display:none;margin-left:0;margin-right:0;margin-top:2%;");
		// $("#inputdelivery").val(rows[0].iDeliveryCharges);
		$("#inputtotal").val(parseInt($("#inputamount").val())+parseInt($("#inputdelivery").val()));
		deliveryCharge = $("#inputdelivery").val();
		console.log($("#inputtotal").val());
		console.log("del"+deliveryCharge);
	});
	$("#N").on("click", function (event) {
		$("#DeliveryDetails").attr("style","margin-left:0;margin-bottom:0;margin-right:0;margin-top:2%;display:none");
		$("#sellerAddress").attr("style","display:block;margin-left:0;margin-right:0;margin-top:2%;");
		$("#inputtotal").val(parseInt($("#inputamount").val()));
		console.log($("#inputtotal").val());

	});
});
