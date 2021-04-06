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
        event = Event.find(invitation_params[:event_id])

        for invitee in invitations 
            @invitee = Invitation.new(event_id: params[:event_id], user_id: invitee[:user_id], 
                priority: invitee[:priority], confirmed: false, comfort_level: 0)
            if @invitee.save
                invitees.append(setup_invitee(@invitee))
            else
                errors.append(@invitee.errors)
            end
        end
        # get all pairs
        pairs = LocationActivitySuggestion.all
        setup_pairs(pairs)
        # TODO: match each user up with each potential pairing
        threshold = 0.8
        for invitee in invitees
            # how comfortable are you with the number of attendees at the event?
            num_attendees_score = calc_num_attendees_score(invitees.length, invitee)
            mask_score = calc_mask_score(event[:masks_required], invitee)
            for pair in pairs
                # how comfortable are you with the location type?
                location_score = calc_location_score(pair.location, invitee)
                # how comfrotable are you with eating at an event?
                eating_score = calc_eating_score(pair.activity, invitee)
                # how comfortable are you with the social distancing at this event?
                social_distance_score = calc_social_distance_score(pair.activity, invitee)
                total_suggestion_comfort = 1 - location_score - eating_score - social_distance_score - num_attendees_score - mask_score
                invitee[:matches].append(total_suggestion_comfort)
                puts invitee
                puts "the priority is above"
                if total_suggestion_comfort >= threshold
                    if invitee[:priority]
                        pair.set_priority_passed(pair.get_priority_passed() + 1)
                    else
                        pair.set_others_passed(pair.get_others_passed() + 1)
                    end
                end

                pair.set_average_comfort(pair.get_average_comfort + total_suggestion_comfort)

            end
        end
        
        pairs = pairs.sort_by{|p| [p.get_priority_passed, p.get_others_passed, p.get_average_comfort]}.reverse!
        # TODO: generate cumulative score for each pairing
        # TODO: return ranked list of pairings based on score
        render json:  {pairs: prepare_pairs_jsons(pairs)}, status: :created
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
            priority: invitee[:priority],
            matches: []
        }
    end

    def setup_pairs(pairs)
        for pair in pairs
            pair.set_priority_passed(0)
            pair.set_others_passed(0)
            pair.set_average_comfort(0)
        end
    end

    def prepare_pair_json(pair)
        {
            id: pair[:id],
            locaiton: pair.location,
            activity: pair.activity,
            priority_passed: pair.get_priority_passed(),
            others_passed: pair.get_others_passed(),
            average_comfort: pair.get_average_comfort()
        }
    end

    def prepare_pairs_jsons(pairs)
        new_pairs = []
        for pair in pairs
            new_pairs.push(prepare_pair_json(pair))
        end
        return new_pairs
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

    #calculates the comfort the user
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
end
