class UpdatePostsFlag < ActiveRecord::Migration[7.0]
  def change
    remove_column :posts, :photo_updated_flag, :string
  end
end
