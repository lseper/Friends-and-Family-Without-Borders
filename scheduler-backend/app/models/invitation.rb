class Invitation < ApplicationRecord
    belongs_to :user
    belongs_to :event

    # make sure both the user and event inviting to exist
    validates :user, :event, presence: true

    # make pairs of (user_id, event_id) be unique
    validates_uniqueness_of :user_id, :scope => [:event_id]

    # only invitations in the future
    # scope :future, -> { join(:events).where('event.start_time > ?', Time.now.to_s)}

    # owner of the event cannot be invited to it
    validate :owner_is_not_invited

    private
    def owner_is_not_invited
        if event.user.id == user.id
            puts "cannot add the creator of an event to the same event"
            errors.add(:user, "cannot not be invited to an event they created!")
        end
    end
end