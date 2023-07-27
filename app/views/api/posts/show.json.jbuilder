json.post do 
    json.extract! @post, :id, :author_id, :body
    json.img_url @post.photo.url
end

comments = @post.comments
json.comments do 
    comments.each do |comment|
        json.set! comment.id do 
            json.extract! comment, :id, :author_id, :post_id, :body, :created_at
        end
    end
end