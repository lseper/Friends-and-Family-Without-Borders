class QuestionResponse < ApplicationRecord
    belongs_to :questionnaire
    belongs_to :question_option
    belongs_to :question
end
