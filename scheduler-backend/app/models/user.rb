class User < ApplicationRecord
    has_and_belongs_to_many :events
    has_many :questionnaires

    has_secure_password

    validates :username, uniqueness: true
    validates :password_confirmation, presence: true
end
