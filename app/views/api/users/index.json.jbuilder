@users.each do |user|
    json.users do
        json.set! user.id do
            json.extract! user, :id, :email, :first_name, :last_name, :birthday, :gender
        end
    end
end
