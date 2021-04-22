class Questionnaire < ApplicationRecord
    belongs_to :user

    # outside? (1 - 10)
    # inside large? (1 - 10)
    # inside small? (1 - 10)
    # online? (1 - 10)
    # eating? (1 - 10)
    # social distancing importance? (1 - 10)
    # mask importance? (1 - 10)
    # people around tolerance? ()

    validates :q1answer, :q2answer, :q3answer, :q4answer, :q5answer, :q6answer, :q7answer, :q8answer, presence: true
    validates :q1answer, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 10 }
end
