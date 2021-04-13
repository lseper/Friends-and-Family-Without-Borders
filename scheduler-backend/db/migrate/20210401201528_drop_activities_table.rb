class DropActivitiesTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :activities do |t|
      t.string :name
    end
  end
end
