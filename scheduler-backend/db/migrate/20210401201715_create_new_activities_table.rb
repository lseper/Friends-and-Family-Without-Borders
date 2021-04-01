class CreateNewActivitiesTable < ActiveRecord::Migration[6.1]
  def change
    create_table :activities do |t|
      t.string :name
      t.integer :socialDistanceScore
      t.boolean :hasFood
      t.integer :minPeople
      t.integer :maxPeople
      t.timestamps
    end
  end
end
