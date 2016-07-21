import request from 'superagent';
import cheerio from 'cheerio';

module.exports = {

  addPostItem: async(url, likeId, lat , lon) => {
    try {
      let crawlHtml = await request.get(url);
      let $ = cheerio.load(crawlHtml.text);
      let itemsArray = [];
      let userArray = [];
      let postsArray = [];
      let items = $(".pdt-card");
      console.log("!!!!!!!!!!!!",items);
      items.map(function(i, elem) {
        itemsArray.push({
      		"itemname": $(this).find(".pdt-card-title").text().replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,''),
      		"LikeId": likeId
        });
        userArray.push({
          "username": $(this).find(".pdt-card-username").text(),
          "email": $(this).find(".pdt-card-username").text() +"@gmail.com"
        });
        let latitude = lat + Math.random()/20;
        let longitude = lon + Math.random()/20;
        postsArray.push({
    			"title": $(this).find(".pdt-card-title").text().replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,''),
    			"price": $(this).find(".pdt-card-price").find("span").text().split('$')[1],
    			"content": $(this).find(".pdt-card-title").text().replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,''),
          "startDate": 0,
    			"mode": "give",
    			"latitude": latitude,
    			"longitude": longitude,
    			"images": $(this).find("img").attr("src"),
        });
      });
      await* itemsArray.map(async (elem, i) => {
        let item = await Item.create(elem);
        let user = await User.findOrCreate({
          where:{
            email: userArray[i].email
          },
          defaults: userArray[i]
        });
        console.log("!!!!!!!",user);
        postsArray[i].ItemId = item.id;
        postsArray[i].UserId = user[0].id;
        let post = await Post.create(postsArray[i]);
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}
