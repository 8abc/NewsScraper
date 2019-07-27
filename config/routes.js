module.exports = function(router) {
    // renders homepage
    router.get("/", (req,res)=> {
        res.render("index");
    });
    // renders saved articles page
    router.get("/articles", (req,res)=> {
        res.render("article");
    }); 
}
