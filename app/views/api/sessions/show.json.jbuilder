json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :birthday, :gender, :bio
    json.avatarSrc @user.avatar.attached? ? @user.avatar.url : "https://coffeebook-dev.s3.amazonaws.com/default+photo.png"
    json.coverSrc @user.cover.attached? ? @user.cover.url : nil
end