# Create necessary locations
Location.create( location_type: "Outside" )
Location.create( location_type: "Large Inside" )
Location.create( location_type: "Small Inside" )
Location.create( location_type: "Online" )
Location.create( location_type: "Undecided")

# Create necessary activities
Activity.create(name: "undecided", socialDistanceScore: 0, hasFood: false, minPeople: 0, maxPeople: 0)