class InvitationsController < ApplicationController
    before_action :set_invitation, only: [:show, :update, :destroy]
    before_action :authorized, only: [:index, :create, :destroy, :show, :update]
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
    def create
    @invitation = invitation.new(invitation_params)
    if @invitation.save
        render json: @invitation, status: :created, location: @invitation
    else
        render json: @invitation.errors, status: :unprocessable_entity
    end
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
        params.require(:invitation).permit(:event_id, :user_id)
    end
end
