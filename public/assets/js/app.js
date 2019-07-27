$("#newArticles").on("click", function(event) {
  event.preventDefault();
  $.ajax({
    url: "/scrape",
    method: "GET"
    // We store all of the retrieved data inside of an object called "response"
  }).then(function(response) {
    //logs results of the object
    console.log(response.data);
  });
});
