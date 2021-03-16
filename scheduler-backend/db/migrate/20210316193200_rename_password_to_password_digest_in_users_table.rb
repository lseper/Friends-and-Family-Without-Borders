class RenamePasswordToPasswordDigestInUsersTable < ActiveRecord::Migration[6.1]
  def change
    # potential fix for user password encryption
    rename_column :users, :password, :password_digest
  end
end
