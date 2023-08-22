# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  birthday        :date             not null
#  gender          :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  bio             :text
#
class User < ApplicationRecord
    validates :email,
        uniqueness: true,
        length: { in: 3..255 },
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :first_name, :last_name, :gender, :password_digest, presence: true
    validates :password, length: { minimum: 6 }, allow_nil: true
    validate :birthday_valid?

    has_many :posts,
    foreign_key: :author_id,
    class_name: :Post,
    dependent: :destroy

    has_many :wall_posts,
    foreign_key: :profile_user_id,
    class_name: :Post, 
    dependent: :destroy

    has_many :comments,
    foreign_key: :author_id,
    class_name: :Comment,
    dependent: :destroy

    has_many :friendships,
    foreign_key: :user_id,
    class_name: :Friendship

    has_many :friends,
    through: :friendships,
    source: :friend

    has_many :friends_posts,
    through: :friends, 
    source: :posts

    has_many :wall_post_authors,
    through: :wall_posts,
    source: :author

    has_secure_password

    before_validation :ensure_session_token

    has_one_attached :avatar
    has_one_attached :cover 

    def birthday_valid?        
        if 
            self.birthday > 13.years.ago.to_date
            errors.add(:birthday, 'You must be 13 years or older')
        end
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        user&.authenticate(password) ? user : nil
    end

    def ensure_session_token
        self.session_token ||= generate_session_token
    end

    def reset_session_token!
        self.session_token = generate_session_token
        save!
        session_token
    end

    private

    def generate_session_token
        while true
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end

end
