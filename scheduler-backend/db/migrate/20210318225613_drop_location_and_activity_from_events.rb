class DropLocationAndActivityFromEvents < ActiveRecord::Migration[6.1]
  def change
    remove_column :events, :location_id
    remove_column :events, :activity_id
  end
end
