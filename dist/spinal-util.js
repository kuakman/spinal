//	SpinalJS Util@0.0.1 (c) 2014 Patricio Ferreira <3dimentionar@gmail.com>, 3dimention.com
//	SpinalJS may be freely distributed under the MIT license.
//	For all details and documentation: http://3dimention.github.io/spinal
define("util/exception/exception",["core/spinal"],function(e){var t=e.namespace("com.spinal.util.exception.SpinalException",function(e){return this.initialize.apply(this,arguments),this});return e.extend(t.prototype,new Error,{initialize:function(e,t){return this.name=this.constructor.NAME?this.constructor.NAME:"SpinalException",this.type=_.isUndefined(this.constructor.TYPES[e])?"Generic":e,this.message=this.getMessage(this.type,t),this},getMessage:function(e,n){return t.getMessage.apply(this,arguments)}}),t.NAME="SpinalException",t.TYPES={Generic:_.template("Generic Exception"),StaticClass:_.template("Class cannot be instanciated. All methods and variable members are static.")},t.getMessage=function(e,n){var r=this instanceof t?this.constructor:this;return e&&r.TYPES[e]?r.TYPES[e](_.isUndefined(n)?{}:n):"Unknown Exception Message"},t.inherit=e._inherit,t}),define("util/string",["core/spinal","util/exception/exception"],function(e,t){var n=e.namespace("com.spinal.util.StringUtil",e.SpinalClass
.inherit({initialize:function(){throw new t("StaticClass")}},{NAME:"StringUtil",uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=Math.random()*16|0,n=e==="x"?t:t&3|8;return n.toString(16)})},createQueryString:function(e,t,n){var r=[],i,s;return _.each(e,function(e,t){if(_.isArray(t))for(i=0,s=t.length;i<s;i++)r.push(e+"="+encodeURIComponent(decodeURIComponent(t[i])));else r.push(e+"="+encodeURIComponent(decodeURIComponent(t)))},this),(t||_.isEmpty(e)?"":"?")+r.join(n?n:"&")},strToJSON:function(e){if(!e||!_.isString(e)||e==="")return{};var t={},n=t,r=e.split(".");for(var i=0;i<r.length;i++)t[r[i]]={},t=t[r[i]],i===r.length-1&&delete t;return n},toPrivate:function(e){return _.each(e,function(e,t,n){n["_"+t]=e,delete n[t]}),e},defined:function(e){return!_.isNull(e)&&!_.isUndefined(e)},search:function(e,t){if(!e||!t||e==="")return null;if(_.isEmpty(t))return t;var n=e.split("."),r=t;for(var i=0;i<n.length;i++){if(!r[n[i]]){r="";break}r=r[n[i]]}return r
}}));return n}),define("util/schema",["core/spinal"],function(e){var t=e.namespace("com.spinal.util.Schema",Backbone.Model.inherit({initialize:function(){return t.__super__.initialize.apply(this,arguments)},parse:function(e,t){var n={};return _.isString(e)&&(n[e]=t),_.isObject(e)&&(n=e),_.each(n,_.bind(function(e,t){var r="_"+n[t];n[e]=n[t]&&this[r]?this[r](e):e},this)),n},_boolean:function(e){return e==="true"?!0:e==="false"?!1:e},_int:function(e){return parseInt(e,10)},_float:function(e){return parseFloat(e)},_string:function(e){return e.toString()}},{NAME:"Schema"}));return t}),define("util/http/ajax-http",["core/spinal","util/string"],function(e,t){var n=e.namespace("com.spinal.util.http.AjaxHttp",e.SpinalClass.inherit({endpoint:"/",service:null,initialize:function(e){e||(e={});if(!this.endpoint)throw new Error(this.toString()+" requires an endpoint path");return e.service&&(this.service=e.service),n.__super__.initialize.apply(this,arguments)},_handle:function(e,t){return t.after&&(
e.__after__=t.after),t.modelOpts&&(e.modelOpts=t.modelOpts),t},_get:function(e){$.ajax(_.extend({url:this.endpoint+e.action+t.createQueryString(e.params),type:n.VERBS.GET,success:_.bind(this._success,this,e),error:_.bind(this._fail,this,e)},e.opts))},_post:function(e){$.ajax(_.extend({url:this.endpoint+e.action,type:n.VERBS.POST,data:e.params,success:_.bind(this._success,this,e),error:_.bind(this._fail,this,e)},e.opts))},_put:function(e){$.ajax(_.extend({url:this.endpoint+e.action,type:n.VERBS.PUT,data:e.params,success:_.bind(this._success,this,e),error:_.bind(this._fail,this,e)},e.opts))},_delete:function(e){$.ajax(_.extend({url:this.endpoint+e.action,type:n.VERBS.DELETE,data:e.params,success:_.bind(this._success,this,e),error:_.bind(this._fail,this,e)},e.opts))},_success:function(e,t,r,i){return e.success&&this.service&&e.success.apply(this.service,arguments),e.skipSuccess||this.trigger(n.EVENTS.success,arguments),e.__after__&&e.__after__(arguments),this},_fail:function(e,t,r,i){return e
.fail&&this.service&&e.fail.apply(this.service,arguments),e.skipFail||this.trigger(n.EVENTS.fail,arguments),e.__after__&&e.__after__(arguments),this},before:function(e,t){return t||(t={}),this._handle(e,t),e.progress&&e.progress(arguments),e.skipProgress||this.trigger(n.EVENTS.progress,e,t),this},call:function(e){return e&&e.method&&e.action&&(e.params||(e.params={}),_.contains(_.values(n.VERBS),e.method)&&this.before(arguments)["_"+e.method](e)),this}},{NAME:"AjaxHttp",VERBS:{GET:"get",POST:"post",PUT:"put",DELETE:"delete"},CONTENT_TYPES:{json:"application/json",xml:"application/xml",html:"text/html"},EVENTS:{progress:"com:spinal:util:http:progress",success:"com:spinal:util:http:success",fail:"com:spinal:util:http:fail"}}));return n}),define("util/exception/factory",["core/spinal","util/exception/exception"],function(e,t){var n=e.namespace("com.spinal.util.exception.FactoryException",t.inherit({initialize:function(){return n.__super__.initialize.apply(this,arguments)}},{NAME:"FactoryException"
,TYPES:{UnregisteredFactory:_.template("Factory <%= id %> not found. Unable to use factory method to instanciate class.")}}));return n}),define("util/adt/iterator",["core/spinal"],function(e){var t=e.namespace("com.spinal.util.adt.Iterator",e.SpinalClass.inherit({collection:null,_cur:0,initialize:function(e){return e?this.set(e):this.collection=[],t.__super__.initialize.apply(this,arguments)},set:function(e){if(!_.isArray(e))throw new Error(this.toString()+" requires an array in order to be instanciate it.");return this.collection=e.slice(0),this.rewind()},hasNext:function(){return this._cur<=this.collection.length-1},next:function(){return this._cur<=this.collection.length-1?this.collection[this._cur++]:null},rewind:function(){return this._cur=0,this},remove:function(){if(this.collection.length>0){var e=this.collection.splice(this._cur,1)[0];this.trigger(t.EVENTS.removed,{removed:e,iterator:this})}return e}},{NAME:"Iterator",EVENTS:{removed:"com:spinal:util:adt:iterator:removed"}}));return t
}),define("util/adt/collection",["core/spinal","util/adt/iterator"],function(e,t){var n=e.namespace("com.spinal.util.adt.Collection",e.SpinalClass.inherit({collection:null,_interface:null,initialize:function(e,t){return t||(t={}),this.collection=[],t.interface&&(this._interface=t.interface),e?this.set(e,t):this.collection=[],n.__super__.initialize.apply(this,arguments)},_valid:function(e){return e?!0:!1},set:function(e){return!this._valid(e)||!_.isArray(e)?!1:(this.reset({silent:!0}),_.isNull(this._interface)?this.collection=e.slice(0):this.collection=_.compact(_.map(e,function(e){if(e)return new this._interface(e)},this)),!0)},get:function(e){return e<this.size()?this.collection[e]:null},add:function(e,t){return t||(t={}),this._valid(e)?(_.isNull(this._interface)?this.collection.push(e):(e=new this._interface(e),this.collection.push(e)),t.silent||this.trigger(n.EVENTS.added,{added:e,collection:this}),e):null},addAll:function(e,t){return t||(t={}),!this._valid(e)||!_.isArray(e)?!1:(e=_.
compact(_.map(e,function(e){if(!_.isUndefined(e))return _.isNull(this._interface)?e:new this._interface(e)},this)),this.collection=this.collection.concat(e),t.silent||this.trigger(n.EVENTS.addedAll,{addedAll:e,collection:this}),!0)},invoke:function(e){var t=_.flatten(Array.prototype.slice.call(arguments,1));return _.invoke(this.collection,e,t)},each:function(e){var t=Array.prototype.slice.call(arguments);return t.unshift(this.collection),_.each.apply(this,t)},map:function(e){var t=Array.prototype.slice.call(arguments);return t.unshift(this.collection),_.map.apply(this,t)},contains:function(e){if(!this._valid(e))return!1;var t=!1,n=this._interface&&this._interface.prototype.toJSON?this.invoke("toJSON"):this.collection;for(var r=0;r<n.length;r++)if(_.isEqual(n[r],e)){t=!0;break}return t},containsAll:function(e){return e?_.every(_.map(e,function(e){return this.contains(e)},this)):!1},iterator:function(){return new t(_.clone(this.collection))},remove:function(e,t){t||(t={});if(!_.isUndefined
(e)&&_.isNumber(e)&&e>=0&&e<this.size()){var r=this.collection.splice(e,1);return t.silent||this.trigger(n.EVENTS.removed,{removed:r[0],collection:this}),r[0]}return null},removeBy:function(e,t){t||(t={});var n=this.size();for(var r=0,i=[];r<n;r++)this.collection[r]&&e(this.collection[r])&&(i.push(this.remove(r,t)),r--,n--);return i},removeAll:function(e,t){t||(t={});if(!this._valid(e)||!_.isArray(e))return[];var r=this.size(),i=[];for(var s=0;s<r;s++)_.filter(e,_.matches(this.collection[s])).length>0&&(i.push(this.remove(s,{silent:!0})),s>0&&s--,r--);return!t.silent&&i.length>0&&this.trigger(n.EVENTS.removedAll,{removed:i,collection:this}),i},find:function(e){if(!e||!_.isFunction(e))return null;var t=Array.prototype.slice.call(arguments);return t.unshift(this.collection),_.find.apply(this,t)},findBy:function(e){for(var t=0,n=[];t<this.size();t++)e(this.collection[t])&&n.push(this.collection[t]);return n},findPosBy:function(e){for(var t=0,n=-1;t<this.size();t++)if(e(this.collection[t]))
{n=t;break}return n},reset:function(e){return e||(e={}),this.collection=[],e.silent||this.trigger(n.EVENTS.reset,{collection:this}),this},isEmpty:function(){return this.size()===0},size:function(){return this.collection.length},sort:function(e){return!_.isUndefined(e)&&_.isFunction(e)?this.collection.sort(e):this.collection.sort(),this},swap:function(e){if(!_.isUndefined(e)&&_.isFunction(e))for(var t=0;t<this.collection.length;t++){var n=e(this.collection[t],t);if(!_.isNull(n)&&n>-1){var r=this.collection[t];this.collection[t]=this.collection[n],this.collection[n]=r}}return this}},{NAME:"Collection",EVENTS:{added:"com:spinal:util:adt:collection:added",removed:"com:spinal:util:adt:collection:removed",addedAll:"com:spinal:util:adt:collection:addedAll",removedAll:"com:spinal:util:adt:collection:removedAll",reset:"com:spinal:util:adt:collection:reset"}}));return n}),define("util/factories/factory",["core/spinal","util/exception/factory","util/adt/collection"],function(e,t,n){var r=e.namespace
("com.spinal.util.factories.Factory",e.SpinalClass.inherit({factories:null,initialize:function(){return this.factories=new n,r.__super__.initialize.apply(this,arguments)},_construct:function(e,t){function n(){return e.apply(this,t)}return _.isFunction(e)?(n.prototype=e.prototype,new n):e},getFactory:function(e){return this.factories.find(function(t){return t.id===e})},register:function(e,t){return!e||!t?null:(this.getFactory(e)||this.factories.add({id:e,factory:t}),t)},unregister:function(e){if(!e)return null;if(this.getFactory(e))return this.factories.removeBy(function(t){return t.id===e})[0]},create:function(e){var n=this.getFactory(e);if(!n)throw new t("UnregisteredFactory",{id:e});return this._construct(n.factory,Array.prototype.slice.call(arguments,1))}},{NAME:"Factory"}));return r}),define("util/adt/stack",["core/spinal","util/adt/collection"],function(e,t){var n=e.namespace("com.spinal.util.adt.Stack",t.inherit({initialize:function(e,t){return n.__super__.initialize.apply(this,arguments
)},push:function(e){return this._valid(e)?(_.isNull(this._interface)?this.collection.unshift(e):this.collection.unshift(new this._interface(e)),!0):!1},peek:function(){return this.size()>0?this.collection[0]:null},pop:function(){return this.size()>0?this.remove(0):null},search:function(e){var t=-1;for(var n=0;n<this.size();n++)if(_.isEqual(this.collection[n],e)){t=n;break}return t}},{NAME:"Stack"}));return n}),define("util/factories/async-factory",["core/spinal","util/adt/stack","util/factories/factory"],function(e,t,n){var r=e.namespace("com.spinal.util.factories.AsyncFactory",n.inherit({stack:null,initialize:function(e){return e||(e={}),this.stack=new t([],e),r.__super__.initialize.apply(this,arguments)},reset:function(e){return this.stack.reset(e),this},set:function(e){return!e||!_.isArray(e)?!1:(this.stack.reset({silent:!0}),this.stack.set(e),this)},findById:function(e){return this.stack.find(_.bind(function(t){return t.id&&e&&t.id===e},this))},findPos:function(e){return this.stack.
search(e)},findPosById:function(e){return e?this.stack.findPosBy(function(t){return t.id===e}):-1},push:function(e){return!e||!e.id||!e.path?this:(this.stack.push(e),this)},remove:function(e,t){return t||(t={}),e?(this.stack.remove(this.stack.search(e),t),this):this},exists:function(e){return!_.isUndefined(this.findById(e))},swap:function(e){return this.stack.swap(e),this},load:function(e,t){return t||(t={}),this.stack.size()<=0?(e&&_.isFunction(e)&&e([]),this):(t.silent||this.trigger(r.EVENTS.prepared,this.stack.collection),this._execute(e,t))},_handle:function(e,t){return _.map(e,function(e){var n=this.stack.pop(),i=r.__super__.register.call(this,n.id,e);return!t.silent&&n.callback&&_.isFunction(n.callback)&&n.callback(n.id,e),i},this)},_execute:function(e,t){var n=this.stack.map(function(e){return e.path});return require(n,_.bind(function(){var n=this._handle(Array.prototype.slice.call(arguments),t);e&&_.isFunction(e)&&e(n),t.silent||this.trigger(r.EVENTS.loaded,n)},this),_.bind(function(
e){this.trigger(r.EVENTS.failed,e)},this)),this}},{NAME:"AsyncFactory",EVENTS:{loaded:"com:spinal:util:factories:async:loaded",failed:"com:spinal:util:factories:async:failed",prepared:"com:spinal:util:factories:async:prepared"}}));return r}),define("util/exception/plugin",["core/spinal","util/exception/exception"],function(e,t){var n=e.namespace("com.spinal.util.exception.PluginException",t.inherit({initialize:function(){return n.__super__.initialize.apply(this,arguments)}},{NAME:"PluginException",TYPES:{ConfigNotSpecified:_.template("Config was not defined")}}));return n}),define("util/exception/ui",["core/spinal","util/exception/exception"],function(e,t){var n=e.namespace("com.spinal.util.exception.UIException",t.inherit({initialize:function(){return n.__super__.initialize.apply(this,arguments)}},{NAME:"UIException",TYPES:{InvalidIDType:_.template("'id' parameter must be a String in the constructor."),SuccessorNotSpecified:_.template("'successor' parameter was not speficied in the constructor."
),InvalidSuccessorType:_.template("'successor' must be an instance of com.spinal.ui.Container."),UIStackViolation:_.template("UI Stack Violation found: view '<%= viewId %>' can not be found inside the successor specified '<%= succesorId %>'."),InvalidModelType:_.template("'model' must be an instance of Backbone.Model."),UnsupportedRenderMethod:_.template("unsupported render method -> '<%= method %>'."),InvalidInterfaceType:_.template("unsupported Interface Type")}}));return n}),define("util/exception/context",["core/spinal","util/exception/exception"],function(e,t){var n=e.namespace("com.spinal.util.exception.ContextException",t.inherit({initialize:function(){return n.__super__.initialize.apply(this,arguments)}},{NAME:"ContextException",TYPES:{UndefinedContext:_.template("Context Not Defined"),InvalidSpecFormat:_.template("Invalid Spec Format"),SpecIdRequired:_.template("Spec ID was not defined"),FactoryNotDeclared:_.template("Factory is required to be able to instanciate <%= clazz %>")
,EngineNotDeclared:_.template("Engine not declared")}}));return n}),define("util/exception/processor",["core/spinal","util/exception/exception"],function(e,t){var n=e.namespace("com.spinal.util.exception.ProcessorException",t.inherit({initialize:function(){return n.__super__.initialize.apply(this,arguments)}},{NAME:"ProcessorException",TYPES:{BoneNotFound:_.template("Bone <%= id %> was not found."),InvalidModuleDeclaration:_.template("Module bone <%= id %> is missing required 'class' declaration."),CreateModuleException:_.template("Create Model operation requires a 'className' and module 'data' in order to work.")}}));return n}),define("util/adt/queue",["core/spinal","util/adt/collection"],function(e,t){var n=e.namespace("com.spinal.util.adt.Queue",t.inherit({capacity:0,initialize:function(e,t){return n.__super__.initialize.apply(this,arguments)},_valid:function(e){return this.size()>=this.capacity?!1:n.__super__._valid.apply(this,arguments)},set:function(e,t){t||(t={});if(_.isUndefined
(t.capacity))throw new Error("Queue requires a 'capacity' property in order to be instanciate it.");if(e.length>t.capacity)throw new Error("Queue element's collection passed overflows the current capacity ["+t.capacity+"].");return this.capacity=t.capacity,n.__super__.set.apply(this,arguments),this},offer:function(e){return this._valid(e)?(_.isNull(this._interface)?this.collection.push(e):this.collection.push(new this._interface(e)),!0):!1},peek:function(){return this.size()>0?this.collection[0]:null},poll:function(){return this.size()>0?this.remove(0):null}},{NAME:"Queue"}));return n}),define("spinal-util",["util/string","util/schema","util/http/ajax-http","util/factories/factory","util/factories/async-factory","util/exception/exception","util/exception/plugin","util/exception/ui","util/exception/factory","util/exception/context","util/exception/processor","util/adt/collection","util/adt/iterator","util/adt/queue","util/adt/stack"],function(){});