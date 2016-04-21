// the calculator works with button clicks. let's make a function 
// that handles a click event for buttons, and arrange them by ID
var output = document.getElementById('OUTPUT'); // what is output to the screen
var buttons = document.getElementsByTagName('button'); //all the buttons
var output_string = '';
var expression;

// one idea is to chain the events as a string and use regular expressions to rule out
// bad cases, then use eval to evaluate the expression as javascript would
for (var i = 0; i<buttons.length; i++) {
	buttons[i].onclick= function() {
		var value = this.innerHTML;
		var type = this.className;
		var id = this.id;
		//console.log('clicked ' + this.className);
		
		// easiest case is that user clicked the all clear button
		if (id==='AC') {
			output.innerHTML = '0';
			output_string = '';
		}
		// another easy case is the back button
		else if (id==="BACK") {
			// if the output is already 0, do nothing
			if (output.innerHTML!=='0' && output_string.length>1) {
				output_string = output_string.slice(0, output_string.length - 1);
				output.innerHTML = output_string;
			}
		}
		// now handle anything but the equal sign
		else if (value!=='=') {
			output_string += value; 
			output.innerHTML = output_string; // display the input 
		}
		// now when someone pushes equal, evaluate the string
		else {
			if (output.innerHTML!=='0') {
				
				// all possibilities where a regular javascript evaluation would throw an error
				var re1 = /^\/|^\*|^%|\W$/; // begins or ends with special characters
				// not allowed: --, ++, //, %%, **, /*, */, /-\W, -/, /+\W, +/, -*, *-\W, *+, +*, %/, /%, %*, *%, %-\W, %+\W 
				var re2 = /--|\+\+|\/\/|\*\*|%%|\/\*|\*\/|\/-W|-\/|\/\+\W|\+\/|-\*|\*-\W|\*\+\W|\+\*|%\/|\/%|%\*|\*%|%-\W|%+\W/; 
				var do_not_match = new RegExp(re1.source + '|' + re2.source);

				// if the string matches any of these even once, throw an error on the calculator screen
				if (output_string.match(do_not_match)!==null) {
					output_string = "Input Error";
					output.innerHTML = output_string;
				}
				// otherwise, evaluate and spit back
				else {
					if (value==='0') {
						output_string = '0'
					}
					output_string += value;
					// remove the '=' from the end
					output_string = output_string.slice(0, output_string.length - 1);
					//console.log(eval(output_string));
					output_string = eval(output_string);
					// go back to string
					output_string = output_string.toString();
					// limit the number of characters to 12
					if (output_string.length>12) {
						output_string = output_string.slice(0, 12);
					}
					output.innerHTML = output_string; // the final expression
				}				
				
			}

		}
		
	}
}