/**
*	Plugin Spec Test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
define([], function() {

	return {

		$id: 'plugin',

		container: {
			$module: 'ui/container',
			$params: { el: 'div.global' }
		},

		view: {
			$module: 'ui/view',
			$params: { id: 'child' }
		},

		$ready: [
			{ '$bone!container.add': ['$bone!view', { renderOnAdd: true }] }
		],

		$plugins: {
			html: {
				my: { path: 'templates/my-tpl', lazyLoading: true },
				other: { path: 'templates/other-tpl' }
			},
			theme: {
				my: { path: 'themes/my.css', _default: true }
			}
		}

	};

});
