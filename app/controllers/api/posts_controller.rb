class Api::PostsController < ApplicationController
    def index 
        @posts = Post.all;
        render :index
    end

    def show
        @post = Post.find_by(id: params[:id])
        render :show
    end

    def update
        @post = Post.find_by(id: params[:id])
        if @post.author_id == current_user.id
            @post.update
        else
            render json: ['Post does not belong to user'], status: 422
    end

    def create
        @post = Post.new(post_params)
        @post.author_id = current_user.id
        if @post.save
            render :show
        else
            render json: @post.errors, status: 422
        end
    end

    def destroy
        @post = Post.find(params[:id])
        if @post.author_id == current_user.id
            @post.destroy
            head :no_content
        else
            render json: ['Post does not belong to user'], status: 422
        end
    end

    def post_params
        params.require(:post).permit(:body, :author_id)
    end

end
