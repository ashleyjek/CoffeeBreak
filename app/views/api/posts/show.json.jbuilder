json.post do 
    json.extract! @post, :id, :author_id, :body
    json.img_url @post.photo.url
end