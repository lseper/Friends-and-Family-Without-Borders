class DropLocationAndActivityFromEvents < ActiveRecord::Migration[6.1]
  def change 
    remove_column :events, :location_id, :integer
    remove_column :events, :activity_id, :integer
  end
end
