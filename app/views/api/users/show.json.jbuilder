json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :birthday, :gender
    json.avatarSrc @user.avatar.attached? ? @user.avatar.url : nil
    json.coverSrc @user.cover.attached? ? @user.cover.url : nil
end

friendships = @user.friendships
json.friends do 
    friendships.each do |friendship|
        json.set! friendship.id do 
            json.extract! friendship, :id, :user_id, :friend_id
        end
    end
end