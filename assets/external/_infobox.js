function drawInfobox(category, infoboxContent, json, i){

    if(json.data[i].color)          { var color = json.data[i].color }
        else                        { color = '' }
    if( json.data[i].price )        { var price = '<div class="price">$' + json.data[i].price +  '</div>' }
        else                        { price = '(free)' }
    if(json.data[i].id)             { var id = json.data[i].id }
        else                        { id = '' }
    if(json.data[i].url)            { var url = json.data[i].url }
        else                        { url = '' }
    if(json.data[i].type)           { var type = json.data[i].type }
        else                        { type = '' }
    if(json.data[i].title)          { var title = json.data[i].title }
        else                        { title = '' }
    if(json.data[i].location)       { var location = json.data[i].location }
        else                        { location = '' }
    if(json.data[i].gallery[0])     { var gallery = json.data[i].gallery[0] }
        else                        { gallery[0] = '../img/default-item.jpg' }

    var ibContent = '';
    ibContent =
  //  '<div class="favbox" ><a class="favboxa" data-id="'+id+'"><i class="fa fa-lg fa-heart"></i></a></div>' +
    '<div class="infobox ' + color + '">' +
        '<div class="inner">' +
            '<div class="image">' +
                '<div class="item-specific">' + drawItemSpecific(category, json, i) + '</div>' +
                '<div class="overlay">' +
                    '<div class="wrapper">' +
                        // '<a href="#" class="quick-view" data-toggle="modal" data-target="#modal" id="' + id + '">Quick View</a>' +
                        '<hr>' +
                        '<a data-url="' + url +  '" class="detail item-link">Go to Detail</a>' +
                    '</div>' +
                '</div>' +
                // todo
                // should remove below someday
                // '<a href="'+url+'"data-url="' + url +  '" class="item-link description">' +
                '<a data-id="'+id+'" data-url="' + url +  '" class="item-link description">' +
                    '<div class="meta">' +
                         price +
                        '<h2>' + title +  '</h2>' +
                        // '<figure>' + location +  '</figure>' +
                        '<i class="fa fa-angle-right"></i>' +
                    '</div>' +
                '</a>' +
                // '<img src="' + gallery +  '">' +
            '</div>' +
        '</div>' +
    '</div>';

    return ibContent;
}
