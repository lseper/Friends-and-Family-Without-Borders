class Event < ApplicationRecord
    belongs_to :user # event organizer
    has_many :invitations
    has_many :event_la
end
