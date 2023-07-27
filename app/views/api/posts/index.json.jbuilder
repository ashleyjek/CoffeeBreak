    @posts.each do |post|
        json.posts do 
            json.set! post.id do
                json.extract! post, :id, :author_id, :body, :created_at
                json.photo_src post.photo.url
            end
        end

        comments = post.comments
        json.comments do 
            comments.each do |comment|
                json.set! comment.id do 
                    json.extract! comment, :id, :author_id, :post_id, :body, :created_at
                end
            end
        end

    end
