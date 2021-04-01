class DropQuestionsFromQuestionnaire < ActiveRecord::Migration[6.1]
  def change
    remove_column :questionnaires, :q12answer, :integer
    remove_column :questionnaires, :q11answer, :integer
    remove_column :questionnaires, :q10answer, :integer
    remove_column :questionnaires, :q9answer, :integer
  end
end
