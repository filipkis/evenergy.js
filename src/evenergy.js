
(function (window,undefined) {

	var evenergy,
		speed = undefined, 
		time = undefined, 
		distance = undefined,
		acceleration = 0, // acceleration
		slope = 0, // slope
		mass = 0, // vehicle mass
		cr = 0, // vehicle roll resistance coefficient
		cd = 0, // vehicle drag coefficient
		area = 0, // vehicle area
		r = 1.225, // air density
		g = 9.82, // gravity
		efficiency = 0.8; // efficiency

	function Evenergy(){	
	
	};

	function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }

        if (b.hasOwnProperty("toString")) {
            a.toString = b.toString;
        }

        if (b.hasOwnProperty("valueOf")) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function combine(a,b) {
    	for (var i in a) {
    		if(b.hasOwnProperty(i)) {
    			a[i](b[i]);
    		}
    	}
    }

    function totalForce(speed) {
    	// Acceleration resistance
    	fa = acceleration * mass; // kg m/s^2

    	// Slope resistance
    	fs = slope * g * mass; // kg m/s^2

    	// Roll resistance
    	fr = cr * g * mass; // kg m/s^2

    	// Wind resistance a.k.a. drag
    	fd = 0.5 * r * cd * area * speed * speed; // kg m/s^2

    	total = fa + fs + fr + fd;
    	
    	console.log("Total force: " + total);

    	return total;  // kg m/s^2

    }

    extend(Evenergy.prototype,{
    	config: function(args) {
    		if(args !== undefined)
				combine(this,args);
			return evenergy;
    	},
		speed: function(value,unit) {
			if(value !== undefined) {
				if(unit === 'kmh')
					speed = value * 1000 / 3600;	
				else
					speed = value;
				return evenergy;
			}
			if(speed === undefined)
				if(distance === undefined || time === undefined)
					throw "Not possible to calculate 'speed'. Either provide the 'speed' value, or both values" + 
						"for 'distance' and 'time' so that the 'speed' can be calculated"
				else
					return distance / time;
			return speed;
		},
		distance: function(value,unit) {
			if(value !== undefined) {
				if(unit === 'km')
					distance = value * 1000;
				else
					distance = value;
				return evenergy;
			}
			if(distance === undefined)
				if(speed === undefined || time === undefined)
					throw "Not possible to calculate 'distance'. Either provide the 'distance' value, or both values" + 
						"for 'speed' and 'time' so that the 'distance' can be calculated"
				else
					return speed * time;
			return distance;
		},
		time: function(value,unit) {
			if(value !== undefined) {
				if(unit === 'h')
					time = value * 3600;
				else if (unit === 'm')
					time = value * 60;
				else if (unit === 'ms')
					time = value * 1000;
				else 
					time = value;
				return evenergy;
			}
			if(time === undefined)
				if(speed === undefined || distance === undefined)
					throw "Not possible to calculate 'time'. Either provide the 'time' value, or both values" + 
						"for 'distance' and 'speed' so that the 'time' can be calculated"
				else
					return distance / speed;
			return time;
		},
		slope: function(value) {
			if(value !== undefined) {
				slope = value;
				return evenergy;
			}
			return slope;
		},
		mass: function(value) {
			if(value !== undefined) {
				mass = value;
				return evenergy;
			}
			return mass;
		},
		cr: function(value){
			if(value !== undefined) {
				cr = value;
				return evenergy;
			}
			return cr;
		},
		cd: function(value){
			if(value !== undefined) {
				cd = value;
				return evenergy;
			}
			return cd;
		},
		area: function(value){
			if(value !== undefined) {
				area = value;
				return evenergy;
			}
			return area;
		},
		efficiency: function(value) {
			if(value !== undefined) {
				efficiency = value;
				return evenergy;
			}
			return efficiency;
		},
		power: function() {
			power = totalForce(evenergy.speed()) * evenergy.speed() / 1000 * efficiency; // kW
			console.log("Power: " + power);
			return power;
		},
		energy: function() {
			return evenergy.power() * evenergy.time() / 3600; 
		}

	});

	evenergy = window.evenergy = new Evenergy();

}(window || this));