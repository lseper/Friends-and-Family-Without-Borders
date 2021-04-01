class CreateEventLas < ActiveRecord::Migration[6.1]
  def change
    create_table :event_las do |t|
      t.references :location_activity_suggestion, null: false, foreign_key: true
      t.references :event, null: false, foreign_key: true
      t.float :overall_comfort_metric
      t.integer :people_comfortable
      t.boolean :chosen
      t.timestamps
    end
  end
end
