# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# create activities for testing
Activity.create( [ {name: "vibin", socialDistanceScore: 6, hasFood: true, minPeople: 2, maxPeople: 8},
    {name: "sports", socialDistanceScore: 2, hasFood: false, minPeople: 6, maxPeople: 20},
    {name: "video games", socialDistanceScore: 8, hasFood: false, minPeople: 2, maxPeople: 10},
    {name: "movies", socialDistanceScore: 10, hasFood: true, minPeople: 4, maxPeople: 12}
])

# create all locations for testing
Location.create( [{location_type: "Outdoor"},
    {location_type: "Large Inside"},
    {location_type: "Small Inside"},
    {location_type: "Online"}
])

# create all Location-Activity Relations
LocationActivitySuggestion.create([ {location_id: 1, activity_id: 1},
    {location_id: 1, activity_id: 2},
    {location_id: 1, activity_id: 4},
    {location_id: 2, activity_id: 1},
    {location_id: 2, activity_id: 2},
    {location_id: 2, activity_id: 3},
    {location_id: 2, activity_id: 4},
    {location_id: 3, activity_id: 1},
    {location_id: 3, activity_id: 3},
    {location_id: 3, activity_id: 4},
    {location_id: 4, activity_id: 1},
    {location_id: 4, activity_id: 3},
])


# create all users for testing
User.create([ {username: "testuser", password: "password", password_confirmation: "password", name: "Test User", email: "testuser@gmail.com", privacy: true},
    {username: "billbob", password: "drowssap", password_confirmation: "drowssap", name: "Bill Bob", email: "billbob@gmail.com", privacy: true} ])

# create all events for testing
Event.create([ {name: "test event 1", description: "for testing event 1", start_time: "2021-04-06 12:00:00", ending_at: "2021-04-06 13:00:00", user_id: 1},
    {name: "test event 2", description: "for testing event 2", start_time: "2021-04-06 12:00:00", ending_at: "2021-04-06 13:00:00", user_id: 1} ])

EventLA.create(location_activity_suggestion_id: 1, event_id: 1, overall_comfort_metric: 0.98, people_comfortable: 8)