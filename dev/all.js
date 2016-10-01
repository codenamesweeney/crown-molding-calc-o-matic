/* ------------------------
	Determine Functionality
--------------------------- */

// First declare global variables for last, this, next corners and numbers, and set the number of the next-corner to 1.

var lc;
var ln;
var tc;
var nc = 'stored_c1';
var nn = 1;
g('cn').textContent = nn;

// Check for local storage

if (typeof(Storage) !== "undefined") {
  
  // Code for localStorage/sessionStorage

  // Check for stored spring and corner-1 values (and log them for reference)

  var ss = localStorage.getItem('stored_spring');
  // console.log('stored_spring = ' + ss);

  var sc = localStorage.getItem('stored_c1');
  // console.log('stored_c1 = ' + sc);

  // If there are stored spring and/or corner-1 values, update the page and run full-room calculations

  if (ss || sc) {
		if (ss) {
			// If the spring value is stored, do this:
	 		g('si').value = ss;
			g('ss').disabled = true;
			r('ss', 'i');
			a('si', 'e');
		}
		if (sc) {
			// If the corner value is stored, do this:
			d('co', 'v');
			a('co', 'i');
			r('ac', 'v');
			r('xl', 'v');
		}
		// If either value is stored, do this:
		r('xa', 'v');
		cc();
	}

} else {
  // No local storage is available. Hide the full-room option and alert the user
  alert('Your web browser does not support the features of this app. Please try it in a modern browser!');
}

// Event listener for touchstart
document.addEventListener("touchstart", function(){}, true);

/* ------------------------
	Full-Room Functionality
--------------------------- */

// Enter spring angle and add it to local storage

e('fs', 'submit', function(e) {
	e.preventDefault();
	g('ss').disabled = true;
	var sv = this.elements.sv.value;
	ss = sv;
	localStorage.setItem('stored_spring', sv);
	r('ss', 'i');
	a('si', 'e');
	r('xa', 'v');
	cc();
});

// Add Corner button shows form for next corner

e('ac', 'click', function(e) {
	r('ac', 'i');
	r('xl', 'i');
	d('co', 'i');
	a('co', 'v');
	g('ci').value = 180;
	g('ci').focus();
	g('cs').disabled = false;
});


// Form for next corner: enter corner angle and add it to local storage

e('fc', 'submit', function(e) {
	e.preventDefault();
	g('cs').disabled = true;
	var l = this.elements;
	var nv = l.cv.value;
	// console.log('Setting ' + nc + ' to ' + nv);
	localStorage.setItem(nc, nv);
	var m = cm(ss, nv);
	var b = cb(ss, nv);
	li(nc, nn, nv, m, b);
	// Make the current corner the last corner
	lc = nc;
	ln = nn;
	// Increment the corner number up by 1
	parseInt(nn);
	nn = nn + 1;
	// Set the next corner to be 1 higher than it just was
	toString(nn);
	nc = 'stored_c' + nn;
	// Add that next corner number to the on-page form
	g('cn').textContent = nn;
	// Update which buttons are available
	r('xl', 'v');
	r('ac', 'v');
	d('co', 'v');
	a('co', 'i');
});


// Button to delete the last corner entered

e('xl', 'click', function(e) {

	// To help figure out where you're at in the list:
	//console.log('lc = ' + lc);
	//console.log('ln = ' + ln);
	//console.log('nc = ' + nc);
  //console.log('nn = ' + nn);

  // Delete the corner listing from the page
  var ld = g(lc);
	ld.parentNode.removeChild(ld);
	// Delete the item from local storage
	localStorage.removeItem(lc);
	// Reset where you're at in the list (one back)
	nc = lc;
	nn = ln;
	ln = lc.replace('stored_c','');
	parseInt(ln);
	ln = ln - 1;
	g('cn').textContent = nn;
	toString(ln);
	lc = 'stored_c' + ln;
	// Update which buttons are available
  r('ac', 'v');
  if ( ln === 0 ) {
  	r('xl', 'i');
  }
});

// Button to clear all room data from page and local storage

e('xa', 'click', function(e) {
	var del = confirm('You\'re about to delete all the angles you\'ve entered for this room. Are you sure?')
	if (del === true) {
		// Reset the the page content
		diagram('', 0, 0);
		r('xa', 'i');	
		r('xl', 'i');
		r('ss', 'v');
		g('cl').innerHTML = '';
		d('si', 'e');
		g('si').value = 0;
		g('si').focus();
		g('ss').disabled = false;
 		g('cn').textContent = '1';
		// Delete everything from local storage
		localStorage.removeItem('stored_spring');
		for (var i = 1; i < 100; i++) {
	  	toString(i);
	  	var tc = 'stored_c' + i;
	  	var tv = localStorage.getItem(tc);
	  	if (tv) {
	  		localStorage.removeItem(tc);
	  	} else {
	  		break;
	  	}
  	}
  	// Reset corner variables
  	nc = 'stored_c1';
  	nn = 1;
	}
});


/* --------
	Diagram
----------- */

// Function to reset diagram for each corner

function diagram(cn, m, b) {
	l = 'Corner ' + cn;
	g('dn').textContent = l;
	g('dm').textContent = m;
	g('dv').textContent = b;
	g('bl').setAttribute('style', 'transform: rotateZ(-' + m + 'deg);');
	g('vi').setAttribute('style', 'transform: rotateZ(-' + b + 'deg);');
}

