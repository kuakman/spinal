/**
*	@module com.spinal.ui.basic
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
define(['ui/basic/paragraph'], function(Paragraph) {

	/**
	*	Span Class
	*	@namespace com.spinal.ui.basic
	*	@class com.spinal.ui.basic.Span
	*	@extends com.spinal.ui.basic.Paragraph
	*
	*	@requires com.spinal.ui.basic.Paragraph
	**/
	var UISpan = Spinal.namespace('com.spinal.ui.basic.Span', Paragraph.inherit({

		/**
		*	Internal CSS className
		*	@public
		*	@property className
		*	@type String
		**/
		className: 'ui-span',

		/**
		*	Tag Name used to build the el
		*	@public
		*	@property tagName
		*	@type String
		**/
		tagName: 'span'

	}, {

		/**
		*	@static
		*	@property NAME
		*	@type String
		**/
		NAME: 'Span'

	}));

	return UISpan;

});