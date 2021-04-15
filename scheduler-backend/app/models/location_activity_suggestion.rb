class LocationActivitySuggestion < ApplicationRecord
    has_many :event_la
    belongs_to :location
    belongs_to :activity

    # make pairs of (location_id, activity_id) unique
    validates_uniqueness_of :location_id, :scope => [:activity_id]

    # make sure there is a corresponding location and activity for these too
    validates :location, :activity, presence: true
end
