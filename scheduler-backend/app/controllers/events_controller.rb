class EventsController < ApplicationController
  # importing ComfortCalculation methods
  include ComfortCalculation, Format

  before_action :set_event, only: [:show, :update, :destroy]
  before_action :authorized, only: [:index, :create]
  before_action :authorized_as_owner, only: [:update, :destroy]

  # GET /user/:id/events
  # return JSON of all events that this user is the owner of
  # AUTHORIZATION NEEDED -- only user who created the event should be allowed to view it
  def index
    @events = Event.where(user_id: params[:user_id])
    # events_to_return = []
    # for event in @events.to_ary
    #   event_la = EventLa.find_by(event_id: event.id)
    #   if event_la
    #     events_to_return.append({ 
    #       event: event, 
    #       location: event_la.location_activity_suggestion.location,
    #       activity: event_la.location_activity_suggestion.activity,
    #       invitees: get_invitations_for_event(event), 
    #       overall_comfort_metric: event_la[:overall_comfort_metric], 
    #       people_comfortable: event_la[:people_comfortable]})
    #   else
    #     events_to_return.append({ 
    #       event: event, 
    #       location: nil,
    #       activity: nil,
    #       invitees: get_invitations_for_event(event), 
    #       overall_comfort_metric: 0, 
    #       people_comfortable: 0})
    #   end
    # end
    #pairs.sort_by{|p| [p[:priority_passed], p[:others_passed], p[:average_comfort]]}
    events_to_return = extract_events_info(@events.to_ary)

    render json: events_to_return
  end

  # POST /user/:id/events
  # AUTHORIZATION NEEDED
  def create
    @event = Event.new(
      description: event_params[:description],
      ending_at: event_params[:ending_at],
      name: event_params[:name],
      user_id: params[:user_id],
      start_time: event_params[:start_time],
      masks_required: event_params[:masks_required]
    )
    if @event.save
      render json: { id: @event.id }, status: :created
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /events/:id
  # send back to the backend all the information about the pair chosen (we can do this)
  # as well as all the invitee scores FOR that pair (can we do this?) [Currently not doing this]
  def update
    invitees = Invitation.where(event_id: @event.id)
    pair = params[:pair]
    # update each invitee's comfort level
    # for invitee in invitees
    #   invitee_info = setup_invitee(invitee)
    #   # re-calculating comfort scores for now. Could potentially refactor and have these sent from front-end(?)
    #   num_attendees_score = calc_num_attendees_score(invitees.length, invitee_info)
    #   masks_req_score = calc_mask_score(@event[:masks_required], invitee_info)
    #   pair_score = calc_pair_scores(pair, invitee_info)
    #   comfort_score = 1 - pair_score - masks_req_score - num_attendees_score
    #   invitee.update!(comfort_level: comfort_score) # will throw an error if unprocessable (internal server error)
    # end

    update_invitee_scores(@event, pair, invitees)

    # add the chosen pair to the event via the event_las table
    event_la = EventLa.new(event_id: params[:id], location_activity_suggestion_id: pair[:id], overall_comfort_metric: pair[:average_comfort], people_comfortable: (pair[:priority_passed] + pair[:others_passed]))
    if event_la.save
      render json: event_la
    else
      render json: @event.errors, status: :unprocessable_entity 
    end
  end

  # DELETE /events/[:id]
  def destroy
    if @event.destroy
      render json: { message: 'Success' }
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    def event_update_params
      params.require(:event).permit(:pair)
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:description, :ending_at, :name, :start_time, :masks_required)
    end
end
