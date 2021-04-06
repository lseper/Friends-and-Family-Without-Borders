class Invitation < ApplicationRecord
    belongs_to :user
    belongs_to :event

    # make pairs of (user_id, event_id) be unique
    validates_uniqueness_of :user_id, :scope => [:event_id]
end