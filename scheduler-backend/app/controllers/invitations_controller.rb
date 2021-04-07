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
        for invitee in invitees
            # how comfortable are you with the number of attendees at the event?
            num_attendees_score = calc_num_attendees_score(invitees.length, invitee)
            # how comfortable are you with the mask requirement at the event?
            mask_score = calc_mask_score(event[:masks_required], invitee)
            for pair in pairs
                pair_score = calc_pair_scores(pair, invitee)
                # aggregate all of those metrics into one metric. The higher this score = more comfortable you are with this pair
                total_suggestion_comfort = 1 - pair_score - num_attendees_score - mask_score
                # add this score to the invitee object
                invitee[:matches].append(total_suggestion_comfort)

                # see if this invitee is comfortable enough to attend this event
                if total_suggestion_comfort >= THRESHOLD
                    if invitee[:priority]
                        pair.set_priority_passed(pair.get_priority_passed() + 1)
                    else
                        pair.set_others_passed(pair.get_others_passed() + 1)
                    end
                end
                # update the overall average comfort metric for this location-activity pair
                pair.set_average_comfort((pair.get_average_comfort + total_suggestion_comfort) / invitees.length)

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
            location: pair.location,
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
end
