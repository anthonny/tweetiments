Template.tweets.helpers({
  tweets: function(){
    return Tweets.find({}, {sort: {'created_at': -1}, limit: 5});
  }
});
