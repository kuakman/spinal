/**
*	@module com.spinal.ioc.engine.annotation
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
define(['ioc/engine/annotation/annotation'], function(Annotation) {

	/**
	*	Class Bone
	*	@namespace com.spinal.ioc.engine.annotation
	*	@class com.spinal.ioc.engine.annotation.Bone
	*	@extends com.spinal.ioc.engine.annotation.Annotation
	*
	*	@requires com.spinal.ioc.engine.annotation.Annotation
	**/
	var Bone = Spinal.namespace('com.spinal.ioc.engine.annotation.Bone', Annotation.inherit({

		/**
		*	Initialize
		*	@public
		*	@method initialize
		*	@param [attrs] {Object} attributes
		*	@return com.spinal.ioc.engine.annotation.Bone
		**/
		initialize: function(attrs) {
			Bone.__super__.initialize.apply(this, arguments);
			_.extend(this, { _id: _.keys(attrs)[0], _value: _.values(attrs)[0] });
			this.getDependencies().set(this.retrieve(), { silent: true });
			console.log(this.getDependencies().invoke('getId'));
			return this;
		},

		/**
		*	Retrieves bone's id
		*	@public
		*	@method getId
		*	@return Object
		**/
		getId: function() {
			return this._id;
		},

		/**
		*	Retrieves bone's metadata
		*	@public
		*	@method getValue
		*	@return Object
		**/
		getValue: function() {
			return this._value;
		},

		/**
		*	Retrieves annotation module path
		*	@public
		*	@method getId
		*	@return String
		**/
		getModule: function() {
			return _.isObject(this.getValue()) ? this.getValue().$module : null;
		},

		/**
		*	Retrieves annotation module params if exists, otherwise returns bone's value
		*	@public
		*	@method getParams
		*	@return String
		**/
		getParams: function() {
			return _.isObject(this.getValue()) ? this.getValue().$params : this.getValue();
		},

		/**
		*	Determines and retrieves this bone either, as a module instance or the bone itself.
		*	@public
		*	@method get
		*	@return Object
		**/
		get: function() {
			return (this.isModule() && this.isCreated()) ? this._$created : this;
		},

		/**
		*	Dependency gathering on this annotation
		*	This method uses recursion.
		*	@public
		*	@override
		*	@method retrieve
		*	@param [context] {Object} context found on nested structure
		*	@return Array
		**/
		retrieve: function(context) {
			context = (context) ? context : this.getParams();
			return (this.isNativeObject(context) && !this.isNative(context)) ?
				Bone.__super__.retrieve.call(this, context) : context;
		},

		/**
		*	Checks if this annotation is a module
		*	@static
		*	@method isModule
		*	@param bone {Object} current bone to be evaluated
		*	@return Boolean
		**/
		isModule: function() {
			return !this.isNative() && _.defined(this.getModule());
		},

		/**
		*	Checks if this annotation was succesfully created
		*	@static
		*	@method isCreated
		*	@return Boolean
		**/
		isCreated: function() {
			return _.defined(this._$created);
		},

		/**
		*	Returns true if the value is an object or array and not a module, otherwise returns false
		*	@public
		*	@method isNativeObject
		*	@param value {Object} value to be evaluated
		*	@return Boolean
		**/
		isNativeObject: function(value) {
			return (_.defined(value) &&
				!_.isString(value) &&
				!_.isNumber(value) &&
				!_.isBoolean(value) &&
				!_.isFunction(value) &&
				!_.isRegExp(value) &&
				!_.isDate(value) &&
				!_.isArguments(value));
		},

		/**
		*	Check if this annotation is an instance of a Backbone class
		*	@public
		*	@method isNative
		*	@return Boolean
		**/
		isNative: function() {
			return (this.getValue() instanceof Backbone.Model ||
				this.getValue() instanceof Backbone.Collection ||
				this.getValue() instanceof Backbone.View ||
				this.getValue() instanceof Backbone.Router);
		},

		/**
		*	Returns true if expression matches a bone nomenclature
		*	@public
		*	@method isBone
		*	@param expr {String} expression to be evaluated
		*	@return Boolean
		**/
		isBone: function(expr) {
			return this.isAnnotation(expr) && (expr.indexOf(Bone.TYPE) !== -1);
		}

	}, {

		/**
		*	@static
		*	@property NAME
		*	@type String
		**/
		NAME: 'Bone',

		/**
		*	@static
		*	@property DELIMITER
		*	@type String
		**/
		DELIMITER: '!',

		/**
		*	@static
		*	@property TYPE
		*	@type String
		**/
		TYPE: 'bone!'

	}));

	return Bone;

});
