class Api::UsersController < ApplicationController
    before_action :require_logged_out, only: [:create]

    wrap_parameters include: User.attribute_names + ['password'] + ['first_name'] + ['last_name'] + ['birthday'] + [:avatar] + [:cover]

    def index
        @users = User.all
        render :index
    end

    def show
        @user = User.find_by(id: params[:id]);
        if @user 
            render :show
        else
            render json: @user.errors, status: 422
        end
    end

    def create
        @user = User.new(user_params)
        debugger
        if @user.save
            login(@user)
            render :show
        else
            render json: @user.errors, status: 422
        end
    end

    def search
        query = params[:query]

        @users = User.where('first_name ILIKE ? OR last_name ILIKE ?', "%#{query}%", "%#{query}%").limit(8)

        render :search
    end

    def update
        @user = User.find_by(id: params[:user][:id])
        if @user.update(user_params)
            render :show
        else
            render json: ['User cannot be updated'], status: 422
        end
    end

    private

    def user_params
        params.require(:user).permit(:id, :email, :first_name, :last_name, :birthday, :gender, :password, :avatar, :cover, :bio)
    end

end
