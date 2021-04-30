class Activity < ApplicationRecord
    has_many :location_activity_suggestions

    validates :name, presence: true
    
end
