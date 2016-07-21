var page = 'createCategory';

myApp.onPageInit(page, function(page) {

  $$('.hobbyItem').click(function() {
    if ($$(this).find('input').prop("checked"))
      $$(this).find('input').prop("checked", false);
    else
      $$(this).find('input').prop("checked", true);

    var storedData = myApp.formToJSON('#createCategoryChoose');
    myApp.formStoreData('createCategoryChoose', storedData);

    var id = $$(this).find('input').val();

    myApp.getCurrentView().router.load({
      url: "/post/create",
      reload: true,
      pushState: false,
      pushStateOnLoad: false,
    });
    console.log(storedData);

  });
});

myApp.onPageBack(page, function(page) {


});

//
myApp.onPageBeforeRemove(page, function(page) {


});
