Template.tweets.helpers({
  tweets: function(){
    return Tweets.find(Session.get("filter-userId"), {sort: {created_at_date: -1}});
  }
});
