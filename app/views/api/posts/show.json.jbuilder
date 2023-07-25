json.post do 
    json.extract! @post, :id, :author_id, :body
end