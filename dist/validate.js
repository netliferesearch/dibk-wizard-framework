!function(t){function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}var e={};n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=6)}([function(t,n){t.exports=require("fs")},function(t,n,e){function o(t,n){this.flags=t,this.required=~t.indexOf("<"),this.optional=~t.indexOf("["),this.bool=!~t.indexOf("-no-"),t=t.split(/[ ,|]+/),t.length>1&&!/^[[<]/.test(t[1])&&(this.short=t.shift()),this.long=t.shift(),this.description=n||""}function i(t){this.commands=[],this.options=[],this._execs={},this._allowUnknownOption=!1,this._args=[],this._name=t||""}function r(t){return t.split("-").reduce(function(t,n){return t+n[0].toUpperCase()+n.slice(1)})}function s(t,n){var e=Math.max(0,n-t.length);return t+Array(e+1).join(" ")}function a(t,n){n=n||[];for(var e=0;e<n.length;e++)"--help"!=n[e]&&"-h"!=n[e]||(t.outputHelp(),process.exit(0))}function u(t){var n=t.name+(!0===t.variadic?"...":"");return t.required?"<"+n+">":"["+n+"]"}function p(t){try{if(d.statSync(t).isFile())return!0}catch(t){return!1}}var c=e(2).EventEmitter,l=e(3).spawn,h=e(4),f=h.dirname,m=h.basename,d=e(0);n=t.exports=new i,n.Command=i,n.Option=o,o.prototype.name=function(){return this.long.replace("--","").replace("no-","")},o.prototype.is=function(t){return t==this.short||t==this.long},i.prototype.__proto__=c.prototype,i.prototype.command=function(t,n,e){e=e||{};var o=t.split(/ +/),r=new i(o.shift());return n&&(r.description(n),this.executables=!0,this._execs[r._name]=!0,e.isDefault&&(this.defaultExecutable=r._name)),r._noHelp=!!e.noHelp,this.commands.push(r),r.parseExpectedArgs(o),r.parent=this,n?this:r},i.prototype.arguments=function(t){return this.parseExpectedArgs(t.split(/ +/))},i.prototype.addImplicitHelpCommand=function(){this.command("help [cmd]","display help for [cmd]")},i.prototype.parseExpectedArgs=function(t){if(t.length){var n=this;return t.forEach(function(t){var e={required:!1,name:"",variadic:!1};switch(t[0]){case"<":e.required=!0,e.name=t.slice(1,-1);break;case"[":e.name=t.slice(1,-1)}e.name.length>3&&"..."===e.name.slice(-3)&&(e.variadic=!0,e.name=e.name.slice(0,-3)),e.name&&n._args.push(e)}),this}},i.prototype.action=function(t){var n=this,e=function(e,o){e=e||[],o=o||[];var i=n.parseOptions(o);a(n,i.unknown),i.unknown.length>0&&n.unknownOption(i.unknown[0]),i.args.length&&(e=i.args.concat(e)),n._args.forEach(function(t,o){t.required&&null==e[o]?n.missingArgument(t.name):t.variadic&&(o!==n._args.length-1&&n.variadicArgNotLast(t.name),e[o]=e.splice(o))}),n._args.length?e[n._args.length]=n:e.push(n),t.apply(n,e)},o=this.parent||this,i=o===this?"*":this._name;return o.on("command:"+i,e),this._alias&&o.on("command:"+this._alias,e),this},i.prototype.option=function(t,n,e,i){var s=this,a=new o(t,n),u=a.name(),p=r(u);if("function"!=typeof e)if(e instanceof RegExp){var c=e;e=function(t,n){var e=c.exec(t);return e?e[0]:n}}else i=e,e=null;return(0==a.bool||a.optional||a.required)&&(0==a.bool&&(i=!0),void 0!==i&&(s[p]=i)),this.options.push(a),this.on("option:"+u,function(t){null!==t&&e&&(t=e(t,void 0===s[p]?i:s[p])),"boolean"==typeof s[p]||void 0===s[p]?s[p]=null==t?!!a.bool&&(i||!0):t:null!==t&&(s[p]=t)}),this},i.prototype.allowUnknownOption=function(t){return this._allowUnknownOption=0===arguments.length||t,this},i.prototype.parse=function(t){this.executables&&this.addImplicitHelpCommand(),this.rawArgs=t,this._name=this._name||m(t[1],".js"),this.executables&&t.length<3&&!this.defaultExecutable&&t.push("--help");var n=this.parseOptions(this.normalize(t.slice(2))),e=this.args=n.args,o=this.parseArgs(this.args,n.unknown),i=o.args[0],r=null;return i&&(r=this.commands.filter(function(t){return t.alias()===i})[0]),this._execs[i]&&"function"!=typeof this._execs[i]?this.executeSubCommand(t,e,n.unknown):r?(e[0]=r._name,this.executeSubCommand(t,e,n.unknown)):this.defaultExecutable?(e.unshift(this.defaultExecutable),this.executeSubCommand(t,e,n.unknown)):o},i.prototype.executeSubCommand=function(t,n,e){n=n.concat(e),n.length||this.help(),"help"==n[0]&&1==n.length&&this.help(),"help"==n[0]&&(n[0]=n[1],n[1]="--help");var o,i=t[1],r=m(i,".js")+"-"+n[0],s=d.lstatSync(i).isSymbolicLink()?d.readlinkSync(i):i;s!==i&&"/"!==s.charAt(0)&&(s=h.join(f(i),s)),o=f(s);var a=h.join(o,r),u=!1;p(a+".js")?(r=a+".js",u=!0):p(a)&&(r=a),n=n.slice(1);var c;"win32"!==process.platform?u?(n.unshift(r),n=(process.execArgv||[]).concat(n),c=l("node",n,{stdio:"inherit",customFds:[0,1,2]})):c=l(r,n,{stdio:"inherit",customFds:[0,1,2]}):(n.unshift(r),c=l(process.execPath,n,{stdio:"inherit"})),["SIGUSR1","SIGUSR2","SIGTERM","SIGINT","SIGHUP"].forEach(function(t){process.on(t,function(){!1===c.killed&&null===c.exitCode&&c.kill(t)})}),c.on("close",process.exit.bind(process)),c.on("error",function(t){"ENOENT"==t.code?console.error("\n  %s(1) does not exist, try --help\n",r):"EACCES"==t.code&&console.error("\n  %s(1) not executable. try chmod or run with root\n",r),process.exit(1)}),this.runningCommand=c},i.prototype.normalize=function(t){for(var n,e,o,i=[],r=0,s=t.length;r<s;++r){if(n=t[r],r>0&&(e=this.optionFor(t[r-1])),"--"===n){i=i.concat(t.slice(r));break}e&&e.required?i.push(n):n.length>1&&"-"==n[0]&&"-"!=n[1]?n.slice(1).split("").forEach(function(t){i.push("-"+t)}):/^--/.test(n)&&~(o=n.indexOf("="))?i.push(n.slice(0,o),n.slice(o+1)):i.push(n)}return i},i.prototype.parseArgs=function(t,n){var e;return t.length?(e=t[0],this.listeners("command:"+e).length?this.emit("command:"+t.shift(),t,n):this.emit("command:*",t)):(a(this,n),n.length>0&&this.unknownOption(n[0])),this},i.prototype.optionFor=function(t){for(var n=0,e=this.options.length;n<e;++n)if(this.options[n].is(t))return this.options[n]},i.prototype.parseOptions=function(t){for(var n,e,o,i=[],r=t.length,s=[],a=0;a<r;++a)if(o=t[a],n)i.push(o);else if("--"!=o)if(e=this.optionFor(o))if(e.required){if(null==(o=t[++a]))return this.optionMissingArgument(e);this.emit("option:"+e.name(),o)}else e.optional?(o=t[a+1],null==o||"-"==o[0]&&"-"!=o?o=null:++a,this.emit("option:"+e.name(),o)):this.emit("option:"+e.name());else o.length>1&&"-"==o[0]?(s.push(o),t[a+1]&&"-"!=t[a+1][0]&&s.push(t[++a])):i.push(o);else n=!0;return{args:i,unknown:s}},i.prototype.opts=function(){for(var t={},n=this.options.length,e=0;e<n;e++){var o=r(this.options[e].name());t[o]="version"===o?this._version:this[o]}return t},i.prototype.missingArgument=function(t){console.error(),console.error("  error: missing required argument `%s'",t),console.error(),process.exit(1)},i.prototype.optionMissingArgument=function(t,n){console.error(),n?console.error("  error: option `%s' argument missing, got `%s'",t.flags,n):console.error("  error: option `%s' argument missing",t.flags),console.error(),process.exit(1)},i.prototype.unknownOption=function(t){this._allowUnknownOption||(console.error(),console.error("  error: unknown option `%s'",t),console.error(),process.exit(1))},i.prototype.variadicArgNotLast=function(t){console.error(),console.error("  error: variadic arguments must be last `%s'",t),console.error(),process.exit(1)},i.prototype.version=function(t,n){return 0==arguments.length?this._version:(this._version=t,n=n||"-V, --version",this.option(n,"output the version number"),this.on("option:version",function(){process.stdout.write(t+"\n"),process.exit(0)}),this)},i.prototype.description=function(t){return 0===arguments.length?this._description:(this._description=t,this)},i.prototype.alias=function(t){var n=this;return 0!==this.commands.length&&(n=this.commands[this.commands.length-1]),0===arguments.length?n._alias:(n._alias=t,this)},i.prototype.usage=function(t){var n=this._args.map(function(t){return u(t)}),e="[options]"+(this.commands.length?" [command]":"")+(this._args.length?" "+n.join(" "):"");return 0==arguments.length?this._usage||e:(this._usage=t,this)},i.prototype.name=function(t){return 0===arguments.length?this._name:(this._name=t,this)},i.prototype.largestOptionLength=function(){return this.options.reduce(function(t,n){return Math.max(t,n.flags.length)},0)},i.prototype.optionHelp=function(){var t=this.largestOptionLength();return this.options.map(function(n){return s(n.flags,t)+"  "+n.description}).concat([s("-h, --help",t)+"  output usage information"]).join("\n")},i.prototype.commandHelp=function(){if(!this.commands.length)return"";var t=this.commands.filter(function(t){return!t._noHelp}).map(function(t){var n=t._args.map(function(t){return u(t)}).join(" ");return[t._name+(t._alias?"|"+t._alias:"")+(t.options.length?" [options]":"")+" "+n,t._description]}),n=t.reduce(function(t,n){return Math.max(t,n[0].length)},0);return["","  Commands:","",t.map(function(t){var e=t[1]?"  "+t[1]:"";return s(t[0],n)+e}).join("\n").replace(/^/gm,"    "),""].join("\n")},i.prototype.helpInformation=function(){var t=[];this._description&&(t=["  "+this._description,""]);var n=this._name;this._alias&&(n=n+"|"+this._alias);var e=["","  Usage: "+n+" "+this.usage(),""],o=[],i=this.commandHelp();i&&(o=[i]);var r=["","  Options:","",""+this.optionHelp().replace(/^/gm,"    "),""];return e.concat(t).concat(r).concat(o).join("\n")},i.prototype.outputHelp=function(t){t||(t=function(t){return t}),process.stdout.write(t(this.helpInformation())),this.emit("--help")},i.prototype.help=function(t){this.outputHelp(t),process.exit()}},function(t,n){t.exports=require("events")},function(t,n){t.exports=require("child_process")},function(t,n){t.exports=require("path")},,function(t,n,e){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var i=e(0),r=e(1),s=o(r),a=e(7),u=o(a);s.default.version("1.0.0").description("Wizard schema validator").parse(process.argv);var p=s.default.args[0];(0,i.existsSync)(p)||(console.error(p+" not found. Did you misspell the file name?"),process.exit(1)),(0,u.default)(p)?console.log("🌈"):console.log("⛈")},function(t,n,e){"use strict";function o(t){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]).length||!0}Object.defineProperty(n,"__esModule",{value:!0}),n.default=o}]);