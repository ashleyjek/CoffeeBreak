class Api::PostsController < ApplicationController
    wrap_parameters include: Post.attribute_names + ['author_id'] + ['photo_updated_flag'] + [:photo]

    def index 
        @posts = Post.all
        render :index
    end

    def show
        @post = Post.find_by(id: params[:id])
        render :show
    end

    def update
        @post = Post.find_by(id: params[:post][:id])
        @post.author_id = current_user.id
        if params[:post][:photo_updated_flag] == "false" 
            @post.photo.purge
        end
        if @post.update(post_params)
            render :show
        else
            render json: ['Post does not belong to user'], status: 422
        end
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
        params.require(:post).permit(:body, :author_id, :photo, :id, :photo_updated_flag)
    end

end
