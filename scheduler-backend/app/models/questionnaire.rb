class Questionnaire < ApplicationRecord
    belongs_to :user

    # outside?
    # inside large?
    # inside small?
    # online?
    # eating?
    # social distancing importance?
    # mask importance?
    # people around tolerance?

    validates :q1answer, :q2answer, :q3answer, :q4answer, :q5answer, :q6answer, :q7answer, :q8answer, presence: true
end
