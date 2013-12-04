var base = require('cqrs-domain').aggregateBase;
//var itemunits = require('./itemunit.js').unit;
// each __command__ is mapped to an aggregate function   
// after validation the __event__ is applied to the object itself (changing 
// the internal state of the aggregate)

module.exports = base.extend({

    itemunits : function(d){
        this.unit="";
        if(d!= null)
        {
            this.unit = d;
        }
    },

    // Commands
    classtypes: {
        units : "itemunits"
    },
    customattributes : {
        text : "",
        units : []
    },
    createItem: function(data, callback) {
        this.apply(this.toEvent('itemCreated', data));
 
        this.checkBusinessRules(callback);
    },
 
    changeItem: function(data, callback) {
        this.apply(this.toEvent('itemChanged', data));
 
        this.checkBusinessRules(callback);
    },

    deleteItem: function(data, callback) {
        this.apply(this.toEvent('itemDeleted', data));
 
        this.checkBusinessRules(callback);
    },
 
 
    // Events
  
    itemCreated: function(data) {
        this.set(data);
        // or: this.set('text', data.text);
    },

    itemChanged: function(data) {
        this.set(data);
        // or: this.set('text', data.text);
    },
 
    itemDeleted: function(data) {
        this.set('destroyed', true);
    }
 
});

