Rails.application.routes.draw do
  get 'rails/c'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :create, :show, :edit]
    resource :session, only: [:create, :show, :destroy]
    resources :posts, only: [:index, :create, :show, :update, :destroy]
  end

end
