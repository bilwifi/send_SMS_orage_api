$(function() {
  ["to", "smsbody"].forEach(function(field) {
    $("#" + field).attr("required", true);
    $("#" + field).focus(function() {
      $(".success-help").fadeOut("fast");
    });
  });

  $(".sendSMS").submit(function(e) {
    $(".mdl-spinner").fadeIn("slow").css("display", "inline-block");
    e.preventDefault();
    var to = $("#to").val();
    var smsbody = $("#smsbody").val();
    var key = $("#token").val();
    var settings = {
      "url": "https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B+2430000/requests",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      "data": JSON.stringify({
        "outboundSMSMessageRequest": {
          "address": `tel:${to}`,
          "senderAddress": "tel:+2430000",
          "outboundSMSTextMessage": {
            "message": smsbody
          }
        }
      }),
    };
    
    $.ajax({
      ...settings, 
      error: function() {
        $(".mdl-spinner").fadeOut("fast");
        $(".success-help").html("An error has occurred").fadeIn("slow");
      },
      success: function(data) {
        $(".mdl-spinner").fadeOut("fast");
        ["to", "smsbody"].forEach(function(field) {
          $("#" + field).val("");
        });
        $(".success-help").fadeIn("slow");
      },
      type: "POST"
    });
    
  });
});