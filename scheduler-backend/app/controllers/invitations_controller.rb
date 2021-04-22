class InvitationsController < ApplicationController
    include ComfortCalculation, Format

    before_action :set_invitation, only: [:show, :update, :destroy]
    before_action :authorized_as_owner, only: [:create]
    before_action :authorized, only: [:index, :update]
    # Controller for Invitations
    
    # GET users/:id/invitations
    def index
    @invitations = User.find(params[:user_id]).invitations.future
    invited_events = []
    for invitation in @invitations
        # TODO: filter invitations to only return ones that have NOT already happened yet
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
                render json: { message: "You cannot invite yourself nor another user more than once to the same event!" }, status: :unprocessable_entity
                return # exit prematurely
            end
        end
        # # get all pairs
        # pairs = LocationActivitySuggestion.all
        # pairs = setup_pairs(pairs)
        # # TODO: match each user up with each potential pairing
        # for invitee in invitees
        #     # how comfortable are you with the number of attendees at the event?
        #     num_attendees_score = calc_num_attendees_score(invitees.length, invitee)
        #     # how comfortable are you with the mask requirement at the event?
        #     mask_score = calc_mask_score(event[:masks_required], invitee)
        #     for pair in pairs
        #         pair_score = calc_pair_scores(pair, invitee)
        #         # aggregate all of those metrics into one metric. The higher this score = more comfortable you are with this pair
        #         total_suggestion_comfort = 1 - pair_score - num_attendees_score - mask_score
        #         # add this score to the invitee object
        #         invitee[:matches].append(total_suggestion_comfort)

        #         # see if this invitee is comfortable enough to attend this event
        #         if total_suggestion_comfort >= THRESHOLD
        #             if invitee[:priority]
        #                 pair[:priority_passed] += 1
        #             else
        #                 pair[:others_passed] += 1
        #             end
        #         end
        #         # update the overall average comfort metric for this location-activity pair
        #         pair[:average_comfort] += (total_suggestion_comfort / invitees.length)

        #     end
        # end
        
        # pairs = pairs.sort_by{|p| [p[:priority_passed], p[:others_passed], p[:average_comfort]]}.reverse!

        pairs = calc_comfort_scores_for_all_invitees(invitees, event)
        # TODO: generate cumulative score for each pairing
        # TODO: return ranked list of pairings based on score
        render json: { pairs: pairs }, status: :created
    end

    # PATCH/PUT users/[:id]/invitations/1/edit
    def update
        if @invitation.update(confirmed: params[:confirmed])
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

    # def setup_pairs(pairs)
    #     new_pairs = []
    #     for pair in pairs
    #         new_pairs.append(setup_pair(pair))
    #     end
    #     return new_pairs
    # end

    # def setup_pair(pair)
    #     {
    #         id: pair[:id],
    #         location: pair.location,
    #         activity: pair.activity,
    #         priority_passed: 0,
    #         others_passed: 0,
    #         average_comfort: 0.0
    #     }
    # end
    
    # def extract_invitation_info(invite)
    #     event = Event.find(invite[:event_id])
    #     organizer = User.find(event[:user_id])
    #     event_la = EventLa.find_by(event_id: invite.event.id)
    #     if event_la
    #         activity = event_la.location_activity_suggestion.activity
    #         location = event_la.location_activity_suggestion.location
    #     else
    #         activity = nil
    #         location = nil
    #     end
    #     {
    #         id: invite.id,
    #         organizer: organizer,
    #         event_details: event,
    #         confirmed: invite[:confirmed],
    #         comfort_level: invite[:comfort_level],
    #         activity: activity,
    #         location: location
    #     }
    # end

    # Use callbacks to share common setup or constraints between actions.
    def set_invitation
        puts params[:id].to_i
        @invitation = Invitation.find(params[:id].to_i)
    end

    # Only allow a list of trusted parameters through.
    def invitation_params
        params.require(:invitation).permit(:event_id, :invitees)
    end
end
