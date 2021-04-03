class InvitationsController < ApplicationController
    before_action :set_invitation, only: [:show, :update, :destroy]
    before_action :authorized_as_owner, only: [:create] # also :create, but need to do a hacky fix
    before_action :authorized, only: [:index]
    # Controller for Invitations
    
    # GET /invitations
    def index
    @invitations = User.find(params[:user_id]).invitations
    invited_events = []
    for invitation in @invitations
        invited_events.append(extract_invitation_info(invitation))
    end
    render json: invited_events
    end

    # GET user/:id/invitations/:id
    def show
        render json: extract_invitation_info(@invitation)
    end

    # POST /invitations
    # REQUIRES EVENT OWNER AUTHORIZATION
    def create
        errors = []
        invitees = []
        invitations = params[:invitees]
        for invitee in invitations 
            @invitee = Invitation.new(event_id: params[:event_id], user_id: invitee[:user_id], 
                priority: invitee[:priority], confirmed: false, comfort_level: 0)
            if @invitee.save
                invitees.append(setup_invitee(@invitee))
            else
                errors.append(@invitee.errors)
            end
        end
        # TODO: fetch all invitee questionnaires [DONE]
        # TODO: get all location-activity pairings
        pairs = LocationActivitySuggestion.all
        # TODO: match each user up with each potential pairing
        for invitee in invitees
            num_attendees_score = calc_num_attendees_score(invitees.length, invitee)
            for pair in pairs
                location_score = calc_location_score(pair.location, invitee)
                eating_score = calc_eating_score(pair.activity, invitee)
                social_distance_score = calc_social_distance_score(pair.activity, invitee)
                invitee[:matches].append(1 - location_score - eating_score - social_distance_score - num_attendees_score)

            end
        end
                
        # TODO: generate cumulative score for each pairing
        # TODO: return ranked list of pairings based on score
        render json: { invitations: invitees, errors: errors } , status: :created
    end

    # PATCH/PUT /invitations/1/edit
    def update
    if @invitation.update(invitation_params)
        render json: @invitation
    else
        render json: @invitation.errors, status: :unprocessable_entity
    end
    end

    # DELETE /invitations/1
    def destroy
        @invitation.destroy
    end

    private

    def setup_invitee(invitee)
        {
            user: User.find(invitee[:user_id]),
            questionnaire: Questionnaire.find_by(user_id: invitee[:user_id]),
            matches: []
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

    # Use callbacks to share common setup or constraints between actions.
    def set_invitation
        @invitation = Invitation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def invitation_params
        params.require(:invitation).permit(:event_id, :invitees)
    end

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
        puts num_attendees
        questionnaire_num_attendees_comfort = invitee[:questionnaire][:q7answer]
        puts questionnaire_num_attendees_comfort.class
        num_attendees_score = num_attendees - questionnaire_num_attendees_comfort

        if num_attendees_score <= 0
            return 0
        else
            return num_attendees_score / 100.0
        end
    end
end
