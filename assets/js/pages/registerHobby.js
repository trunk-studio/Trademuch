// $$(document).on('pageInit', '.page[data-page="registerHobby"]', function(e) {

var page = "registerHobby";

myApp.onPageAfterAnimation(page, function(page) {

  console.log("registerHobby!!!!!!!!");

  var storedData = myApp.formToJSON('#hobbySelect');
  myApp.formStoreData('hobbySelect', storedData);
  $$("#nextSetp").attr("data-context", JSON.stringify(storedData));
  console.log($$("#nextSetp").attr("data-context"));

  if (storedData.hobby.length > 0) {
    $$('#nextSetp').removeAttr("disabled");
  } else {
    $$('#nextSetp').attr("disabled", true);
  }

  $$("#nextSetp").click(function(){
    myApp.getCurrentView().router.load({
      url:"/templates/finish.html",
      ignoreCache:true,
      reload:true,
      pushState:false,
    });
  });

  $$('.hobbyItem').on('click', function() {
    if ($$(this).find('input').prop("checked")) {
      $$(this).find('.checked').hide();
      $$(this).find('input').prop("checked", false);
    } else {
      $$(this).find('.checked').show();
      $$(this).find('input').prop("checked", true);
    }

    var storedData = myApp.formToJSON('#hobbySelect');
    myApp.formStoreData('hobbySelect', storedData);
    $$("#nextSetp").attr("data-context", JSON.stringify(storedData));
    if (storedData.hobby.length > 0) {
      $$('#nextSetp').removeAttr("disabled");
    } else {
      $$('#nextSetp').attr("disabled", true);
    }
  }); // end click

  // random selection
  var nums = [];
  for (var i = 0; i <= 8; i++) {
    nums[i] = Math.round(Math.random() * 15 + 4);
    if (i == 8) nums[i + 1] = Math.round(Math.random() * 2 + 1);
  }
  $$.each(nums, function(index, num) {
    if (num < $$('.hobbyItem').length) {
      $$('.hobbyItem')[num].click();
    }
  });
  // force click 1st item.
  $$('.hobbyItem')[0].click();


}); // end registerHobby
