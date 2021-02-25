class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :description
      t.datetime :ending_at
      t.string :covid_guidelines
      t.integer :comfort_metric

      # foreign keys
      t.references :activity, null: false, foreign_key: true
      t.references :location, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
