json.friendship do 
    # json.set! @friendship.friend_id do 
        json.extract! @friendship, :id, :user_id, :friend_id
    # end
end

json.inverse_friendship do 
    # json.set! @inverse_friendship.friend_id do
        json.extract! @inverse_friendship, :id, :user_id, :friend_id
    # end
end
