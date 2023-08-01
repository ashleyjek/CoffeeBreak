json.friendship do 
    json.extract! @friendship, :id, :user_id, :friend_id
end

json.inverse_friendship do 
    json.extract! @inverse_friendship, :id, :user_id, :friend_id
end
