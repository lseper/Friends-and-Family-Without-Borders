class EventLa < ApplicationRecord
    belongs_to :event
    belongs_to :location_activity_suggestion

    validates :event_id, uniqueness: true
end