
/**
 * Handlebars
 */

var _     = require('lodash')
  , chalk = require('chalk')
  , hbs   = require('express-hbs')
  , Swag  = require('swag');

module.exports = function () {

	_.forOwn(Swag.helpers, function (val, key) {
	    hbs.registerHelper(key, val);
	})

	/**
	 * to render client side js templates so that they are not parsed on the server side
	 * https://github.com/wycats/handlebars.js/issues/221#issuecomment-202843473
	 */
	hbs.registerHelper('raw-helper', function(options) {
	  return options.fn();
	})

	hbs.registerHelper('breaklines', function(text) {
	    text = hbs.Utils.escapeExpression(text);
	    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
	    return new hbs.SafeString(text);
	});

	// limit an array to a maximum of elements (from the start)
	hbs.registerHelper('limit', function (arr, limit) {
		if (!_.isArray(arr)) { return []; } // remove this line if you don't want the lodash/underscore dependency
		return arr.slice(0, limit);
	});

	// limit an array to a maximum of elements (from the start)
	hbs.registerHelper('random', function (min, max) {
		return Math.floor( Math.random() * ( 1 + max - min ) ) + min;
	});

	hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
	    switch (operator) {
	    	case 'keyExists': 
	    		if (!v1) {
	    			console.log(chalk.red("returning..."));
	    			return options.inverse(this)
	    			break;
	    		} else if (!v2) {
	    			console.log(chalk.red("returning..."));
	    			return options.inverse(this)
		    		break;
	    		} else {
		    		return (v1[v2]) ? options.fn(this) : options.inverse(this)
	    		}
	    		break;
	        case '==':
	            return (v1 == v2) ? options.fn(this) : options.inverse(this);
	            break;
	        case '!=':
	            return (v1 != v2) ? options.fn(this) : options.inverse(this);
	            break;
	        case '===':
	            return (v1 === v2) ? options.fn(this) : options.inverse(this);
	            break;
	        case '!==':
	            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
	            break;
	        case '<':
	            return (v1 < v2) ? options.fn(this) : options.inverse(this);
	            break;
	        case '<=':
	            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
	            break;
	        case '>':
	            return (v1 > v2) ? options.fn(this) : options.inverse(this);
	            break;
	        case '>=':
	            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
	            break;
	        case '&&':
	            return (v1 && v2) ? options.fn(this) : options.inverse(this);
	            break;
	        case '||':
	            return (v1 || v2) ? options.fn(this) : options.inverse(this);
	            break;
	        case 'modZero':
	            return ((parseInt(v1, 10)% v2) === 0) ? options.fn(this) : options.inverse(this);
	            break;
	        case 'firstRemainder':
	        	// console.log('the remainders are ');
	        	// console.log((parseInt(v1, 10)% v2));
	        	// console.log(((parseInt(v1, 10)% v2) === 1));
	            return ((parseInt(v1, 10)% v2) === 1) ? options.fn(this) : options.inverse(this);
	            break;
	        case 'lastRemainder':
	            return ((parseInt(v1, 10)% v2) === (v2 - 1)) ? options.fn(this) : options.inverse(this);
	            break;
	        default:
	            return options.inverse(this);
	    }
	})

	// Source - http://jaketrent.com/post/every-nth-item-in-handlebars-loop/
	hbs.registerHelper('everyNth', function(context, every, options) {
	  var fn = options.fn, inverse = options.inverse;
	  var ret = "";
	  if(context && context.length > 0) {
	    for(var i=0, j=context.length; i<j; i++) {
	      var modZero = i % every === 0;
	      ret = ret + fn(_.extend({}, context[i], {
	        isModZero: modZero,
	        isModZeroNotFirst: modZero && i > 0,
	        isLast: i === context.length - 1
	      }));
	    }
	  } else {
	    ret = inverse(this);
	  }
	  return ret;
	});

	// add selected to options in select handlebars
	hbs.registerHelper('select', function( value, options ){
		return options.fn(this).split('\n').map(function(v) {
			var t = 'value="' + value + '"'
	        return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
	    }).join('\n')
    });

    // add selected to options in select handlebars
	hbs.registerHelper('localCurrency', function( value ) {
		return value.toLocaleString('en-IN')
    });

    hbs.registerHelper('json', function(context) {
	    return JSON.stringify(context);
	});

}