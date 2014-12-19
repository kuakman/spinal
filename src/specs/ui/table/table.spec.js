/**
*	SpinalJS Table Component Spec
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/
define([], function() {

	return {

		$id: 'ui-table-table',

		table_p_s: { $module: 'ui/basic/paragraph', $params: { content: '<code>No Styling</code>' } },
		table_p_ss: { $module: 'ui/basic/paragraph', $params: { content: '<code>Striped</code>' } },

		table_columns: [
			{ cls: 'custom-header', rows: ['Column A', 'Column B', 'Column C'] }
		],

		table_rows: [
			{ rows: ['Row 1.A', 'Row 1.B', 'Row 1.C'] },
			{ rows: ['Row 2.A', 'Row 2.B', 'Row 2.C'] },
			{ rows: ['Row 3.A', 'Row 3.B', 'Row 3.C'] }
		],

		table_footer: [
			{ rows: ['Footer A','Footer B', 'Footer C'] }
		],

		table_simple: {
			$module: 'ui/table/table',
			$params: {
				header: '$bone!table_columns',
				body: '$bone!table_rows',
				footer: '$bone!table_footer'
			}
		},

		table_simple_striped: {
			$module: 'ui/table/table',
			$params: {
				header: '$bone!table_columns',
				body: '$bone!table_rows',
				footer: '$bone!table_footer'
			}
		},

		$ready: [{
			'$bone!ctable.addAll': [[
				'$bone!table_p_s',
				'$bone!table_simple',
				'$bone!table_p_ss',
				'$bone!table_simple_striped'
			], { renderOnAdd: true }],
			'$bone!table_simple_striped.addClass': ['table-striped']
		}]

	};

});
