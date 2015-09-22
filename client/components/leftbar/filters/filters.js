var sessionTweetsHandler = false;

Template.filters.events({
  "submit #filters": function(event){
    event.preventDefault();
    Session.set("filter-userId", {});

    var date = event.target['date'].value;

    var beginDate = moment(date)
      .hours(event.target['begin-hour'].value)
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .utc()
      .valueOf();
    var endDate = moment(date)
      .hours(event.target['end-hour'].value)
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .utc()
      .valueOf();
    var tags = event.target['tags'].value || "";

    if (sessionTweetsHandler)
      sessionTweetsHandler.stop();

    sessionTweetsHandler = Meteor.subscribe("tweets", {
      beginDate: beginDate,
      endDate: endDate,
      tags: tags
    });


  }
});

Template.filters.rendered = function(){
  sessionTweetsHandler = Meteor.subscribe("tweets", {});
}
