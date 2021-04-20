class User < ApplicationRecord
    has_many :events
    has_many :invitations
    has_many :questionnaires

    has_secure_password
    # automatically adds validates :password, presence: true, on: [:create]
    
    validates :username, :email, presence: true
    # looks like we are not going to be able to do password resetting (at least not easily)
    validates :password, length: { in: 6..20 }, on: [:create]
    validates :username, uniqueness: true
    validates :email, uniqueness: true
    validates :privacy, inclusion: [true, false]
    validates :privacy, exclusion: [nil]
end
