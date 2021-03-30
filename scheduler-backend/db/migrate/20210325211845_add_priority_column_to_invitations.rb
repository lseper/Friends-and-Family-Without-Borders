class AddPriorityColumnToInvitations < ActiveRecord::Migration[6.1]
  def change
    add_column :invitations, :priority, :boolean
  end
end
