class ApplicationController < ActionController::API

    # ------- comfort metric calculation ------

    def setup_invitee(invitee)
        {
            user: User.find(invitee[:user_id]),
            questionnaire: Questionnaire.find_by(user_id: invitee[:user_id]),
            priority: invitee[:priority],
            matches: []
        }
    end

    THRESHOLD = 0.8

    def calc_location_score(location, invitee)
        location_type = location[:location_type]
        base_location_score = 10
        questionnaire_location_score = 0
        if location_type == "Outside"
            questionnaire_location_score = invitee[:questionnaire][:q1answer]
        elsif location_type == "Large Inside"
            questionnaire_location_score = invitee[:questionnaire][:q2answer]
        elsif location_type == "Small Inside"
            questionnaire_location_score = invitee[:questionnaire][:q3answer]
        else
            questionnaire_location_score = invitee[:questionnaire][:q4answer]
        end
        location_score = (base_location_score - questionnaire_location_score) / 100.0
        return location_score
    end

    def calc_pair_scores(pair, invitee)
        location = pair[:location]
        activity = pair[:activity]

        location_score = calc_location_score(location, invitee)
        eating_score = calc_eating_score(activity, invitee)
        social_dist_score = calc_social_distance_score(activity, invitee)
        return (location_score + eating_score + social_dist_score)
    end

    def calc_eating_score(activity, invitee)
        base_eating_score = 0
        if activity[:hasFood] == false
            return base_eating_score
        else
            base_eating_score = 10
            questionnaire_eating_score = invitee[:questionnaire][:q5answer]
            eating_score = (base_eating_score - questionnaire_eating_score) / 100.0
            return eating_score
        end
    end

    def calc_social_distance_score(activity, invitee)
        base_social_score = activity[:socialDistanceScore]
        questionnaire_social_score = invitee[:questionnaire][:q6answer]

        social_score = questionnaire_social_score - base_social_score

        if social_score <= 0
            social_score = social_score.abs() * 0.5 
        end

        return social_score / 100.0
    end

    def calc_num_attendees_score(num_attendees, invitee)
        questionnaire_num_attendees_comfort = invitee[:questionnaire][:q7answer]
        num_attendees_score = num_attendees - questionnaire_num_attendees_comfort

        if num_attendees_score <= 0
            return 0
        else
            return num_attendees_score / 100.0
        end
    end

    def calc_mask_score(mask_required, invitee)
      
        if !mask_required
            questionnaire_mask_score = invitee[:questionnaire][:q8answer]
            return (10 - questionnaire_mask_score) / 100.0
        else
            return 0
        end
    end

    # ----- methods used in multiple controllers

    def get_invitations_for_event(event)
        invitees = Invitation.where(event_id: event[:id])
        invites = []
        for invite in invitees
            invites.append(get_invitee_info(invite))
        end
        return invites
    end

    def get_invitee_info(invite)
        user = User.find(invite[:user_id])
        {
            id: user[:id],
            username: user[:username],
            confirmed: invite[:confirmed],
            priority: invite[:priority],
            comfort_level: invite[:comfort_level]
        }
    end

    # ------------------------------------------------------

    QUESTIONNAIRE_TOTAL = 120.0

    # Individual comfort metric calculation -- refactor for new questionnaire 
    def comfort_metric(questionnaire)
        # answers = [questionnaire[:q1answer], questionnaire[:q2answer], questionnaire[:q3answer], questionnaire[:q4answer], questionnaire[:q5answer],
        # questionnaire[:q6answer], questionnaire[:q7answer], questionnaire[:q8answer], questionnaire[:q9answer], questionnaire[:q10answer], questionnaire[:q11answer],
        # questionnaire[:q12answer]]
        # answers.sum / QUESTIONNAIRE_TOTAL
        return 0.0
    end

    # ------------ Encryption and user authentication stuff ----------

    def encode(payload)
        JWT.encode(payload, 'test')
    end

    def auth_header
        request.headers['Authorization']
    end

    def decode_token
        if auth_header
            token = auth_header.split(' ')[1]
            begin
                JWT.decode(token, 'test', true, algorithm: 'HS256')
            rescue JWT::DecodeError
                nil
            end
        end
    end

    def logged_in_user
        decoded = decode_token
        if decoded
            @id = decoded[0]['user_id']
            @user = User.find_by(id: @id)
        end
    end

    def logged_in?
        !! logged_in_user
    end

    # modified authentication -- done so that only the owner of an event can mess with it
    # only use this method for checking authorization for EVENT ORGANIZER related actions
    # check to make sure the requester is the owner of the event 
    def is_owner?
        decoded = decode_token
        if decoded
            @id = decoded[0]['user_id']
            if params[:event_id]
                @event = Event.find(params[:event_id])
            else
                @event = Event.find(params[:id])
            end
            is_owner = @id == @event[:user_id] # true if owner matches, false if not
        end
    end

    # before_action for actions that only the OWNER of an event can do
    def authorized_as_owner
        render json: { message: 'You are not the owner of this event' }, status: :unauthorized unless is_owner? 
    end

    def authorized
        render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
    end

end
