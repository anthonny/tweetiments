Template.tweet.helpers({
  getCssClass: function(sentiment){
    if (sentiment.score >0)
      return 'positive';
    if (sentiment.score <0)
      return 'negative';

    return 'neutral';
  },

  ago: function(ts) {
    return moment(Number(ts)).fromNow();
  }
});
