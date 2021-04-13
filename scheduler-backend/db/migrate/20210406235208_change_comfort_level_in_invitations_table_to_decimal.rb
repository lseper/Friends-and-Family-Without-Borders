class ChangeComfortLevelInInvitationsTableToDecimal < ActiveRecord::Migration[6.1]
  def up
    change_column :invitations, :comfort_level, :numeric
  end 

  def down
    change_column :invitations, :comfort_level, :integer
  end
end
