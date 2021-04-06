class EventsController < ApplicationController
  before_action :set_event, only: [:show, :update, :destroy]
  before_action :authorized, only: [:index, :create, :update]

  # GET /user/:id/events
  # return JSON of all events that this user is the owner of
  # AUTHORIZATION NEEDED -- only user who created the event should be allowed to view it
  def index
    @events = Event.where(user_id: params[:user_id])
    events_to_return = []
    for event in @events.to_ary
      events_to_return.append({ event: event, invitees: get_invitations_for_event(event) })
    end
    render json: events_to_return
  end

  # POST /user/:id/events
  # AUTHORIZATION NEEDED
  def create
    @event = Event.new(
      description: event_params[:description],
      ending_at: event_params[:ending_at],
      name: event_params[:name],
      comfort_metric: 0,
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
  def update
    if @event.update(event_params)
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:description, :ending_at, :name, :start_time, :masks_required)
    end
end
