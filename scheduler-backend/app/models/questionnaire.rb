class Questionnaire < ApplicationRecord
    # should honeslty nuke everything on this side of things in favor of just having questionnaire table by itself
    # each question is just a string in the table
    # each response an integer
    # EX: on a scale of 1 - 5, how comfortable are you being inside without masks?
    belongs_to :user
    has_many :question_options, through: :question_responses
    has_many :questions, through: :question_responses
end
