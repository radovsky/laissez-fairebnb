Kelp.Views.BusinessesFilter = Backbone.View.extend({
    template: JST['businesses/filter'],
	
    render: function() {
        var renderedContent = this.template({
            business: this.model
        });
        this.$el.html(renderedContent);
        this.initSlider();
        this.initDatePickers();
        return this;
    },
  
    updateAmount: function(value1, value2) {
        console.log("v1: " + value1 + ",v2: " + value2);
    },
  
    initDatePickers: function() {
        this.$('.input-daterange').datepicker({
            todayBtn: "linked",
            startDate: "today",
        });

        this.$('#start').on('changeDate', function(event) {
            this.$('#end').datepicker('setStartDate', event.date);
        });

        this.$('#end').on('changeDate', function(event) {
            this.$('#start').datepicker('setEndDate', event.date);
        });
    },
  
    initSlider: function() {
        var that = this;
        this.$('#slider').slider({
            range: true,
            min: 0,
            max: 1000,
            values: [ 0, 1000 ],
            slide: function( event, ui ) {
                $( "#amount" ).val(
                     "$" + 
                     ui.values[ 0 ] + 
                     " - $" + 
                     ui.values[ 1 ] 
                 );
            },
            stop: function(event, ui) {
                that.collection.trigger('filterRange', ui.values);
            }
        });
    }
});