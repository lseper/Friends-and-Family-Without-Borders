class InvitationsController < ApplicationController
    before_action :set_invitation, only: [:show, :update, :destroy]
    before_action :authorized_as_owner, only: [:index, :create] # also :create, but need to do a hacky fix
    # Controller for Invitations
    
    # GET /user/:id/invitations
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
                invitees.append(@invitee)
            else
                errors.append(@invitee.errors)
            end
        end
        # TODO: fetch all invitee questionnaires
        # TODO: get all location-activity pairings
        # TODO: match each user up with each potential pairing
        # TODO: generate cumulative score for each pairing
        # TODO: return ranked list of pairings based on score
        render json: { invitations: invitees } , status: :created
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
        params.require(:invitation).permit(:event_id, :user_id, :priority)
    end
end
