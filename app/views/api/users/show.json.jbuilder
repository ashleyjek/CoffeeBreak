json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :birthday, :gender
    json.avatarSrc @user.avatar.attached? ? @user.avatar.url : nil
    json.coverSrc @user.cover.attached? ? @user.cover.url : nil
end