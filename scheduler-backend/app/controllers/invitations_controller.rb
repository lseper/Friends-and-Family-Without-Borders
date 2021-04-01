class InvitationsController < ApplicationController
    before_action :set_invitation, only: [:show, :update, :destroy]
    # before_action :authorized, only: [:index, :create]
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

    # POST /user/:id/invitations
    # TODO: Add authorization to this
    # Only the creator of an event should be able to add invitees to it
    # do this by checking that the owner of the event signalled by ":event_id"
    # matches the auth_token sent in the header by the user.
    def create
        errors = []
        invitees = []
        invitations = params[:invitees]
        for invitee in invitations do
            @invitee = Invitation.new(event_id: invitee[:event_id], user_id: invitee[:user_id], 
                priority: invitee[:priority], confirmed: false, comfort_level: 0)
            if @invitee.save
                invitees.append(invitee)
            else
                errors.append(invitee.errors)
            end
        end
        # TODO: fetch all invitee questionnaires
        
        # TODO: get all location-activity pairings
        # TODO: match each user up with each potential pairing
        # TODO: generate cumulative score for each pairing
        render json: { invitations: invitees, errors: errors } , status: :unprocessable_entity
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
