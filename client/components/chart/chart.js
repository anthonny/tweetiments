Template.chart.helpers({
  count: function(){
    return Tweets.find().count();
  }
});

Template.chart.rendered = function(){

  function renderChart() {
    var scores = _.reduce(Tweets.find().fetch(), function(memo, tweet) {
      if (tweet.sentiment) {
         if (tweet.sentiment.score > 0)
           memo.positive += 1;
         if (tweet.sentiment.score < 0)
           memo.negative += 1;
         if (tweet.sentiment.score === 0)
           memo.neutral += 1;
      }

     return memo;
    }, {
     positive: 0,
     negative: 0,
     neutral: 0
    });

    var data = [
      {
          value: scores.negative,
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: "Negative"
      },
      {
          value: scores.positive,
          color: "#46BFBD",
          highlight: "#5AD3D1",
          label: "Positive"
      },
      {
          value: scores.neutral,
          color: "#FDB45C",
          highlight: "#FFC870",
          label: "Neutral"
      }
    ];

    var ctx = $("#chart").get(0).getContext("2d");
    var myDoughnutChart = new Chart(ctx).Doughnut(data,{animateRotate : false, responsive : true});
  }

  Tracker.autorun(renderChart);

}
