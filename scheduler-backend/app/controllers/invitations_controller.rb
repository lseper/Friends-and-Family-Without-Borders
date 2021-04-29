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
        pairs = calc_comfort_scores_for_all_invitees(invitees, event)
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

    # Use callbacks to share common setup or constraints between actions.
    def set_invitation
        @invitation = Invitation.find(params[:id].to_i)
    end

    # Only allow a list of trusted parameters through.
    def invitation_params
        params.permit(:event_id, :invitees)
    end
end
