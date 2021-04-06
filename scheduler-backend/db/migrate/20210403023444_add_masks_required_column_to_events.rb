class AddMasksRequiredColumnToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :masks_required, :boolean
  end
end
