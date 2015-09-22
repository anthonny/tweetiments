Template.photos.helpers({
  photos: function(){
    var params = _.extend({'extended_entities.media': {$exists: true}}, Session.get("filter-userId"));

    var cursor = Tweets.find(params, {sort: {created_at_date: -1}});
    cursor.observe({
      added: function() {
        Meteor.defer(function() {
         $('.materialboxed').materialbox();
       });

      }
    });
    return cursor;
  },

  eq: function(value, expected){
    return expected === value;
  }
});
