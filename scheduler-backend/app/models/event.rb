class Event < ApplicationRecord
    # currently isn't working. What I want is for an event to have many users (invitees), but to only have one owner (organizer)
    belongs_to :user # event organizer
    has_many :invitations
    # has_and_belongs_to_many :users, through: :invitations
end
