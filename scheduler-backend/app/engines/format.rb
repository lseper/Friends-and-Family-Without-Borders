module Format
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
        {
            organizer: organizer,
            event_details: event
        }
    end



end