friends = @user.friends

json.users do 
    json.set! @user.id do
        json.extract! @user, :id, :email, :first_name, :last_name, :birthday, :gender, :bio
        json.avatarSrc @user.avatar.attached? ? @user.avatar.url : "https://coffeebook-dev.s3.amazonaws.com/default+photo.png"
        json.coverSrc @user.cover.attached? ? @user.cover.url : nil
    end

    # json.set! @current_user.id do
    #     json.extract! @current_user, :id, :email, :first_name, :last_name, :birthday, :gender, :bio
    #     json.avatarSrc @current_user.avatar.attached? ? @current_user.avatar.url : "https://coffeebook-dev.s3.amazonaws.com/default+photo.png"
    #     json.coverSrc @current_user.cover.attached? ? @current_user.cover.url : nil
    # end
    
    friends.each do |friend|
        json.set! friend.id do 
            json.extract! friend, :id, :email, :first_name, :last_name, :birthday, :gender, :bio
            json.avatarSrc friend.avatar.attached? ? friend.avatar.url : "https://coffeebook-dev.s3.amazonaws.com/default+photo.png"
            json.coverSrc friend.cover.attached? ? friend.cover.url : nil
        end
    end
end

user_posts = @user.wall_posts
friends_posts = @user.friends_posts

# json.posts do 
#     user_posts.each do |post|
#         json.set! post.id do 
#             json.extract! post, :id, :author_id, :body
#             json.photoSrc post.photo.attached? ? post.photo.url : nil
#         end
#     end
# end

friendships = @user.friendships
json.friendships do 
    friendships.each do |friendship|
        json.set! friendship.friend_id do 
            json.extract! friendship, :id, :user_id, :friend_id
        end
    end
end

user_posts.each do |post|
    post_likes = post.likes.pluck(:id)
    json.likes do 
        post.likes.each do |like|
            json.set! like.id do 
                json.extract! like, :id, :liker_id, :likeable_type, :likeable_id
            end
        end
        post.comments.each do |comment|
            comment.likes.each do |like|
                json.set! like.id do 
                    json.extract! like, :id, :liker_id, :likeable_type, :likeable_id
                end
            end
        end
    end

    json.posts do 
        json.set! post.id do
            json.extract! post, :id, :author_id, :body, :profile_user_id, :created_at
            json.photoSrc post.photo.attached? ? post.photo.url : nil
            json.likes do 
                json.array! post_likes
            end
        end

    end

    json.comments do 
        post.comments.each do |comment|
            comment_likes = comment.likes.pluck(:id)

            json.set! comment.id do 
                json.extract! comment, :id, :author_id, :post_id, :body, :created_at
                json.likes do 
                    json.array! comment_likes
                end
            end
        end
    end


end
