class RenameCovidGuidelinesToName < ActiveRecord::Migration[6.1]
  def change
    rename_column :events, :covid_guidelines, :name
  end
end
