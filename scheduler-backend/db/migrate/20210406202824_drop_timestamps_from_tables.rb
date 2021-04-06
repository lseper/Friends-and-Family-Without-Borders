class DropTimestampsFromTables < ActiveRecord::Migration[6.1]
  def change
    remove_column :locations, :created_at
    remove_column :locations, :updated_at

    remove_column :activities, :created_at
    remove_column :activities, :updated_at

    remove_column :event_las, :created_at
    remove_column :event_las, :updated_at

    remove_column :location_activity_suggestions, :created_at
    remove_column :location_activity_suggestions, :updated_at

    remove_column :users, :created_at
    remove_column :users, :updated_at
  end
end
