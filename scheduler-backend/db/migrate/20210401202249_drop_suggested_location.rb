class DropSuggestedLocation < ActiveRecord::Migration[6.1]
  def change
    drop_table :suggested_locations
  end
end
