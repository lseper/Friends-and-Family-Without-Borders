class ChangeComfortLevelInInvitationsTableToDecimal < ActiveRecord::Migration[6.1]
  def change
    change_column :invitations, :comfort_level, :numeric
  end
end
