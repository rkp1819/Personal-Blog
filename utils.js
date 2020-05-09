exports.storePost = function(req, res, Post){
  post = new Post({
    title: req.body.title,
    post: req.body.post
  });
  post.save();
}

exports.findPosts = function(req, res, Post, homeStartingContent){
  Post.find(function(err, posts){
    if(err){
      console.log(err);
    } else{
      console.log("posts: ",posts);
      res.render('home',{homeStartingContent: homeStartingContent, posts: posts});
    }
  });
}

exports.findPost = function(req, res, Post, id){
  Post.find({ _id: id }, {}, function(err, post){
    if(err){
      console.log(err);
    }else {
      console.log("posts: ", post);
      console.log(post[0]['title'], post[0]['post']);
      res.render('post', {title: post[0]['title'], post: post[0]['post']})
    }
  });
}
