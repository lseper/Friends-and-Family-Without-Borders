class DropTimestampsFromTables < ActiveRecord::Migration[6.1]
  def change
    remove_column :locations, :created_at, :datetime
    remove_column :locations, :updated_at, :datetime

    remove_column :activities, :created_at, :datetime
    remove_column :activities, :updated_at, :datetime

    remove_column :event_las, :created_at, :datetime
    remove_column :event_las, :updated_at, :datetime

    remove_column :location_activity_suggestions, :created_at, :datetime
    remove_column :location_activity_suggestions, :updated_at, :datetime

    remove_column :users, :created_at, :datetime
    remove_column :users, :updated_at, :datetime
  end
end
