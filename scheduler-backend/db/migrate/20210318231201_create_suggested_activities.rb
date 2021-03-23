class CreateSuggestedActivities < ActiveRecord::Migration[6.1]
  def change
    create_table :suggested_activities do |t|
      t.references :location, null: false, foreign_key: true
      t.references :event, null: false, foreign_key: true
      t.boolean :chosen
      t.integer :match
      t.timestamps
    end
  end
end
