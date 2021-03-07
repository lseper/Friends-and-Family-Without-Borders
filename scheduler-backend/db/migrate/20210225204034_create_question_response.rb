class CreateQuestionResponse < ActiveRecord::Migration[6.1]
  def change
    create_table :question_responses do |t|
      t.references :question, null: false, foreign_key: true
      t.references :answer, null: false, foreign_key: true
      t.references :questionnaire, null:false, foreign_key: true
      
      t.timestamps
    end
  end
end