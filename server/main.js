Meteor.startup(function(){

  var twitterApi = new TwitMaker(Meteor.settings.twitter);

  var tweets = Tweets.find().fetch();

  _.each(tweets, function(tweet) {
    Tweets.update({_id: tweet._id}, {$set: {sentiment: sentiment(tweet.text, words)}});
  });

  var stream = twitterApi.stream('statuses/filter', {
    track: Meteor.settings.public.tags
  })

  stream.on('tweet', Meteor.bindEnvironment(function(tweet) {

    var _sentiment = sentiment(tweet.text, words);

    var _tweet = _.extend(tweet, {sentiment: _sentiment});
    _tweet.created_at_date = moment(Number(_tweet.timestamp_ms)).toDate();
    //console.log(_tweet);
    Tweets.insert(_tweet);

  }));

  Meteor.publish('tweets', function(params) {
    var query = {};

    if (params.beginDate && params.endDate)
      query.timestamp_ms = {
        '$gte': ''+params.beginDate,
        '$lte': ''+params.endDate
      }

    if (params.tags) {
      var tags = params.tags.split(' ');
      tags = tags.map(function (tag) {
        return new RegExp(tag.substring(1), 'i');
      });
      query['entities.hashtags.text'] = {
        '$in': tags
      }

    };
    return Tweets.find(query);
  })
});