// Event listeners for diagram options

e('sb', 'click', function(e) {
	r('db', '');
	r('sb', 'on');
	r('df', 'i');
	d('d', 'db');
	a('d', 'sb')
});
e('db', 'click', function(e) {
	r('sb', '');
	r('db', 'on');
	r('df', 'v');
	d('d', 'sb');
	a('d', 'db')
});
e('lf', 'click', function(e) {
	r('rf', '');
	r('lf', 'on');
	d('d', 'rf');
	a('d', 'lf')
});
e('rf', 'click', function(e) {
	r('lf', '');
	r('rf', 'on');
	d('d', 'lf');
	a('d', 'rf')
});
e('ic', 'click', function(e) {
	r('oc', '');
	r('ic', 'on');
	d('d', 'oc');
	a('d', 'ic');
});
e('oc', 'click', function(e) {
	r('ic', '');
	r('oc', 'on');
	d('d', 'ic');
	a('d', 'oc')
});
e('lp', 'click', function(e) {
	r('lp', 'on');
	r('rp', '');
	d('d', 'rp');
	a('d', 'lp')
});
e('rp', 'click', function(e) {
	r('lp', '');
	r('rp', 'on');
	d('d', 'lp');
	a('d', 'rp')
});


/* ------------------
	Utility Functions
--------------------- */

// Get element by ID function

function g(id) {
	var l = document.getElementById(id);
	return l;
}

// Add event listener function

function e(id, ev, cb) {
	g(id).addEventListener(ev, cb, false);
}

// Reset class(es) for a given element

function r(id, cl) {
	g(id).setAttribute('class', cl);
}

// Add a class to a given element

function a(id, cl) {
	var l = g(id);
	// Set variable x for 'class string'
	var x = l.getAttribute('class');
	// If the element has a class attribute, add the new class if it isn't already present 
	if (x) {
		index = x.indexOf(cl)
		if ( index === -1 ) {
			x += ' ' + cl;
			l.setAttribute('class', x);
		} else {
			return;
		}
	}
	// If the element has no class attribute, just set the new class
	else {
		l.setAttribute('class', cl);
	}
}

// Delete a class from a given element

function d(id, cl) {
	var l = g(id);
	// Set variable x for 'class string'
	var x = l.getAttribute('class');
	// If the element has a class attribute (and it should)...
	if (x) {
		// Check for the class to be removed; if not found, do nothing; if found, remove it
		index = x.indexOf(cl)
		if ( index === -1 ) {
			return;
		} else {
			x = x.replace(cl,'');
			x = x.replace('  ', ' ');
			x = x.trim();
			l.setAttribute('class', x);
		}
	}
	// If no class exists, do nothing, but log the oddity
	// console.log('Attempted to delete class ' + cl + ' from element ' + id + ' but no class exists.');
}


/* -------------------
	Angle Calculations
---------------------- */

// Perform all full-room corner calculations

function cc() {
	g('cl').innerHTML = '';
  //console.log('Starting corner calculations');
	for (var i = 1; i < 100; i++) {
  	toString(i);
  	var tc = 'stored_c' + i;
  	var tv = localStorage.getItem(tc);
  	// console.log(tc + ' = ' + tv);  		
  	if (tv) {
  		lc = tc;
  		ln = i;
  		var m = cm(ss, tv);
  		var b = cb(ss, tv);
			li(tc, i, tv, m, b);
  	} else {
  		nc = tc;
  		nn = i;
  		g('cn').textContent = nn;
			break;
  	}

  }
  //console.log('nc = ' + nc);
  //console.log('Finished corner calculations');
}

// Function to print corner list
function li(xc, xn, xv, m, b) {
	var cl = g('cl').innerHTML;
	g('cl').innerHTML = cl + '<div id="' + xc + '" class="b"><h3>Corner ' + xn + '</h3><p class="a">' + xv + '</p><p>Miter: ' + m + '&deg; | Bevel:&nbsp;' + b +'&deg;</p><a href="#diagram" onClick="diagram(' + xn +',' + m +',' + b + ');">See in Diagram</a></div>';
}


// Calculate: miter = tan-1(( sin(crown angle) / tan( wall angle / 2 ))) for any angle of crown or wall.

function cm(s, c) {

	// Convert degrees to radians
	var s = s * Math.PI/180;
	var c = c * Math.PI/180;

	// Calculate miter angle in radians
	var m = Math.atan((Math.sin(s))/(Math.tan(c/2)));

	// Convert radians back to degrees
	m = m*(180/Math.PI);

	// Round to one decimal place
	m = m.toFixed(1);

	// Log output when testing
	// console.log('calculated miter = ' + m);

	return m;
}

// Calculate: bevel = sin-1(cos(crown angle) * cos( wall angle / 2)) for any angle of crown or wall.

function cb(s, c) {

	// Convert degrees to radians
	var s = s * Math.PI/180;
	var c = c * Math.PI/180;

	// Calculate bevel angle in radians
	var b = Math.asin(Math.cos(s)*Math.cos(c/2));

	// Convert radians back to degrees
	b = b*(180/Math.PI);

	// Round to one decimal place
	b = b.toFixed(1);
	
	// Log output when testing
	// console.log('calculate bevel = ' + b);

	return b;
}

/* --------
	The End
----------- */