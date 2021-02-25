class CreateEventInvitations < ActiveRecord::Migration[6.1]
  def change
    create_join_table :events, :users do |t| # table will be called "events_users" in db
      t.index :event_id
      t.index :user_id
      t.integer :comfort_level
      t.boolean :confirmed

      t.timestamps
    end
  end
end
