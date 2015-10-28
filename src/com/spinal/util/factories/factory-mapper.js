/**
*	@module com.spinal.util.factories
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
define(['util/factories/async-factory',
	'util/object'], function(AsyncFactory, ObjectUtil) {

	/**
	*	Class FactoryMapper
	*	@namespace com.spinal.util.factories
	*	@class com.spinal.util.factories.FactoryMapper
	*	@extends com.spinal.util.factories.AsyncFactory
	*
	*	@requires com.spinal.util.factories.AsyncFactory
	*	@requires com.spinal.util.ObjectUtil
	**/
	var FactoryMapper = Spinal.namespace('com.spinal.util.factories.FactoryMapper', AsyncFactory.inherit({

		/**
		*	Initialize
		*	@public
		*	@method initialize
		*	@param [attrs] {Object} constructor attributes
		*	@return com.spinal.util.factories.FactoryMapper
		**/
		initialize: function(attrs) {
			return FactoryMapper.__super__.initialize.apply(this, arguments);
		},

		/**
		*	Validate key value pair data structure
		*	@public
		*	@method isValid
		*	@param value {Object} model value reference
		*	@param key {String} model key reference
		*	@param [callback] {Function} optional callback used on every resource to be called when resource is loaded
		*	@return Boolean
		**/
		isValid: function(value, key) {
			return _.defined(key) && key !== '' && _.defined(value);
		},

		/**
		*	Feed Factory stack by retrieving mapping patterns defined by strategies defined on this factory mapper.
		*	@public
		*	@chainable
		*	@method source
		*	@param model {Object} data model reference
		*	@param [callback] {Function} optional callback used on every resource to be called when resource is loaded
		*	@return com.spinal.util.factories.FactoryMapper
		**/
		source: function(model, callback) {
			this.set(_.compact(_.flatten(this.retrieve.apply(this, arguments)))).defaults();
			return this;
		},

		/**
		*	Default retrieval strategy that maps key-value model pairs into complex resource types to be added
		*	on this factory stack
		*	@public
		*	@method retrieve
		*	@param model {Object} data model reference
		*	@param [callback] {Function} optional callback used on every resource to be called when resource is loaded
		*	@return Array
		**/
		retrieve: function(model, callback) {
			return _.map(model, function(value, key) {
				if(!this.isValid.apply(this, arguments)) return null;
				var resource = this.byType(this.byKey({ key: key, value: value }));
				return _.extend(resource, { callback: _.partial(callback, resource.params) });
			}, this);
		},

		/**
		*	Resolves strategy by key
		*	@public
		*	@method byKey
		*	@param o {Object} single model property/value pair
		*	@return com.spinal.util.factories.FactoryMapper
		**/
		byKey: function(o) {
			return (this[o.key] && _.isFunction(this[o.key])) ? this[o.key].apply(this, arguments) : o;
		},

		/**
		*	Resolves strategy by type
		*	@public
		*	@method byType
		*	@param o {Object} single model property/value pair
		*	@return com.spinal.util.factories.FactoryMapper
		**/
		byType: function(o) {
			if(!_.defined(o) || _.defined(o.path)) return o;
			var type = typeof(o.value);
			if(_.isObject(o.value)) type = 'object';
			if(_.isArray(o.value)) type = 'array';
			return this[type].apply(this, arguments);
		},

		/**
		*	Default Components
		*	@public
		*	@chainable
		*	@method defaults
		*	@return com.spinal.ui.form.mapper.FactoryMapper
		**/
		defaults: function() {
			return this;
		},

		/**
		*	Default String type handler
		*	@public
		*	@method string
		*	@param o {Object} single model property/value pair
		*	@return Object
		**/
		string: function(o) {
			return {};
		},

		/**
		*	Default Number type handler
		*	@public
		*	@method number
		*	@param o {Object} single model property/value pair
		*	@return Object
		**/
		number: function(o) {
			return {};
		},

		/**
		*	Default Boolean type handler
		*	@public
		*	@method boolean
		*	@param o {Object} single model property/value pair
		*	@return Object
		**/
		boolean: function(o) {
			return {};
		},

		/**
		*	Default Object type handler
		*	@public
		*	@method object
		*	@param o {Object} single model property/value pair
		*	@return Array
		**/
		object: function(o) {
			var args = _.toArray(arguments).slice(1);
			args.unshift(o.value);
			return this.retrieve.apply(this, args);
		},

		/**
		*	Default Array type handler
		*	@public
		*	@method array
		*	@param o {Object} single model property/value pair
		*	@return Array
		**/
		array: function(o) {
			var args = _.toArray(arguments).slice(1);
			args.unshift(o.value);
			return this.retrieve.apply(this, args);
		}

	}, {

		/**
		*	@static
		*	@property NAME
		*	@type String
		**/
		NAME: 'FactoryMapper'

	}));

	return FactoryMapper;

});
