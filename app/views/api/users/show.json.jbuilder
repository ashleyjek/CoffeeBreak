json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :birthday, :gender, :bio
    json.avatarSrc @user.avatar.attached? ? @user.avatar.url : "https://coffeebook-dev.s3.amazonaws.com/default+photo.png"
    json.coverSrc @user.cover.attached? ? @user.cover.url : nil
end

friends = @user.friends

json.users do 
    friends.each do |friend|
        json.set! friend.id do 
            json.extract! friend, :id, :email, :first_name, :last_name, :birthday, :gender, :bio
            json.avatarSrc friend.avatar.attached? ? friend.avatar.url : "https://coffeebook-dev.s3.amazonaws.com/default+photo.png"
            json.coverSrc friend.cover.attached? ? friend.cover.url : nil
        end
    end
end

user_posts = @user.posts
friends_posts = @user.friends_posts

json.posts do 
    user_posts.each do |post|
        json.set! post.id do 
            json.extract! post, :id, :author_id, :body
            json.photoSrc post.photo.attached? ? post.photo.url : nil
        end
    end
    friends_posts.each do |post|
        json.set! post.id do 
            json.extract! post, :id, :author_id, :body
            json.photoSrc post.photo.attached? ? post.photo.url : nil
        end
    end
end

friendships = @user.friendships
json.friendships do 
    friendships.each do |friendship|
        json.set! friendship.friend_id do 
            json.extract! friendship, :id, :user_id, :friend_id
        end
    end
end