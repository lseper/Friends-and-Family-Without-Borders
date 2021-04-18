class User < ApplicationRecord
    has_many :events
    has_many :invitations
    has_many :questionnaires

    has_secure_password
    
    validates :username, :name, :email, :password, :password_confirmation, presence: true
    validates :password, length: { in: 6..20 }
    validates :username, uniqueness: true
    validates :email, uniqueness: true
    validates :privacy, inclusion: [true, false]
    validates :privacy, exclusion: [nil]
end
