class Api::UsersController < ApplicationController
    before_action :require_logged_out, only: [:create]

    wrap_parameters include: User.attribute_names + ['password'] + ['first_name'] + ['last_name'] + ['birthday']

    def index
        @users = User.all
        render :index
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login(@user)
            render :show
        else
            render json: @user.errors, status: 422
        end
    end

    private

    def user_params
        params.require(:user).permit(:id, :email, :first_name, :last_name, :birthday, :gender, :password)
    end

end
