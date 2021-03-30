class ChangeSuggestedActivitiesToSuggestedLocations < ActiveRecord::Migration[6.1]
  def change
    rename_table :suggested_activities, :suggested_locations
  end
end
