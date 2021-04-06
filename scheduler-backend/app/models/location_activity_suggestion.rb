class LocationActivitySuggestion < ApplicationRecord
    has_many :event_la
    belongs_to :location
    belongs_to :activity

    # make pairs of (location_id, activity_id) unique
    validates_uniqueness_of :location_id, :scope => [:activity_id]

    @priority_passed = 0
    @others_passed = 0
    @average_comfort = 0
    def set_priority_passed(value)
        @priority_passed = value
    end

    def get_priority_passed()
        return @priority_passed
    end

    def set_others_passed(value)
        @others_passed = value
    end

    def get_others_passed()
        return @others_passed
    end

    def set_average_comfort(value)
        @average_comfort = value
    end

    def get_average_comfort()
        return @average_comfort
    end

end
