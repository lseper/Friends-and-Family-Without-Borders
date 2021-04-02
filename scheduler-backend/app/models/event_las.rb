class Event_Las < ApplicationRecord
    # currently isn't working. What I want is for an event to have many users (invitees), but to only have one owner (organizer)
    belongs_to :user # event organizer
    has_many :invitations
    has_many : :event_las
end