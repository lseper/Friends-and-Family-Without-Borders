class ApplicationController < ActionController::API

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
            username: user[:username],
            confirmed: invite[:confirmed],
            comfort_level: invite[:confirmed]
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
            @event = Event.find_by(user_id: @id)
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
