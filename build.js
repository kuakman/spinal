/**
*  Spinal Build
*  @author Patricio Ferreira <3dimentionar@gmail.com>
**/

var fs = require('fs'),
    path = require('path'),
	pkg = require('./package.json'),
	jsp = require("uglify-js").parser,
	pro = require("uglify-js").uglify,
	_ = require('underscore'),
	_s = require('underscore.string');

var Build = {
	
	/**
	*	Modules Path
	**/
	modulesPath: './src/com/spinal',
	
	/**
	*	Build Run
	**/
	run: function() {
		var files = process.argv.slice(2),
			output = this.concat(files),
			output = this.minify(output);
		this.export(output);
		this.benchmark();
	},
	
	banner: function(o) {
		var b = '//     Spinal.js <%= version %>\n\n';
		b += '//     (c) 2014 Patricio Ferreira, 3dimention.com\n' +
			'//     SpinalJS may be freely distributed under the MIT license.\n' +
			'//     For all details and documentation:\n' +
			'//     http://3dimention.github.io/spinal\n\n';
		return _s.insert(o, 0, _.template(b, { version: pkg.version }));
	},
	
	/**
	*	File Concatenation
	**/
	concat: function(files) {
		var out = '';
		files.forEach(function(f) { out += fs.readFileSync(f, 'utf8') + '\n'; });
		return _.template(out, { version: pkg.version });
	},
	
	/**
	*	Minification Process
	**/
	minify: function(o) {
		var ast = jsp.parse(o),
			ast = pro.ast_mangle(ast),
			ast = pro.ast_squeeze(ast),
			minified = pro.gen_code(ast);
		return this.banner(minified);
	},
	
	/**
	*	Export framework
	**/
	export: function(o) {
		var filename = './lib/' + pkg.name + '-' + pkg.version + '-SNAPSHOT.js';
		fs.writeFileSync(filename, o, { mode: 0777, encoding: 'utf8', flags: 'w' });
	},
	
	/**
	*	Parse Modules
	**/
	parse: function() {
		return _.compact(_.map(fs.readdirSync(this.modulesPath), function(fd) {
			var st = fs.statSync(path.resolve(this.modulesPath, fd));
			if(st && st.isDirectory()) return { name: fd };
		}, this));
	},
	
	/**
	*	Build Benchmark tool based on modules available.
	**/
	benchmark: function() {
		var htmltpl = fs.readFileSync('./benchmark/templates/template.html', 'utf8');
		var filename = './benchmark/spinal-' + pkg.version + '-benchmark.html';
		fs.writeFileSync(filename, _.template(htmltpl, { version: pkg.version, modules: this.parse() }), { mode: 0777, encoding: 'utf8', flags: 'w' });
	}
	
};

Build.run();