class User < ApplicationRecord
    has_and_belongs_to_many :events
    has_many :questionnaires

    # has_secure_password

   #  alias_attribute :password_digest, :password
end
