    @posts.each do |post|
        post_liker_ids = []
        comment_liker_ids = []

        json.likes do 
            post.likes.each do |like|
                post_liker_ids << like.liker_id
                json.set! like.liker_id do 
                    json.extract! like, :id, :liker_id, :likeable_type, :likeable_id
                end
            end
            post.comments.each do |comment|
                comment.likes.each do |like|
                    comment_liker_ids << like.liker_id
                    json.set! like.liker_id do 
                        json.extract! like, :id, :liker_id, :likeable_type, :likeable_id
                    end
                end
            end
        end

        json.posts do 
            json.set! post.id do
                json.extract! post, :id, :author_id, :body, :created_at
                json.photoSrc post.photo.attached? ? post.photo.url : nil
                json.likes do 
                    json.array! post_liker_ids
                end
            end

        end

        json.comments do 
            post.comments.each do |comment|
                json.set! comment.id do 
                    json.extract! comment, :id, :author_id, :post_id, :body, :created_at
                    json.likes do 
                        json.array! comment_liker_ids
                    end
                end
            end
        end


    end
