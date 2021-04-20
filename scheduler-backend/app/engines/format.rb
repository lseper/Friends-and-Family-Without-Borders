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

    def get_invitations_for_event(event, see_all=true)
        invitees = Invitation.where(event_id: event[:id])
        invites = []
        for invite in invitees
            user = User.find(invite[:user_id])
            if see_all # get all, regardless of privacy level
                invites.append(get_invitee_info(user, invite))
            else # get depending on privacy level
                invites.append(get_invitee_info(user, invite, privacy=user.privacy))
            end
        end
        return invites
    end

    def get_invitee_info(user, invite, privacy=false)
        unless privacy # non-private visibility
            return_hash = {
                id: user[:id],
                username: user[:username],
                confirmed: invite[:confirmed],
                priority: invite[:priority],
                comfort_level: invite[:comfort_level]
            }
        else
            return_hash = {
                id: user[:id],
                username: user[:username]
            }
        end
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
            location: location,
            invitees: get_invitations_for_event(event, see_all=false)
        }
    end
end