Template.users.helpers({
  users: function(){
    var tweets = Tweets.find({}).fetch();

    var users = _.reduce(tweets, function (memo, tweet) {
      if (!memo[tweet.user.id])
        memo[tweet.user.id] = {
          id: tweet.user.id,
          name: tweet.user.name,
          screen_name: tweet.user.screen_name,
          profile_image_url: tweet.user.profile_image_url,
          count: 0
        };

      memo[tweet.user.id].count++;
      return memo;
    }, []);

    users = _.values(users);

    return _.sortBy(users, function (tweet) {
      return -tweet.count;
    });

  },

  isActive: function(id) {
    var current = Session.get("filter-userId")['user.id_str'];
    return current === ''+id ? 'active':'';
  }
});

Template.users.events({
  "click a.user": function(event, t){
    event.preventDefault();

    var id = event.currentTarget.getAttribute('data-userid');
    var current = Session.get("filter-userId")['user.id_str']

    if (id === current)
      Session.set("filter-userId", {});
    else
      Session.set("filter-userId", {'user.id_str': event.currentTarget.getAttribute('data-userid')});
  }
});
