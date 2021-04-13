class RenameTypeColumns < ActiveRecord::Migration[6.1]
  # meet with the team to discuss what questions we want to have
  def change
    rename_column :activities, :type, :activity_name
    rename_column :locations, :type, :location_name
  end
end
