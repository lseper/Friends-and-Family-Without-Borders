class User < ApplicationRecord

    #                   1 num    1 lower     1 upper    1 symbol 
    PASSWORD_REGEX = /\A(?=.*.\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[[:^alnum:]])/x
    has_many :events
    has_many :invitations
    has_many :questionnaires

    has_secure_password
    # automatically adds validates :password, presence: true, on: [:create]
    
    validates :username, :email, presence: true
    validates :password, length: { in: 6..20 }, format: PASSWORD_REGEX, on: [:create]
    validates :username, uniqueness: true
    validates :email, uniqueness: true
    validates :privacy, inclusion: [true, false]
    validates :privacy, exclusion: [nil]
end
