Meteor.startup(function(){

  var twitterApi = new TwitMaker(Meteor.settings.twitter);

  var tweets = Tweets.find().fetch();

  _.each(tweets, function(tweet) {
    Tweets.update({_id: tweet._id}, {$set: {sentiment: sentiment(tweet.text, words)}});
  });

  var stream = twitterApi.stream('statuses/filter', {
    track: ['nantesjug']
  })

  stream.on('tweet', Meteor.bindEnvironment(function(tweet) {

    var _sentiment = sentiment(tweet.text, words);

    var _tweet = _.extend(tweet, {sentiment: _sentiment});

    Tweets.insert(_tweet);

  }));

  Meteor.publish('tweets', function() {
    return Tweets.find({'user.screen_name':{$not:{$eq:'anthonny_q'}}});
  })
});
