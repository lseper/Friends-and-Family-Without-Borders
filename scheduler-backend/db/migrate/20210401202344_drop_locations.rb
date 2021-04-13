class DropLocations < ActiveRecord::Migration[6.1]
  def change
    drop_table :locations do |t|
      t.string :name
    end
  end
end
