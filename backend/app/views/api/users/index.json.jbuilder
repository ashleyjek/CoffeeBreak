@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :email, :firstName, :lastName, :birthday, :gender
    end
end
