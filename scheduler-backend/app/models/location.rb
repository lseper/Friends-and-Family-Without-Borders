class Location < ApplicationRecord
    has_many :location_activity_suggestions

    validates :location_type, inclusion: { in: ["Outside", "Large Inside", "Small Inside", "Online"] }
end
