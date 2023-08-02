class UpdatePosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :photo_updated_flag, :string
  end
end
