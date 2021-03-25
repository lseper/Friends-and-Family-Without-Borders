class EventsController < ApplicationController
  before_action :set_event, only: [:show, :update, :destroy]
  before_action :authorized, only: [:index, :create, :destroy, :show, :update]


  # GET /user/:id/events
  # return JSON of all events that this user is the owner of
  # AUTHORIZATION NEEDED -- only user who created the event should be allowed to view it
  def index
    @events = Event.where(user_id: params[:user_id])
    render json: @events
  end

  # GET user/:id/events/:id
  def show
    render json: @event
    # get all the invited users
      # display their comfort metric for the event, if they're attending 
  end

  # POST /user/:id/events
  # AUTHORIZATION NEEDED
  def create
    @event = Event.new(
      description: event_params[:description],
      ending_at: event_params[:ending_at],
      covid_guidelines: event_params[:covid_guidelines],
      comfort_metric: 0,
      activity_id: event_params[:activity_id],
      location_id: event_params[:location_id],
      user_id: params[:user_id],
      start_time: event_params[:start_time]
    )

    if @event.save
      render json: @event, status: :created, location: @event
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

  # DELETE user/:id/events/:id
  # AUTHORIZATION NEEDED -- only the creator of this event should be able to delete it
  def destroy
    @event.destroy
    # going to need to implement deleting all invite references to this too
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:description, :ending_at, :covid_guidelines, :activity_id, :location_id, :start_time)
    end
end
