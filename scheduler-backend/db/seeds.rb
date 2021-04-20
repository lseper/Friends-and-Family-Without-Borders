# create activities for testing
Activity.create( name: "vibin", socialDistanceScore: 6, hasFood: true, minPeople: 2, maxPeople: 8 )
Activity.create( name: "sports", socialDistanceScore: 2, hasFood: false, minPeople: 6, maxPeople: 20 )
Activity.create( name: "video games", socialDistanceScore: 8, hasFood: false, minPeople: 2, maxPeople: 10 )
Activity.create( name: "movies", socialDistanceScore: 10, hasFood: true, minPeople: 4, maxPeople: 12 )


# create all locations for testing
Location.create( location_type: "Outside" )
Location.create( location_type: "Large Inside" )
Location.create( location_type: "Small Inside" )
Location.create( location_type: "Online" )

# create all Location-Activity Relations
LocationActivitySuggestion.create( location_id: 1, activity_id: 1 )
LocationActivitySuggestion.create( location_id: 1, activity_id: 2 )
LocationActivitySuggestion.create( location_id: 1, activity_id: 4 )
LocationActivitySuggestion.create( location_id: 2, activity_id: 1 )
LocationActivitySuggestion.create( location_id: 2, activity_id: 2 )
LocationActivitySuggestion.create( location_id: 2, activity_id: 3 )
LocationActivitySuggestion.create( location_id: 2, activity_id: 4 )
LocationActivitySuggestion.create( location_id: 3, activity_id: 1 )
LocationActivitySuggestion.create( location_id: 3, activity_id: 3 )
LocationActivitySuggestion.create( location_id: 3, activity_id: 4 )
LocationActivitySuggestion.create( location_id: 4, activity_id: 1 )
LocationActivitySuggestion.create( location_id: 4, activity_id: 3 )


# create all users for testing
User.create( username: "testuser", password: "password", password_confirmation: "password", name: "Test User", email: "testuser@gmail.com", privacy: true )
User.create( username: "billbob", password: "billbob", password_confirmation: "billbob", name: "Bill Bob", email: "billbob@gmail.com", privacy: true )
User.create( username: "janedoe", password: "janedoe", password_confirmation: "janedoe", name: "Jane Doe", email: "janedoe@gmail.com", privacy: true )

# create all events for testing
Event.create( name: "test event 1", description: "for testing event 1", start_time: "2020-04-06 12:00:00", ending_at: "2020-04-06 13:00:00", user_id: 1, masks_required: true)
Event.create( name: "test event 2", description: "for testing event 2", start_time: "2030-04-06 13:00:00", ending_at: "2030-04-06 14:00:00", user_id: 1, masks_required: false)

# create all invitations for testing
Invitation.create( event_id: 1, user_id: 2, comfort_level: 0.95, confirmed: false, priority: true )

# create all questionnaires for testing
Questionnaire.create(q1answer: 1, q2answer: 2, q3answer: 3, q4answer: 4, q5answer: 5, q6answer: 6, q7answer: 7, q8answer: 8, user_id: 3)
Questionnaire.create(q1answer: 1, q2answer: 2, q3answer: 3, q4answer: 4, q5answer: 5, q6answer: 6, q7answer: 7, q8answer: 8, user_id: 2)
