class User < ApplicationRecord
    has_many :events
    has_many :invitations
    has_many :questionnaires

    has_secure_password

    validates :password, length: { in: 6..20 }
    validates :username, uniqueness: true
    validates :password_confirmation, presence: true
end
