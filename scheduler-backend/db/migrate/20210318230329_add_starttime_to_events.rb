class AddStarttimeToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :start_time, :datetime
  end
end
