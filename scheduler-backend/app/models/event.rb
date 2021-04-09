class Event < ApplicationRecord
    belongs_to :user # event organizer
    has_many :invitations
    has_many :event_la

    # not nil or empty string (can be false for masks_required)
    validates :name, :start_time, :ending_at, presence: true
    validates :user, presence: true
    validates :masks_required, inclusion: [true, false]
    validates :masks_required, exclusion: [nil]

    # end date must be after start date
    validate :end_after_start

    private 
    def end_after_start
        puts ending_at
        puts start_time
        if ending_at <= start_time
            errors.add(:ending_at, "must be after the start time")
        end
    end
end
