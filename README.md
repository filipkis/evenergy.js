A lightweight javascript library for calculating Electric Vehicle Energy requirements.

# Usage

First set the properties of the EV:

    evenergy.config(vehicle)

Where vehicle is JS object containing the needed vehicle properties. For instance, for Nissan Leaf this would be:
    vehicle = {
      cd:0.29,
      cr:0.012,
      area:2.7435,
      mass:1521
    }

Next set the speed and the distance:

    evenergy.speed(110,"kmh").distance(24,"km")

Finally, get the energy required:

    evenergy.energy() // Returns (in kWh) 3.382461976604939


Of course, you could chain the calls as following:

   evenergy.config({cd:0.29,cr:0.012,area:2.7435,mass:1521})
     .speed(110,"kmh")
     .distance(24,"km")
     .energy()

# Method reference 

TBD