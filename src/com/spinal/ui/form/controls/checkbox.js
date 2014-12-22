/**
*	@module com.spinal.ui.form.controls
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
define(['ui/form/controls/input', 'util/string'], function(Input, StringUtil) {

	/**
	*	Checkbox Class
	*	@namespace com.spinal.ui.form.controls
	*	@class com.spinal.ui.form.controls.Checkbox
	*	@extends com.spinal.ui.form.controls.Input
	*
	*	@requires com.spinal.ui.form.controls.Input
	*	@requires com.spinal.util.StringUtil
	**/
	var UICheckbox = Spinal.namespace('com.spinal.ui.form.controls.Checkbox', Input.inherit({

		/**
		*	Internal CSS className
		*	@public
		*	@property className
		*	@type String
		**/
		className: 'ui-checkbox',

		/**
		*	Input's type
		*	@private
		*	@property _type
		*	@type String
		**/
		_type: Input.TYPES.checkbox,

		/**
		*	Checkbox's default value
		*	@private
		*	@property _value
		*	@type String
		**/
		_value: false,

		/**
		*	Initialize
		*	@public
		*	@method initialize
		*	@param options {Object} view options
		*	@return {com.spinal.ui.form.controls.Checkbox}
		**/
		initialize: function(opts) {
			opts || (opts = {});
			delete opts.placeholder;
			UICheckbox.__super__.initialize.apply(this, arguments);
			return this;
		},

		/**
		*	Render Checkbox
		*	@public
		*	@chainable
		*	@method render
		*	@param [opts] {Object} additional options
		*	@return {com.spinal.ui.form.controls.Checkbox}
		**/
		render: function(opts) {
			UICheckbox.__super__.render.apply(this, arguments);
			this.value(this._value);
			return this;
		},

		/**
		*	Change the Checkbox's value
		*	@public
		*	@chainable
		*	@method value
		*	@param [val] {Boolean} Checkbox's value
		*	@return Boolean
		**/
		value: function(val) {
			if(!StringUtil.defined(val)) return this._value;
			this.$el.prop('checked', (this._value = val));
			return this;
		}

	}, {

		/**
		*	@static
		*	@property NAME
		*	@type String
		**/
		NAME: 'UICheckbox'

	}));

	return UICheckbox;

});
