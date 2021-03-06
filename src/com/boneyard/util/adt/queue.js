/**
*	@module com.boneyard.util.adt
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
define(['util/adt/collection'], function(Collection) {

	/**
	*	Defines the interface of a FIFO Queue (FirstIn-FirstOut)
	*	<h5>Usages:</h5>
	*
	*		var myqueue = new Queue([], { capacity: 5 }); // initial is set to capacity was set to 5
	*			myqueue.addAll([{ name: 1 }, { name: 2 }]); // using 'addAll' from com.boneyard.util.adt.Collection
	*			myqueue.offer({ name: 3 }); // or adding one by one.
	*			myqueue.poll();
	*
	*		var myqueue = new Queue([], { capacity: 3, interface: Boneyard.Class });
	*			myqueue.addAll([{ name: 1 }, { name: 2 }]); // using 'addAll' from com.boneyard.util.adt.Collection
	*			myqueue.offer({ name: 3 }); // or adding one by one.
	*			myqueue.poll();
	*
	*	@namespace com.boneyard.util.adt
	*	@class com.boneyard.util.adt.Queue
	*	@extends com.boneyard.util.adt.Collection
	*
	*	@requires com.boneyard.util.adt.Collection
	**/
	var Queue = Boneyard.namespace('com.boneyard.util.adt.Queue', Collection.inherit({

		/**
		*	Queue capacity
		*	@public
		*	@property capacity
		*	@type Number
		**/
		capacity: 0,

		/**
		*	Initialize
		*	@public
		*	@chainable
		*	@method initialize
		*	@param initial {Array} initial collection of elements in the queue.
		*	@param opts {Object} Additional options.
		*	@return com.boneyard.util.adt.Queue
		**/
		initialize: function(initial, opts) {
			return Queue.__super__.initialize.apply(this, arguments);
		},

		/**
		*	Validate capacity of the queue to add or not the element in the queue.
		*	@private
		*	@method _valid
		*	@param element {Object} element to be evaluated.
		*	@return Boolean
		**/
		_valid: function(element) {
			if(this.size() >= this.capacity) return false;
			return Queue.__super__._valid.apply(this, arguments);
		},

		/**
		*	Set the initial state of the queue
		*	@public
		*	@method set
		*	@param arr {Array} initial elements in the collection.
		*	@param opts {Object} Additional options.
		*	@return {com.boneyard.util.adt.Queue}
		**/
		set: function(arr, opts) {
			opts || (opts = {});
			if(_.isUndefined(opts.capacity)) throw new Error('Queue requires a \'capacity\' property in order to be instanciate it.');
			if(arr.length > opts.capacity) throw new Error('Queue element\'s collection passed overflows the current capacity [' + opts.capacity + '].');
			this.capacity = opts.capacity;
			Queue.__super__.set.apply(this, arguments);
			return this;
		},

		/**
		*	Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
		*	@public
		*	@method offer
		*	@param element {Object} element to be inserted.
		*	@return Boolean
		**/
		offer: function(element) {
			if(!this._valid(element)) return false;
			(!_.isNull(this._interface)) ?
				this.collection.push(new this._interface(element)) :
				this.collection.push(element);
			return true;
		},

		/**
		*	Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
		*	@public
		*	@method peek
		*	@return Object
		**/
		peek: function() {
			return (this.size() > 0) ? this.collection[0] : null;
		},

		/**
		*	Retrieves and removes the head of this queue, or returns null if this queue is empty.
		*	@public
		*	@method poll
		*	@return Object
		**/
		poll: function() {
			return (this.size() > 0) ? this.remove(0) : null;
		}

	}, {

		/**
		*	@static
		*	@property NAME
		*	@type String
		**/
		NAME: 'Queue'

	}));

	return Queue;

});
