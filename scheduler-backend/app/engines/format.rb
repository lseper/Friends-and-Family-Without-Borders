module Format

    UNCHOSEN_LOCATION = Location.find_by(location_type: "Undecided")
    UNCHOSEN_ACTIVITY = Activity.find_by(name: "undecided")

    # creates an array of objects containging
    def setup_pairs(pairs)
        new_pairs = []
        for pair in pairs
            new_pairs.append(setup_pair(pair))
        end
        return new_pairs
    end

    def setup_pair(pair)
        {
            id: pair[:id],
            location: pair.location,
            activity: pair.activity,
            priority_passed: 0,
            others_passed: 0,
            average_comfort: 0.0
        }
    end

    def extract_invitation_info(invite)
        event = Event.find(invite[:event_id])
        organizer = User.find(event[:user_id])
        event_la = EventLa.find_by(event_id: invite.event.id)
        if event_la
            activity = event_la.location_activity_suggestion.activity
            location = event_la.location_activity_suggestion.location
        else
            activity = UNCHOSEN_ACTIVITY
            location = UNCHOSEN_LOCATION
        end
        {
            id: invite.id,
            organizer: organizer,
            event_details: event,
            confirmed: invite[:confirmed],
            comfort_level: invite[:comfort_level],
            activity: activity,
            location: location
        }
    end

    



end