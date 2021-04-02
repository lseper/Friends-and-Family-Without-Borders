class Event_Las < ApplicationRecord
    # currently isn't working. What I want is for an event to have many users (invitees), but to only have one owner (organizer)
    belongs_to :event
    belongs_to :location_activity_suggestion
end