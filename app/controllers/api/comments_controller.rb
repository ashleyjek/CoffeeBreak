class Api::CommentsController < ApplicationController
    wrap_parameters include: Comment.attribute_names + ['author_id', 'post_id']

    def index
        @comments = Comment.all
        render :index
    end

    def show
        @comment = Comment.find_by(id: params[:id])
        render :show
    end

    def update
        @comment = Comment.find_by(id: params[:id])
        @comment.author_id = current_user.id
        if @comment.update(comment_params)
            render :show
        else
            render json: ['Comment does not belong to user'], status: 422
        end
    end

    def create
        @comment = Comment.new(comment_params)
        @comment.author_id = current_user.id
        if @comment.save
            render :show
        else 
            render json: @comment.errors, status: 422
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        if @comment.author_id == current_user.id
            @comment.destroy
            head :no_content
        else
            render json
            render json: ['Comment does not belong to user'], status: 422
        end
    end

    def comment_params
        params.require(:comment).permit(:body, :author_id, :post_id, :id)
    end

end
