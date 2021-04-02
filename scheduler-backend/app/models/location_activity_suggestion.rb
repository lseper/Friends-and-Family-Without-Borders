class Location_Activity_Suggestion < ApplicationRecord
    has_many :event_la
    belongs_to :location
    belongs_to :activity
end