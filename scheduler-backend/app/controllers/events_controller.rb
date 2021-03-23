class EventsController < ApplicationController
  before_action :set_event, only: [:show, :update, :destroy]
  before_action :authorized, only[:index, :create]

  # GET /user/:id/events
  # return JSON of all events that this user is the owner of
  # AUTHORIZATION NEEDED
  def index
    @events = Event.where(user_id: params[:user_id])

    render json: @events
  end

  # GET /events/:id
  def show
    render json: @event
  end

  # POST /user/:id/events
  # AUTHORIZATION NEEDED
  def create
    @event = Event.new(event_params)

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

  # DELETE /events/:id
  def destroy
    @event.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:created_at, :description, :ending_at, :covid_guidelines, :comfort_metric)
    end
end
