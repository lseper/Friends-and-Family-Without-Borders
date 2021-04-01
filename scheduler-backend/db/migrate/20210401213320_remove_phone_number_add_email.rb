class RemovePhoneNumberAddEmail < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :phone, :string
    add_column :users, :email, :string
  end
end
