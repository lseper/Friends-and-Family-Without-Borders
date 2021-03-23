class ChangeEventsUsersToInvitations < ActiveRecord::Migration[6.1]
  def change
    rename_table :events_users, :invitations
  end
end
