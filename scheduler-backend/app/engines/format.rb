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

    def extract_events_info(events)
        events_to_return = []

        for event in events
            eventLa = EventLa.find_by(event_id: event.id)
            event_info = extract_event_info(event, eventLa)
            events_to_return.append(event_info)
        end

        events_to_return = events_to_return.sort_by{|e| e[:event][:start_time] }

        return events_to_return

    end

    def extract_event_info(event, eventLa)
        location =  nil
        activity = nil
        overall_comfort_metric = 0
        people_comfortable = 0 

        if eventLa
            location = eventLa.location_activity_suggestion.location
            activity = eventLa.location_activity_suggestion.activity
            overall_comfort_metric = eventLa[:overall_comfort_metric]
            people_comfortable = eventLa[:people_comfortable]
        end

        return {
            event: event, 
            location: location,
            activity: activity,
            invitees: get_invitations_for_event(event), 
            overall_comfort_metric: overall_comfort_metric, 
            people_comfortable: people_comfortable
        }

    end

    def setup_invitee(invitee)
        {
            user: User.find(invitee[:user_id]),
            questionnaire: Questionnaire.find_by(user_id: invitee[:user_id]),
            priority: invitee[:priority],
            matches: []
        }
    end

end