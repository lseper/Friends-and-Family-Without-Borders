class CreateEventInvitations < ActiveRecord::Migration[6.1]
  def change
    create_table :invitations do |t|
      t.references :event, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :comfort_level
      t.boolean :confirmed

      t.timestamps
    end
  end
end
