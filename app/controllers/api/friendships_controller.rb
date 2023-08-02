class Api::FriendshipsController < ApplicationController
    wrap_parameters include: Friendship.attribute_names + ['friend_id']

    def index
        # @friends = current_user.friends
        @friendships = Friendship.all
        render :index
    end

    def show
        @friendship = Friendship.find_by(user_id: current_user.id, friend_id: params[:friend_id])
        if @friendship
            render :show
        else 
            render json: ['Friendship does not exist'], status: 422
        end
    end

    def create
        @friendship = Friendship.new(user_id: current_user.id, friend_id: params[:friend_id])
        @inverse_friendship = Friendship.new(user_id: params[:friend_id], friend_id: current_user.id)
        if @friendship.save && @inverse_friendship.save
            render :show
        else
            render json: @friendship.errors, status: 422
        end

    end

    def destroy
        @friendship = Friendship.find_by(user_id: current_user.id)
        @inverse_friendship = Friendship.find_by(user_id: @friendship.friend_id, friend_id: current_user.id)
        if @friendship.destroy && @inverse_friendship.destroy
            render :show
        else
            render json: @friendship.full_messages, status:422
        end
    end

    def friendship_params
        params.require(:friend).permit(:friend_id)
    end
end
