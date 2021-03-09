class RenameTypeColumns < ActiveRecord::Migration[6.1]
  # meet with the team to discuss what questions we want to have
  def change
    rename_column :activities, :type, :activity_type
    rename_column :locations, :type, :location_type
  end
end
