class DropComfortMetricFromEventsTable < ActiveRecord::Migration[6.1]
  def change
    remove_column :events, :comfort_metric, :numeric
  end
end
