class Location < ApplicationRecord
    has_many :location_activity_suggestions

    validates :location_type, format: { in: ["Outside", "Inside Large", "Inside Small", "Online"] }
end
