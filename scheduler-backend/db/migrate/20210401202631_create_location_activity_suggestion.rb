class CreateLocationActivitySuggestion < ActiveRecord::Migration[6.1]
  def change
    create_table :location_activity_suggestions do |t|
      t.references :location, null: false, foreign_key: true
      t.references :activity, null: false, foreign_key: true
      t.timestamps
    end
  end
end
