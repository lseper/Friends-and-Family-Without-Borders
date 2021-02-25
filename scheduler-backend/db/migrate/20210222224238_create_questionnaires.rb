class CreateQuestionnaires < ActiveRecord::Migration[6.1]
  def change
    create_table :questionnaires do |t|
      t.references :user, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
