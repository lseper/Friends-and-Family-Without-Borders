class CreateActivities < ActiveRecord::Migration[6.1]
  def change
    create_table :activities do |t|
      t.string :name
      t.string :type
      t.integer :min_participant
      t.integer :max_participant
      t.string :avg_time
      t.string :equipment_needed

      t.timestamps
    end
  end
end
