class AddIndexPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :profile_user_id, :integer
    add_index :posts, :profile_user_id
  end
end
