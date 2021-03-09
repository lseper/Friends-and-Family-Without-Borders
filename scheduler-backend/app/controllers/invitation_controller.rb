class InvitationController < ApplicationController
    # Controller for Invitations
    
    # GET /user/:id/invitations
    def index
    @invitations = invitation.all
    render json: @invitations
    end

    # GET /invitations/:id
    def show
        render json: {message: "Success"}
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
    # Use callbacks to share common setup or constraints between actions.
    def set_invitation
        @invitation = invitation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def invitation_params
        params.require(:invitation).permit(:event_id, :user_id)
    end
end
