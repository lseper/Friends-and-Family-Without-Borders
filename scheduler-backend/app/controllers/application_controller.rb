class ApplicationController < ActionController::API
    public

    # undecided placeholders for events that have not 
    UNCHOSEN_LOCATION = Location.find_by(location_type: "Undecided")
    UNCHOSEN_ACTIVITY = Activity.find_by(name: "undecided")





    # ----- methods used in multiple controllers

    def setup_invitee(invitee)
        {
            user: User.find(invitee[:user_id]),
            questionnaire: Questionnaire.find_by(user_id: invitee[:user_id]),
            priority: invitee[:priority],
            matches: []
        }
    end

    # ------------------------------------------------------

    QUESTIONNAIRE_TOTAL = 120.0

    # ------------ Encryption and user authentication stuff ----------

    # change this to something actually meaningful before code review lol
    # ENCODE_TOKEN = SHA256 encryption of the string "team melon"
    ENCODE_TOKEN = '001253eed5e74fcf1d9d119efb2aa2e603cad83ea11c3b67a686f7df5b591c85'

    def encode(payload)
        JWT.encode(payload, ENCODE_TOKEN)
    end

    def auth_header
        request.headers['Authorization']
    end

    def decode_token
        if auth_header
            token = auth_header.split(' ')[1]
            begin
                JWT.decode(token, ENCODE_TOKEN, true, algorithm: 'HS256')
            rescue JWT::DecodeError
                nil
            end
        end
    end

    def logged_in_user
        decoded = decode_token
        if decoded
            @id = decoded[0]['user_id']
            params_id = params[:user_id]
            if (params_id) == nil
                params_id = params[:id]
            end

            return params_id.to_i == @id
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
