@users.each do |user|
    user_friends = user.friends.pluck(:id)
    json.users do
        json.set! user.id do
            json.extract! user, :id, :email, :first_name, :last_name, :birthday, :gender
            json.avatarSrc user.avatar.attached? ? user.avatar.url : nil
            json.coverSrc user.cover.attached? ? user.cover.url : nil
            json.friends do 
                json.array! user_friends
            end
        end
    end

    # json.friendships do 
    #     friendships.each do |friendship|
    #         json.set! friendship.id do 
    #             json.extract! friendship, :id, :user_id, :friend_id
    #         end
    #     end
    # end
end
