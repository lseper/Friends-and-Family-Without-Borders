class DropChosenFromEventLaTable < ActiveRecord::Migration[6.1]
  def change
    remove_column :event_las, :chosen, :boolean
  end
end
