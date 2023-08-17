json.comment do 
    # json.extract! @comment, :id, :author_id, :post_id, :body, :created_at
    comment_likes = @comment.likes.pluck(:id)
    json.extract! @comment, :id, :author_id, :post_id, :body, :created_at
    json.likes do 
        json.array! comment_likes
    end
end